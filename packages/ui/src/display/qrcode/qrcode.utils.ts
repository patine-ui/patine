import type { ViewStyle } from 'react-native';

import {
  BYTE_MODE,
  ECC_BLOCKS,
  ECC_CODEWORDS_PER_BLOCK,
  ECL_FORMAT_BITS,
  ECL_INDEX,
  ERROR_CORRECTION,
  MAX_VERSION,
  MIN_VERSION,
  PAD_BYTES,
  PENALTY,
} from './qrcode.constants';
import type { QRCodeOptions, QRErrorCorrection, QRMatrix, QRRun } from './qrcode.types';

// A QR code encoder in byte mode, after ISO/IEC 18004: all 40 versions and the four error-correction levels.

/** The text as UTF-8 bytes, without TextEncoder (missing on older Hermes). */
export const toUtf8 = (text: string): number[] => {
  const bytes: number[] = [];
  // By index rather than for…of, which some bundlers compile to a loop over UTF-16 units and would split emoji.
  for (let i = 0; i < text.length; i++) {
    const code = text.codePointAt(i) ?? 0;
    if (code > 0xffff) i++;
    if (code < 0x80) bytes.push(code);
    else if (code < 0x800) bytes.push(0xc0 | (code >> 6), 0x80 | (code & 63));
    else if (code < 0x10000) bytes.push(0xe0 | (code >> 12), 0x80 | ((code >> 6) & 63), 0x80 | (code & 63));
    else bytes.push(0xf0 | (code >> 18), 0x80 | ((code >> 12) & 63), 0x80 | ((code >> 6) & 63), 0x80 | (code & 63));
  }
  return bytes;
};

const bit = (value: number, i: number) => ((value >>> i) & 1) !== 0;

/** Modules left for data and error correction once the function patterns are drawn. */
export const rawDataModules = (version: number) => {
  let result = (16 * version + 128) * version + 64;
  if (version >= 2) {
    const align = Math.floor(version / 7) + 2;
    result -= (25 * align - 10) * align - 55;
    if (version >= 7) result -= 36;
  }
  return result;
};

/** Data codewords a version holds at a level. */
export const dataCodewords = (version: number, ecl: QRErrorCorrection) => {
  const level = ECL_INDEX[ecl];
  return Math.floor(rawDataModules(version) / 8) - (ECC_CODEWORDS_PER_BLOCK[level]?.[version] ?? 0) * (ECC_BLOCKS[level]?.[version] ?? 0);
};

/** Bits of byte mode's character count: 8 up to version 9, 16 after. */
const countBits = (version: number) => (version <= 9 ? 8 : 16);

/** The most bytes a version holds at a level, in byte mode. */
export const byteCapacity = (version: number, ecl: QRErrorCorrection) =>
  Math.floor((dataCodewords(version, ecl) * 8 - 4 - countBits(version)) / 8);

/** The smallest version from `minVersion` that holds `length` bytes, or -1. */
export const pickVersion = (length: number, ecl: QRErrorCorrection, minVersion = MIN_VERSION) => {
  for (let v = Math.max(MIN_VERSION, minVersion); v <= MAX_VERSION; v++) if (byteCapacity(v, ecl) >= length) return v;
  return -1;
};

/** Mode, count, data, terminator and padding, as the version's data codewords. */
export const dataBytes = (bytes: readonly number[], version: number, ecl: QRErrorCorrection) => {
  const bits: number[] = [];
  const push = (value: number, length: number) => {
    for (let i = length - 1; i >= 0; i--) bits.push((value >>> i) & 1);
  };
  push(BYTE_MODE, 4);
  push(bytes.length, countBits(version));
  for (const b of bytes) push(b, 8);
  const capacity = dataCodewords(version, ecl) * 8;
  push(0, Math.min(4, capacity - bits.length));
  push(0, (8 - (bits.length % 8)) % 8);
  const result: number[] = [];
  for (let i = 0; i < bits.length; i += 8) result.push(bits.slice(i, i + 8).reduce((acc, b) => (acc << 1) | b, 0));
  for (let i = 0; result.length < capacity / 8; i++) result.push(PAD_BYTES[i % 2] as number);
  return result;
};

/** Multiplication in GF(2^8) modulo x^8 + x^4 + x^3 + x^2 + 1. */
export const gfMultiply = (x: number, y: number) => {
  let z = 0;
  for (let i = 7; i >= 0; i--) {
    z = (z << 1) ^ ((z >>> 7) * 0x11d);
    z ^= ((y >>> i) & 1) * x;
  }
  return z & 0xff;
};

