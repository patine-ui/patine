import { groupHeadingAt } from './group.utils';

describe('groupHeadingAt', () => {
  it('heads the first item of each run of a group, and no ungrouped item', () => {
    const items = [{}, { group: 'Advanced' }, { group: 'Advanced' }, { group: 'Danger' }, { group: 'Advanced' }];
    expect(items.map((_, i) => groupHeadingAt(items, i))).toEqual([undefined, 'Advanced', undefined, 'Danger', 'Advanced']);
  });
});
