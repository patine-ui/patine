import type { QRErrorCorrection } from './qrcode.types';
import {
  alignmentPositions,
  byteCapacity,
  clearCenter,
  createQRCode,
  dataCodewords,
  formatBits,
  gfMultiply,
  maskPenalty,
  pickVersion,
  rsDivisor,
  rsRemainder,
  toRuns,
  toUtf8,
  versionBits,
} from './qrcode.utils';

// Generated with segno 1.6.6 (pure Python, an independent encoder), with its padding fixed to stop at the byte
// boundary as ISO/IEC 18004 7.4.10 says. Rows are hex, most significant bit first.
const VECTORS = [
  {
    text: 'HELLO WORLD',
    errorCorrection: 'M',
    forcedMask: undefined,
    version: 1,
    mask: 4,
    rows: [
      '1fd97f',
      '104241',
      '174a5d',
      '17525d',
      '175d5d',
      '105241',
      '1fd57f',
      '1300',
      '117ef9',
      '2170f',
      '7e6d2',
      '1f1880',
      '1f5566',
      '15eb',
      '1fdd5a',
      '104bb3',
      '175ac6',
      '17491b',
      '174e38',
      '104280',
      '1fdff5',
    ],
  },
  {
    text: 'שלום עולם 👋',
    errorCorrection: 'Q',
    forcedMask: 7,
    version: 3,
    mask: 7,
    rows: [
      '1fdd747f',
      '1042e241',
      '1758375d',
      '175b6c5d',
      '1749d15d',
      '10508041',
      '1fd5557f',
      '1f7f00',
      'af98ded',
      '1fbd0eab',
      'a670aad',
      '1601bf11',
      '1b5fd4bb',
      '188e1576',
      '116d7289',
      '1ca8a2c4',
      '12cc13d7',
      '9ad229c',
      '107d03f6',
      'b7726',
      '1259cbfb',
      '1ebf10',
      '1fd6a551',
      '10543719',
      '1746b5ff',
      '1753ee8d',
      '174933cd',
      '105dd4ae',
      '1fcd77a6',
    ],
  },
  {
    text: 'A'.repeat(100),
    errorCorrection: 'M',
    forcedMask: undefined,
    version: 6,
    mask: 1,
    rows: [
      '1fd71eeee7f',
      '104f1111141',
      '17577bbbb5d',
      '174a904445d',
      '17475aeee5d',
      '105fd111141',
      '1fd5555557f',
      'c4444400',
      '146dabbbb25',
      '152de111120',
      '1cf1eeeed5',
      'a95244448a',
      '16fd2bbbb7f',
      '5a99111120',
      '114e2deeed5',
      '1217074448a',
      '1eed29bbb7f',
      '1b82a911120',
      '1d7002eeed5',
      '32a984448a',
      '1af9abfbb7f',
      '190a2111120',
      '1d78ceeeed5',
      '506d444488',
      '1cc43bbbb7d',
      '18163111120',
      '10450eeeed5',
      'b82544448a',
      '9c53abbb7f',
      '9970011120',
      '19440eeeed5',
      '381544448a',
      '18440bbbbff',
      '179191110',
      '1fd89e2ef55',
      '104be48471a',
      '174a6fbbbff',
      '17479d11281',
      '175cd2eefd5',
      '10476844428',
      '1fd6a7bb97d',
    ],
  },
  {
    text: 'x'.repeat(300),
    errorCorrection: 'L',
    forcedMask: 2,
    version: 11,
    mask: 2,
    rows: [
      '1fc6aaac31ac137f',
      '105540c664f94341',
      '174a25a3ce53e75d',
      '17559f299b06bd5d',
      '1747ca7df1ac1e5d',
      '105768d714f94c41',
      '1fd555555555557f',
      '931831e53e700',
      '1f7e9a2bfb06b1aa',
      '1e80c47f31ac18ce',
      'b6862d564f94e9b',
      '15273480ce53e731',
      '3559f2a9b06b164',
      '1d82ca7f31ac18ce',
      'd6be09564f94e9b',
      '1bd7500ce53e731',
      '13d1efba9b06b164',
      '51e1a1f31ac18ce',
      '14dbf0f564f94e9b',
      '19bd1590ce53e731',
      '17c3df2a9b06b164',
      '10bd0a7f31ac18ce',
      '15dba4d564f94e9b',
      '1da93d80ce53e731',
      '1fd0942a9b06b164',
      '9a8f7f31ac18ce',
      '15eca1d564f94e9b',
      '1c273780ce53e731',
      '1dfd9f2bfb06b1f6',
      '5118a7f11ac191e',
      '556605754f94d5b',
      'b1ab5c11e53e711',
      'ffd0f59fb06b3f4',
      '9192aad91ac1a6e',
      'dd640c634f94dcb',
      '82aa5a26e53e591',
      '1afe9f29cb06b234',
      '1a1b8a7d91ac1a6e',
      '9e5a8d634f94dcb',
      '109831826e53e591',
      '2c79a21cb06b234',
      '1314847191ac1a6c',
      '9c8a2d634f94dc9',
      '100a34826e53e593',
      '2d89f29cb06b235',
      '13148a7d91ac1a6e',
      '1e6a09634f94dcb',
      'a3e75026e53e591',
      '13d4efb9cb06b234',
      'f94da1d91ac1a6e',
      '7e630f634f94dcb',
      '1d3e55926e53e591',
      '1e555f29fb06b3f4',
      '164a7d11ac1b1e',
      '1fd064dd54f94f5b',
      '104cfd851e53e711',
      '1754142ffb06b1f4',
      '175d0f72c1ac193d',
      '175161d794f94c69',
      '1057f7813e53e6c1',
      '1fd51f286b06b397',
    ],
  },
  {
    text: '0123456789'.repeat(40),
    errorCorrection: 'H',
    forcedMask: undefined,
    version: 21,
    mask: 2,
    rows: [
      '1fd02a4bce3aa1c3369ad78e7f',
      '10518d29c4040b6d27a17a1041',
      '175ddb5440024e27485e85e25d',
      '174eaedc6b87f02ac418fb0e5d',
      '174c4defdfdb7f99b57cc5b55d',
      '1058d01c5f8951dfd7c57a1241',
      '1fd5555555555555555555557f',
      '105084614a5175e8c685eb00',
      '758c9bff4d6dfd77dfc7f9ce7',
      '1f273349ab02c619707fe3efa5',
      '96a22185d3d60ee47a17a145a',
      '113725a3c862cce4b8de85eba3',
      '1463db0b21a1c5197591e2047e',
      '1e942c2ed614e122724ca1efe9',
      'be6f79163bb8f8a17e17a1616',
      'a29bff4000bc220d89e85ebb0',
      '9df3eb6305f27394086486c5c',
      '20e56d809c4e7d5945a938a21',
      '5263cc87e5e0d2b7217a141a',
      '1f03661ae62c0fc8289e85ebb6',
      '17de0cfba0afa1636c8923947b',
      '1c921a6cc67a3ac3367ac48aa9',
      '1571bd0708c8527c27a17a1512',
      '152fcb7ac446ad25681e85ebb0',
      '1cdbdcae70b041ae493c8204e',
      'a0e6dc5d31b8eab8558e5ad21',
      '1bf9c13fd781bfdce77d7a15f2',
      '1b13518c69865174f8c685e910',
      '75ad9ad741eb5c54dd47f9f5c',
      '1f17214c63ce113850c7e3ef19',
      '9f80307d9b9dfdd77fd7a15f6',
      '13a717878ceedbc5882285e950',
      '16e1da37a1adac0845dfc135af',
      '18a60e35d2d4f0104ada80cd51',
      '865d6a0ab3b748b07fd7a16a6',
      'b2bacffc44b2123f82285e851',
      'c7c3cb6f4573e3a44df486cae',
      '5af54c94d80f5c49410a1ab75',
      '75141ea4361a2e0a78d7a16a2',
      '1e2366216a202ec8082285e991',
      '176e2efe24eba0515c5e00a4bc',
      '1a1008644af635d33a86d78959',
      '14c1af344c8c256e07d97a1622',
      '139fdb4e00ce212668a285e850',
      '74f9cece747de19cc9ed921be',
      'f9f7fd09357c29bb588c5bd71',
      '1dd8d1261bc1b9dfe7f97a1622',
      '1a30409c65ce3366f82285e890',
      '1f8d8a7f81effd5457e5dbdfc',
      '1f16114c6fc6b11a6cc7e3ed19',
      'f58030d51f515dc44557a1756',
      '1317178c48a6b1d7bf4685eb10',
      '13f1da3fe1a95fe2cd7fc137ff',
      '19260e3bda145e4d3b9e80ccb1',
      'ec5d6a9673fc56fa7517a1546',
      '88bacf804432e6a889a85e8a1',
      'dec3cb034570b41df63486f1e',
      '5af54c8c9484f5e449ca1a8a5',
      '5e141ef4f61a26497597a1552',
      '18a366206a6887b378fe85eae1',
      '116e2ef4a4eb81ce652200a79c',
      '1eb00865caf62e99de9ed788a9',
      '1361af3ace9d25ef17517a1472',
      '149fdb4e30cd2271580e85e8a0',
      '1c6f9ce8e744ce822222d9239e',
      '162f7fdbd354e02c659cc5bcb1',
      '1d58d12f9be1b55c37457a1452',
      '1d80409265ed155c089a85ea20',
      'fd8d8ace93fe12c6d225dbfdc',
      '30611481fc4be259c9fe3ecb9',
      '3f80307d0c43f18c77d7a15f6',
      '11717846a85b19f784685e910',
      '17519a3542ba55e60ad701b55f',
      '191acafc591771cdf2464c0311',
      '1ff9d6e7d63ddf6b6b7d7a17f6',
      '19f64fe557102e204ca85ea71',
      'dd8787267673989563bc820ae',
      '43710c7da6943d681e0e5aed5',
      '15658d64ef70aea49b1d7a1592',
      '18876ea25878b5bb30d285ea51',
      '8c6e2b904f89e8e2b1a486cec',
      'fa448243bd40b59d4621b0399',
      '13e9e374edac0f67939d7a15a2',
      '1daf97c350fe02b158da85ea70',
      '4eb98e87666c78eef0e11a42e',
      '723735ca344d1a82ae0c5b891',
      '4f099a1c9e2bed0ffdd7a1592',
      '1d284412d5ed355084f285ea50',
      '16d890ae091cf268221ed134ac',
      '122e998ccfd5bea1dce32b6599',
      '136c8f07c3e4105c839d7a15a6',
      '16971707aaa6959f7cd285ea50',
      '149567fd2a87f220aff01b5ff',
      '1a4efc4905514176464c0111',
      '1fc196ed760ed52f6f557a1556',
      '1043e4fc4670112e40c685e911',
      '1750f8bfe4653f41567fc823fe',
      '1753dc8e7869759ac5706d2726',
      '1751c924ee4281641ba17a14da',
      '104fa62c1b4a8e33b85e85e982',
      '1fce6ebe46ea868e2baa4cac7c',
    ],
  },
] as const;