/** The Reed–Solomon generator polynomial of a degree, highest term dropped. */
export const rsDivisor = (degree: number) => {
  const result = new Array<number>(degree).fill(0);
  result[degree - 1] = 1;
  let root = 1;
  for (let i = 0; i < degree; i++) {
    for (let j = 0; j < degree; j++) {
      result[j] = gfMultiply(result[j] as number, root) ^ (j + 1 < degree ? (result[j + 1] as number) : 0);
    }
    root = gfMultiply(root, 0x02);
  }
  return result;
};

/** The error-correction codewords of a block. */
export const rsRemainder = (data: readonly number[], divisor: readonly number[]) => {
  const result = new Array<number>(divisor.length).fill(0);
  for (const b of data) {
    const factor = b ^ (result.shift() as number);
    result.push(0);
    divisor.forEach((coef, i) => {
      result[i] = (result[i] as number) ^ gfMultiply(coef, factor);
    });
  }
  return result;
};

/** Splits the data into blocks, adds each block's error correction, and interleaves them. */
export const addErrorCorrection = (data: readonly number[], version: number, ecl: QRErrorCorrection) => {
  const level = ECL_INDEX[ecl];
  const blocks = ECC_BLOCKS[level]?.[version] ?? 1;
  const eccLength = ECC_CODEWORDS_PER_BLOCK[level]?.[version] ?? 0;
  const raw = Math.floor(rawDataModules(version) / 8);
  const shortBlocks = blocks - (raw % blocks);
  const shortLength = Math.floor(raw / blocks);
  const divisor = rsDivisor(eccLength);
  const all: number[][] = [];
  for (let i = 0, k = 0; i < blocks; i++) {
    const block = data.slice(k, k + shortLength - eccLength + (i < shortBlocks ? 0 : 1));
    k += block.length;
    const ecc = rsRemainder(block, divisor);
    if (i < shortBlocks) block.push(0);
    all.push(block.concat(ecc));
  }
  const result: number[] = [];
  for (let i = 0; i < shortLength + 1; i++) {
    all.forEach((block, j) => {
      // Short blocks carry a placeholder where long blocks have one more data codeword.
      if (i !== shortLength - eccLength || j >= shortBlocks) result.push(block[i] as number);
    });
  }
  return result;
};

/** Centres of the alignment patterns along each axis. */
export const alignmentPositions = (version: number) => {
  if (version === 1) return [];
  const count = Math.floor(version / 7) + 2;
  const step = Math.floor((version * 8 + count * 3 + 5) / (count * 4 - 4)) * 2;
  const result = [6];
  for (let pos = version * 4 + 10; result.length < count; pos -= step) result.splice(1, 0, pos);
  return result;
};

/** The 15 format bits: level and mask, BCH-protected and masked. */
export const formatBits = (ecl: QRErrorCorrection, mask: number) => {
  const data = (ECL_FORMAT_BITS[ecl] << 3) | mask;
  let rem = data;
  for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
  return ((data << 10) | rem) ^ 0x5412;
};

/** The 18 version bits, from version 7 on. */
export const versionBits = (version: number) => {
  let rem = version;
  for (let i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1f25);
  return (version << 12) | rem;
};

