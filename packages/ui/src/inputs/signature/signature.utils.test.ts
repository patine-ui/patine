import { addPoint, isSignatureEmpty, segmentBox, signatureToPath, signatureToSvg, strokeSegments } from './signature.utils';

describe('signature utils', () => {
  it('skips points too close to the last one, and rounds to a tenth', () => {
    const one = addPoint([], { x: 10.04, y: 20 });
    expect(one).toEqual([{ x: 10, y: 20 }]);
    expect(addPoint(one, { x: 10.5, y: 20.5 })).toBe(one);
    expect(addPoint(one, { x: 14, y: 20 })).toEqual([
      { x: 10, y: 20 },
      { x: 14, y: 20 },
    ]);
  });

  it('lays a segment as a rotated, capped bar', () => {
    expect(segmentBox({ x: 0, y: 0 }, { x: 10, y: 0 }, 2)).toEqual({ left: -1, top: -1, width: 12, height: 2, angle: 0 });
    expect(segmentBox({ x: 0, y: 0 }, { x: 0, y: 10 }, 2).angle).toBe(90);
    expect(strokeSegments([{ x: 5, y: 5 }], 4)).toEqual([{ left: 3, top: 3, width: 4, height: 4, angle: 0 }]);
    expect(strokeSegments([], 4)).toEqual([]);
    expect(
      strokeSegments(
        [
          { x: 0, y: 0 },
          { x: 3, y: 4 },
          { x: 6, y: 0 },
        ],
        1
      )
    ).toHaveLength(2);
  });

  it('knows an empty pad', () => {
    expect(isSignatureEmpty([])).toBe(true);
    expect(isSignatureEmpty([[]])).toBe(true);
    expect(isSignatureEmpty([[{ x: 1, y: 1 }]])).toBe(false);
  });

  it('exports an SVG path and document', () => {
    const strokes = [
      [
        { x: 1, y: 2 },
        { x: 3, y: 4 },
      ],
      [{ x: 9, y: 9 }],
    ];
    expect(signatureToPath(strokes)).toBe('M1 2 L3 4 M9 9 L9 9');
    expect(signatureToPath([])).toBe('');
    const svg = signatureToSvg(strokes, { width: 100, height: 50, color: '#123"x', backgroundColor: '#fff' });
    expect(svg).toContain('viewBox="0 0 100 50"');
    expect(svg).toContain('<rect width="100%" height="100%" fill="#fff"/>');
    expect(svg).toContain('stroke="#123&#34;x"');
    expect(signatureToSvg([], { width: 10, height: 10 })).not.toContain('<path');
  });
});
