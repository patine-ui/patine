import { MIN_POINT_DISTANCE } from './signature.constants';
import type { SegmentBox, SignaturePoint, SignatureStroke, SvgOptions } from './signature.types';

const round = (n: number) => Math.round(n * 10) / 10;

/** Adds a point unless it's too close to the last one. */
export const addPoint = (stroke: SignatureStroke, point: SignaturePoint): SignatureStroke => {
  const last = stroke[stroke.length - 1];
  if (last && Math.hypot(point.x - last.x, point.y - last.y) < MIN_POINT_DISTANCE) return stroke;
  return [...stroke, { x: round(point.x), y: round(point.y) }];
};

/** The box of a bar `width` thick from `a` to `b`, rotated about its centre; a dot when they're the same point. */
export const segmentBox = (a: SignaturePoint, b: SignaturePoint, width: number): SegmentBox => {
  const length = Math.hypot(b.x - a.x, b.y - a.y) + width;
  return {
    left: (a.x + b.x) / 2 - length / 2,
    top: (a.y + b.y) / 2 - width / 2,
    width: length,
    height: width,
    angle: (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI,
  };
};

/** Every segment of a stroke, or one dot for a tap. */
export const strokeSegments = (stroke: SignatureStroke, width: number): SegmentBox[] => {
  const [first] = stroke;
  if (!first) return [];
  if (stroke.length === 1) return [segmentBox(first, first, width)];
  return stroke.slice(1).map((point, i) => segmentBox(stroke[i] as SignaturePoint, point, width));
};

export const isSignatureEmpty = (strokes: readonly SignatureStroke[]) => strokes.every((stroke) => stroke.length === 0);

/** An SVG path `d` for the strokes, to draw with react-native-svg or in a browser. A tap becomes a zero-length line. */
export const signatureToPath = (strokes: readonly SignatureStroke[]) =>
  strokes
    .filter((stroke) => stroke.length > 0)
    .map((stroke) => {
      const [first, ...rest] = stroke as [SignaturePoint, ...SignaturePoint[]];
      const tail = rest.length ? rest : [first];
      return `M${first.x} ${first.y} ${tail.map((p) => `L${p.x} ${p.y}`).join(' ')}`;
    })
    .join(' ');

const escapeAttribute = (value: string) => value.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);

/** A standalone SVG document of the signature, to save, upload or show in an <img>. */
export const signatureToSvg = (
  strokes: readonly SignatureStroke[],
  { width, height, color = '#000000', strokeWidth = 3, backgroundColor }: SvgOptions
) => {
  const background = backgroundColor ? `<rect width="100%" height="100%" fill="${escapeAttribute(backgroundColor)}"/>` : '';
  const path = signatureToPath(strokes);
  const line = path
    ? `<path d="${path}" fill="none" stroke="${escapeAttribute(color)}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>`
    : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${background}${line}</svg>`;
};