const MASKS: readonly ((x: number, y: number) => boolean)[] = [
  (x, y) => (x + y) % 2 === 0,
  (_, y) => y % 2 === 0,
  (x) => x % 3 === 0,
  (x, y) => (x + y) % 3 === 0,
  (x, y) => (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0,
  (x, y) => ((x * y) % 2) + ((x * y) % 3) === 0,
  (x, y) => (((x * y) % 2) + ((x * y) % 3)) % 2 === 0,
  (x, y) => (((x + y) % 2) + ((x * y) % 3)) % 2 === 0,
];

const grid = (size: number) => Array.from({ length: size }, () => new Array<boolean>(size).fill(false));

/** Finder, timing and alignment patterns, the dark module and version bits; `reserved` marks every module they take. */
const drawFunctionPatterns = (version: number, modules: boolean[][], reserved: boolean[][]) => {
  const size = modules.length;
  const set = (x: number, y: number, dark: boolean) => {
    const row = modules[y];
    const mark = reserved[y];
    if (!row || !mark || x < 0 || x >= size) return;
    row[x] = dark;
    mark[x] = true;
  };
  for (let i = 0; i < size; i++) {
    set(6, i, i % 2 === 0);
    set(i, 6, i % 2 === 0);
  }
  for (const [cx, cy] of [
    [3, 3],
    [size - 4, 3],
    [3, size - 4],
  ] as const) {
    for (let dy = -4; dy <= 4; dy++) {
      for (let dx = -4; dx <= 4; dx++) {
        const d = Math.max(Math.abs(dx), Math.abs(dy));
        if (cy + dy >= 0 && cy + dy < size) set(cx + dx, cy + dy, d !== 2 && d !== 4);
      }
    }
  }
  const align = alignmentPositions(version);
  const last = align.length - 1;
  align.forEach((cx, i) => {
    align.forEach((cy, j) => {
      if ((i === 0 && j === 0) || (i === 0 && j === last) || (i === last && j === 0)) return;
      for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) set(cx + dx, cy + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
    });
  });
  // Reserve the format areas now; drawFormat fills them once the mask is known.
  drawFormat(0, set, size);
  if (version >= 7) {
    const bits = versionBits(version);
    for (let i = 0; i < 18; i++) {
      const a = size - 11 + (i % 3);
      const b = Math.floor(i / 3);
      set(a, b, bit(bits, i));
      set(b, a, bit(bits, i));
    }
  }
};

const drawFormat = (bits: number, set: (x: number, y: number, dark: boolean) => void, size: number) => {
  for (let i = 0; i <= 5; i++) set(8, i, bit(bits, i));
  set(8, 7, bit(bits, 6));
  set(8, 8, bit(bits, 7));
  set(7, 8, bit(bits, 8));
  for (let i = 9; i < 15; i++) set(14 - i, 8, bit(bits, i));
  for (let i = 0; i < 8; i++) set(size - 1 - i, 8, bit(bits, i));
  for (let i = 8; i < 15; i++) set(8, size - 15 + i, bit(bits, i));
  set(8, size - 8, true);
};

/** Codewords in the two-column zigzag from the bottom right, skipping reserved modules. */
const drawCodewords = (codewords: readonly number[], modules: boolean[][], reserved: boolean[][]) => {
  const size = modules.length;
  let i = 0;
  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5;
    for (let vert = 0; vert < size; vert++) {
      for (let j = 0; j < 2; j++) {
        const x = right - j;
        const y = ((right + 1) & 2) === 0 ? size - 1 - vert : vert;
        const row = modules[y] as boolean[];
        if (!(reserved[y] as boolean[])[x] && i < codewords.length * 8) {
          row[x] = bit(codewords[i >>> 3] as number, 7 - (i & 7));
          i++;
        }
      }
    }
  }
};

const applyMask = (mask: number, modules: boolean[][], reserved: boolean[][]) => {
  const test = MASKS[mask] as (x: number, y: number) => boolean;
  modules.forEach((row, y) => {
    row.forEach((dark, x) => {
      if (!(reserved[y] as boolean[])[x] && test(x, y)) row[x] = !dark;
    });
  });
};

/** Runs that read like a finder's 1:1:3:1:1, with four light modules on one side. `history` holds the last seven run lengths. */
const finderLike = (history: readonly number[]) => {
  const [h0, n, h2, h3, h4, h5, h6] = history as [number, number, number, number, number, number, number];
  const core = n > 0 && h2 === n && h3 === n * 3 && h4 === n && h5 === n;
  return (core && h0 >= n * 4 && h6 >= n ? 1 : 0) + (core && h6 >= n * 4 && h0 >= n ? 1 : 0);
};

/** The penalty of one row or column: long runs and finder-like patterns. */
const linePenalty = (line: readonly boolean[]) => {
  const size = line.length;
  let result = 0;
  let color = false;
  let run = 0;
  const history = [0, 0, 0, 0, 0, 0, 0];
  const addHistory = (length: number) => {
    // The light border outside the code counts as part of the first run.
    history.pop();
    history.unshift(history[0] === 0 ? length + size : length);
  };
  for (const dark of line) {
    if (dark === color) {
      run++;
      if (run === 5) result += PENALTY.run;
      else if (run > 5) result++;
    } else {
      addHistory(run);
      if (!color) result += finderLike(history) * PENALTY.finder;
      color = dark;
      run = 1;
    }
  }
  if (color) {
    addHistory(run);
    run = 0;
  }
  addHistory(run + size);
  return result + finderLike(history) * PENALTY.finder;
};