/** Data bits per version (1–40) and level: ISO/IEC 18004 table 7, as segno lists it. */
const DATA_BITS = {
  L: [
    152, 272, 440, 640, 864, 1088, 1248, 1552, 1856, 2192, 2592, 2960, 3424, 3688, 4184, 4712, 5176, 5768, 6360, 6888, 7456, 8048, 8752,
    9392, 10208, 10960, 11744, 12248, 13048, 13880, 14744, 15640, 16568, 17528, 18448, 19472, 20528, 21616, 22496, 23648,
  ],
  M: [
    128, 224, 352, 512, 688, 864, 992, 1232, 1456, 1728, 2032, 2320, 2672, 2920, 3320, 3624, 4056, 4504, 5016, 5352, 5712, 6256, 6880, 7312,
    8000, 8496, 9024, 9544, 10136, 10984, 11640, 12328, 13048, 13800, 14496, 15312, 15936, 16816, 17728, 18672,
  ],
  Q: [
    104, 176, 272, 384, 496, 608, 704, 880, 1056, 1232, 1440, 1648, 1952, 2088, 2360, 2600, 2936, 3176, 3560, 3880, 4096, 4544, 4912, 5312,
    5744, 6032, 6464, 6968, 7288, 7880, 8264, 8920, 9368, 9848, 10288, 10832, 11408, 12016, 12656, 13328,
  ],
  H: [
    72, 128, 208, 288, 368, 480, 528, 688, 800, 976, 1120, 1264, 1440, 1576, 1784, 2024, 2264, 2504, 2728, 3080, 3248, 3536, 3712, 4112,
    4304, 4768, 5024, 5288, 5608, 5960, 6344, 6760, 7208, 7688, 7888, 8432, 8768, 9136, 9776, 10208,
  ],
};

