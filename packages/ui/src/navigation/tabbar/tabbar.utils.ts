import { MAX_BADGE } from './tabbar.constants';

/** A badge's text: the count, capped at "99+"; empty for a dot; null for none. */
export const formatBadge = (badge: number | boolean | undefined): string | null => {
  if (badge === true) return '';
  if (!badge || badge < 0) return null;
  return badge > MAX_BADGE ? `${MAX_BADGE}+` : String(badge);
};

/** A tab's name for screen readers, with its badge: "Inbox, 3 new". */
export const getTabLabel = (label: string, badge: number | boolean | undefined) => {
  const text = formatBadge(badge);
  if (text === null) return label;
  return text === '' ? `${label}, new` : `${label}, ${text} new`;
};
