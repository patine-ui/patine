/** Whether any shorthand prop (`title`, `trigger`, `items`…) was given, so a root draws its own parts instead of its children. */
export const hasShorthand = (...values: unknown[]) => values.some((value) => value !== undefined && value !== null);
