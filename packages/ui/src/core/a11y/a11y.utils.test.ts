import { AccessibilityInfo } from 'react-native';

import { FOCUS_RING } from './a11y.constants';
import { announce, findNextEnabled, focusRing, hitSlopFor } from './a11y.utils';

let mockWeb = false;
jest.mock('@/core/core.constants', () => ({
  ...jest.requireActual('@/core/core.constants'),
  get IS_WEB() {
    return mockWeb;
  },
}));

describe('focusRing', () => {
  it('draws a solid outline just outside the control', () => {
    expect(focusRing('#00f')).toEqual({
      outlineColor: '#00f',
      outlineStyle: 'solid',
      outlineWidth: FOCUS_RING.width,
      outlineOffset: FOCUS_RING.offset,
    });
  });
});

describe('hitSlopFor', () => {
  it('grows a small control to 44pt', () => {
    expect(hitSlopFor(32, 32)).toEqual({ top: 6, bottom: 6, left: 6, right: 6 });
    expect(hitSlopFor(undefined, 36)).toEqual({ top: 4, bottom: 4, left: 0, right: 0 });
    expect(hitSlopFor(28, undefined)).toEqual({ top: 0, bottom: 0, left: 8, right: 8 });
  });

  it('adds nothing when the control is big enough or its size is unknown', () => {
    expect(hitSlopFor(44, 48)).toBeUndefined();
    expect(hitSlopFor(undefined, undefined)).toBeUndefined();
  });
});

describe('findNextEnabled', () => {
  const items = [{ value: 'a', disabled: false }, { value: 'b', disabled: true }, { value: 'c' }];

  it('skips disabled items and wraps around both ways', () => {
    expect(findNextEnabled(items, 0, 1)?.value).toBe('c');
    expect(findNextEnabled(items, 2, 1)?.value).toBe('a');
    expect(findNextEnabled(items, 0, -1)?.value).toBe('c');
  });

  it('finds the first and last enabled items from outside the list', () => {
    const edges = [{ value: 'x', disabled: true }, ...items, { value: 'y', disabled: true }];
    expect(findNextEnabled(edges, -1, 1)?.value).toBe('a');
    expect(findNextEnabled(edges, edges.length, -1)?.value).toBe('c');
  });

  it('finds nothing when every item is disabled', () => {
    expect(findNextEnabled([{ disabled: true }], 0, 1)).toBeUndefined();
    expect(findNextEnabled([], -1, 1)).toBeUndefined();
  });
});

describe('announce', () => {
  afterEach(() => {
    mockWeb = false;
    Reflect.deleteProperty(globalThis, 'document');
  });

  it('queues a polite announcement on native, and interrupts for an assertive one', () => {
    const say = jest.spyOn(AccessibilityInfo, 'announceForAccessibilityWithOptions').mockClear();
    announce('Saved');
    announce('Failed', { assertive: true });
    expect(say).toHaveBeenNthCalledWith(1, 'Saved', { queue: true });
    expect(say).toHaveBeenNthCalledWith(2, 'Failed', { queue: false });
  });

  it('writes to one hidden live region on the web', () => {
    jest.useFakeTimers();
    mockWeb = true;
    const nodes: Record<string, { id: string; textContent: string | null; attrs: Record<string, string> }> = {};
    const document = {
      body: { appendChild: (node: { id: string }) => Object.assign(nodes, { [node.id]: node }) },
      getElementById: (id: string) => nodes[id] ?? null,
      createElement: () => {
        const attrs: Record<string, string> = {};
        return {
          id: '',
          textContent: null,
          attrs,
          setAttribute: (name: string, value: string) => Object.assign(attrs, { [name]: value }),
        };
      },
    };
    Reflect.set(globalThis, 'document', document);

    announce('Moved to 2 of 3');
    jest.runAllTimers();
    announce('Removed', { assertive: true });
    jest.runAllTimers();

    const regions = Object.values(nodes);
    expect(regions).toHaveLength(1);
    expect(regions[0]?.textContent).toBe('Removed');
    expect(regions[0]?.attrs['aria-live']).toBe('assertive');
    jest.useRealTimers();
  });
});