const toHexRows = (modules: boolean[][]) => modules.map((row) => BigInt(`0b${row.map((d) => (d ? 1 : 0)).join('')}`).toString(16));
const LEVELS: QRErrorCorrection[] = ['L', 'M', 'Q', 'H'];

describe('QR encoder', () => {
  it('encodes UTF-8 like TextEncoder', () => {
    expect(toUtf8('A')).toEqual([0x41]);
    expect(toUtf8('é')).toEqual([0xc3, 0xa9]);
    expect(toUtf8('€')).toEqual([0xe2, 0x82, 0xac]);
    expect(toUtf8('👋')).toEqual([0xf0, 0x9f, 0x91, 0x8b]);
  });

  it('holds the data bits of ISO table 7 for every version and level', () => {
    for (const level of LEVELS) {
      for (let v = 1; v <= 40; v++) expect(dataCodewords(v, level) * 8).toBe(DATA_BITS[level][v - 1]);
    }
  });

  it('knows the byte capacities at the extremes', () => {
    expect([1, 40].map((v) => LEVELS.map((level) => byteCapacity(v, level)))).toEqual([
      [17, 14, 11, 7],
      [2953, 2331, 1663, 1273],
    ]);
    expect(pickVersion(17, 'L')).toBe(1);
    expect(pickVersion(18, 'L')).toBe(2);
    expect(pickVersion(10, 'M', 5)).toBe(5);
    expect(pickVersion(2954, 'L')).toBe(-1);
  });

  it('places alignment patterns as ISO annex E lists them', () => {
    expect(alignmentPositions(1)).toEqual([]);
    expect(alignmentPositions(2)).toEqual([6, 18]);
    expect(alignmentPositions(7)).toEqual([6, 22, 38]);
    expect(alignmentPositions(32)).toEqual([6, 34, 60, 86, 112, 138]);
    expect(alignmentPositions(40)).toEqual([6, 30, 58, 86, 114, 142, 170]);
  });

  it('computes format and version bits as ISO annexes C and D list them', () => {
    expect(formatBits('M', 0)).toBe(0b101010000010010);
    expect(formatBits('L', 4)).toBe(0b110011000101111);
    expect(formatBits('H', 7)).toBe(0b000100000111011);
    expect(versionBits(7)).toBe(0x07c94);
    expect(versionBits(40)).toBe(0x28c69);
  });

  it('does Reed–Solomon arithmetic in GF(256)', () => {
    expect(gfMultiply(0x53, 0xca)).toBe(gfMultiply(0xca, 0x53));
    expect(gfMultiply(2, 0x80)).toBe(0x1d);
    // The 1-M example from ISO annex I: "01234567" in numeric mode.
    const data = [0x10, 0x20, 0x0c, 0x56, 0x61, 0x80, 0xec, 0x11, 0xec, 0x11, 0xec, 0x11, 0xec, 0x11, 0xec, 0x11];
    expect(rsRemainder(data, rsDivisor(10))).toEqual([0xa5, 0x24, 0xd4, 0xc1, 0xed, 0x36, 0xc7, 0x87, 0x2c, 0x55]);
  });

  it.each(VECTORS)('matches an independent encoder: version $version, level $errorCorrection', (vector) => {
    const code = createQRCode(vector.text, { errorCorrection: vector.errorCorrection, mask: vector.forcedMask });
    expect(code.version).toBe(vector.version);
    expect(code.size).toBe(vector.version * 4 + 17);
    expect(code.mask).toBe(vector.mask);
    expect(toHexRows(code.modules)).toEqual(vector.rows);
  });

  it('picks the mask with the lowest penalty', () => {
    const chosen = createQRCode('https://patine.dev', { errorCorrection: 'L' });
    const penalties = Array.from({ length: 8 }, (_, mask) =>
      maskPenalty(createQRCode('https://patine.dev', { errorCorrection: 'L', mask }).modules)
    );
    expect(penalties[chosen.mask]).toBe(Math.min(...penalties));
  });

  it('fills version 40 and refuses one byte more', () => {
    const full = createQRCode('a'.repeat(2953), { errorCorrection: 'L' });
    expect(full.version).toBe(40);
    expect(full.size).toBe(177);
    expect(() => createQRCode('a'.repeat(2954), { errorCorrection: 'L' })).toThrow(RangeError);
  });
});

describe('QR drawing helpers', () => {
  it('merges each row into runs of dark modules', () => {
    expect(
      toRuns([
        [true, true, false, true],
        [false, false, false, false],
        [false, true, true, true],
      ])
    ).toEqual([
      { x: 0, y: 0, length: 2 },
      { x: 3, y: 0, length: 1 },
      { x: 1, y: 2, length: 3 },
    ]);
  });

  it('clears a centred square for a logo, keeping the code’s parity', () => {
    const all = Array.from({ length: 21 }, () => new Array<boolean>(21).fill(true));
    const cleared = clearCenter(all, 0.2);
    const light = cleared.flat().filter((dark) => !dark).length;
    expect(light).toBe(25);
    expect(cleared[10]?.[10]).toBe(false);
    expect(cleared[7]?.[10]).toBe(true);
  });
});
