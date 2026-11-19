import type { Design } from '@/core/theme/theme.types';
import type { ChatDesign } from './chat.types';

export const MESSAGE_FROM = {
  /** The person using the app: at the end, in the primary color */
  me: 'me',
  /** Anyone else, or an assistant: at the start, on a surface */
  them: 'them',
} as const;

/**
 * iOS Messages: round 18pt bubbles, sent ones filled with the primary color. Material 3 (Google Messages): 20dp bubbles with
 * a 4dp corner on the sender's side and a tinted container for sent ones. The web: 8px bubbles, received ones outlined.
 * Brand: 16pt with a small corner on the sender's side.
 */
export const CHAT_DESIGN: Record<Design, ChatDesign> = {
  brand: { radius: 16, tailRadius: 4, mine: 'primary', theirs: 'surface', theirsBorder: false },
  ios: { radius: 18, tailRadius: 18, mine: 'primary', theirs: 'surface', theirsBorder: false },
  material: { radius: 20, tailRadius: 4, mine: 'primaryMuted', theirs: 'surface', theirsBorder: false },
  web: { radius: 8, tailRadius: 8, mine: 'primary', theirs: 'background', theirsBorder: true },
};

/** The widest a bubble grows, as a share of the thread. */
export const BUBBLE_MAX_WIDTH = '80%';
