import { getArrowFrame, getPlacement } from './popover.utils';

const area = { width: 400, height: 800 };
const size = { width: 200, height: 100 };
const trigger = (x: number, y: number) => ({
  x,
  y,
  width: 40,
  height: 40,
});
const place = (t: ReturnType<typeof trigger>, options: Partial<Parameters<typeof getPlacement>[0]> = {}) =>
  getPlacement({
    trigger: t,
    size,
    area,
    side: 'bottom',
    align: 'center',
    sideOffset: 4,
    rtl: false,
    ...options,
  });

describe('getPlacement', () => {
  it('opens on the asked side, centred on the trigger', () => {
    expect(place(trigger(180, 100))).toEqual({ side: 'bottom', x: 100, y: 144, arrow: 100 });
    expect(place(trigger(180, 400), { side: 'top' })).toMatchObject({ side: 'top', x: 100, y: 296 });
    expect(place(trigger(180, 400), { side: 'right', size: { width: 100, height: 100 } })).toMatchObject({ side: 'right', x: 224, y: 370 });
    expect(place(trigger(180, 400), { side: 'left', size: { width: 100, height: 100 } })).toMatchObject({ side: 'left', x: 76, y: 370 });
  });

  it('flips to the opposite side when there is no room', () => {
    expect(place(trigger(180, 720)).side).toBe('top');
    expect(place(trigger(180, 20), { side: 'top' }).side).toBe('bottom');
    expect(place(trigger(20, 400), { side: 'left', size: { width: 100, height: 100 } }).side).toBe('right');
  });

  it("stays put when neither side has room and the asked one has more, and doesn't leave the window", () => {
    const tall = { width: 200, height: 500 };
    const p = place(trigger(180, 360), { size: tall });
    expect(p.side).toBe('bottom');
    expect(p.y).toBe(area.height - 8 - tall.height);
  });

  it('lines up with the start or end edge, swapped in right-to-left layouts', () => {
    expect(place(trigger(100, 100), { align: 'start' }).x).toBe(100);
    expect(place(trigger(100, 100), { align: 'end' }).x).toBe(8);
    expect(place(trigger(300, 100), { align: 'end' }).x).toBe(140);
    expect(place(trigger(300, 100), { align: 'start', rtl: true }).x).toBe(140);
    expect(place(trigger(100, 100), { align: 'end', rtl: true }).x).toBe(100);
    expect(place(trigger(180, 400), { side: 'right', align: 'start', rtl: true, size: { width: 100, height: 100 } }).y).toBe(400);
  });

  it('clamps to the window edge and keeps the arrow on the trigger', () => {
    const p = place(trigger(4, 100));
    expect(p.x).toBe(8);
    expect(p.arrow).toBe(16);
    const q = place(trigger(370, 100));
    expect(q.x).toBe(192);
    expect(q.arrow).toBe(184);
  });
});

describe('getArrowFrame', () => {
  it('sits outside the edge facing the trigger, turned towards it', () => {
    const p = { x: 0, y: 0, arrow: 50 };
    expect(getArrowFrame({ ...p, side: 'bottom' }, size)).toEqual({ left: 42, top: -8, transform: [{ rotate: '0deg' }] });
    expect(getArrowFrame({ ...p, side: 'top' }, size)).toMatchObject({ left: 42, top: 100 });
    expect(getArrowFrame({ ...p, side: 'right' }, size)).toMatchObject({ left: -12, top: 46 });
    expect(getArrowFrame({ ...p, side: 'left' }, size)).toMatchObject({ left: 196, top: 46 });
  });
});
