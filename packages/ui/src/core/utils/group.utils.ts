/** The group to head row `index` with: its `group` where a run of that group starts, else nothing. */
export const groupHeadingAt = (items: readonly { group?: string }[], index: number) => {
  const group = items[index]?.group;
  return group && group !== items[index - 1]?.group ? group : undefined;
};
