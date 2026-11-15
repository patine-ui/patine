import type { Theme } from '@/core/theme/theme.types';
import { MESSAGE_FROM } from './chat.constants';
import type { ChatDesign, MessageFrom } from './chat.types';

/** A bubble's fill and text color: sent bubbles on a primary fill read in `onPrimary`, everything else in `text`. */
export const getBubbleColors = (colors: Theme['colors'], look: ChatDesign, from: MessageFrom) => {
  const fill = from === MESSAGE_FROM.me ? look.mine : look.theirs;
  return {
    background: colors[fill],
    text: fill === 'primary' ? colors.onPrimary : colors.text,
    border: from === MESSAGE_FROM.them && look.theirsBorder ? colors.border : 'transparent',
  };
};

/** The bubble's corners, with the small one at the bottom on the sender's side. */
export const getBubbleCorners = (look: ChatDesign, from: MessageFrom) => ({
  borderTopLeftRadius: look.radius,
  borderTopRightRadius: look.radius,
  borderBottomLeftRadius: from === MESSAGE_FROM.them ? look.tailRadius : look.radius,
  borderBottomRightRadius: from === MESSAGE_FROM.me ? look.tailRadius : look.radius,
});

/** The text to send: trimmed, or `null` when there's nothing to send or sending is blocked. */
export const getSendableText = (text: string, blocked: boolean): string | null => {
  const trimmed = text.trim();
  return blocked || trimmed.length === 0 ? null : trimmed;
};