/** ISO/IEC 18004's mask penalty: runs, 2×2 blocks, finder-like patterns and the dark/light balance. */
export const maskPenalty = (modules: boolean[][]) => {
  const size = modules.length;
  let result = 0;
  let dark = 0;
  for (let y = 0; y < size; y++) {
    const row = modules[y] as boolean[];
    result += linePenalty(row);
    result += linePenalty(modules.map((r) => r[y] as boolean));
    for (let x = 0; x < size; x++) {
      if (row[x]) dark++;
      const next = modules[y + 1];
      if (next && x < size - 1 && row[x] === row[x + 1] && row[x] === next[x] && row[x] === next[x + 1]) result += PENALTY.block;
    }
  }
  const total = size * size;
  return result + (Math.ceil(Math.abs(dark * 20 - total * 10) / total) - 1) * PENALTY.balance;
};

/**
 * Encodes text as a QR code in byte mode (UTF-8), in the smallest version that fits at the level. Throws when it doesn't
 * fit even version 40. `modules[y][x]` is true for a dark module; draw it any way you like, or use `<QRCode>`.
 */
export const createQRCode = (text: string, options: QRCodeOptions = {}): QRMatrix => {
  const { errorCorrection = ERROR_CORRECTION.M, minVersion = MIN_VERSION, mask: forcedMask } = options;
  const bytes = toUtf8(text);
  const version = pickVersion(bytes.length, errorCorrection, minVersion);
  if (version < 0) {
    throw new RangeError(
      `Too long for a QR code: ${bytes.length} bytes, at most ${byteCapacity(MAX_VERSION, errorCorrection)} at level ${errorCorrection}.`
    );
  }
  const size = version * 4 + 17;
  const modules = grid(size);
  const reserved = grid(size);
  drawFunctionPatterns(version, modules, reserved);
  drawCodewords(addErrorCorrection(dataBytes(bytes, version, errorCorrection), version, errorCorrection), modules, reserved);
  const setFormat = (x: number, y: number, dark: boolean) => {
    (modules[y] as boolean[])[x] = dark;
  };
  let mask = forcedMask ?? -1;
  if (mask < 0) {
    let best = Number.POSITIVE_INFINITY;
    for (let m = 0; m < MASKS.length; m++) {
      applyMask(m, modules, reserved);
      drawFormat(formatBits(errorCorrection, m), setFormat, size);
      const penalty = maskPenalty(modules);
      if (penalty < best) {
        best = penalty;
        mask = m;
      }
      applyMask(m, modules, reserved);
    }
  }
  applyMask(mask, modules, reserved);
  drawFormat(formatBits(errorCorrection, mask), setFormat, size);
  return {
    version,
    size,
    errorCorrection,
    mask,
    modules,
  };
};

/** Each row's dark modules as runs, so a code draws with one view per run instead of one per module. */
export const toRuns = (modules: readonly (readonly boolean[])[]): QRRun[] => {
  const runs: QRRun[] = [];
  modules.forEach((row, y) => {
    let start = -1;
    for (let x = 0; x <= row.length; x++) {
      if (row[x] && start < 0) start = x;
      else if (!row[x] && start >= 0) {
        runs.push({ x: start, y, length: x - start });
        start = -1;
      }
    }
  });
  return runs;
};

/** Clears the modules under a centred logo, `share` of the code's width, so it sits on a clean plate. */
export const clearCenter = (modules: readonly (readonly boolean[])[], share: number): boolean[][] => {
  const size = modules.length;
  const span = Math.ceil(size * share);
  // Same parity as the code, so the cleared square stays centred on a module.
  const side = span % 2 === size % 2 ? span : span + 1;
  const start = (size - side) / 2;
  return modules.map((row, y) => row.map((dark, x) => dark && !(x >= start && x < start + side && y >= start && y < start + side)));
};

/** The code's square, in its background color and the design's corners. */
export const getQRFrame = (size: number, backgroundColor: string, borderRadius: number): ViewStyle => ({
  width: size,
  height: size,
  backgroundColor,
  borderRadius,
});

/** One run of dark modules along a row, drawn as a single view. */
export const getRunStyle = (run: { x: number; y: number; length: number }, cell: number, offset: number, color: string): ViewStyle => ({
  left: offset + run.x * cell,
  top: offset + run.y * cell,
  width: run.length * cell,
  height: cell,
  backgroundColor: color,
});

/** The logo's plate in the middle of the code, on the code's background. */
export const getLogoPlate = (side: number, backgroundColor: string, borderRadius: number): ViewStyle => ({
  width: side,
  height: side,
  backgroundColor,
  borderRadius,
});
