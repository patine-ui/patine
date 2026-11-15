import type React from 'react';
import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native';

import type { ThemableProps, ValueOf } from '@/core/core.types';
import type { Theme } from '@/core/theme/theme.types';
import type { MESSAGE_FROM } from './chat.constants';

export type MessageFrom = ValueOf<typeof MESSAGE_FROM>;

export interface MessageBubbleProps extends ViewProps, ThemableProps {
  /** The message: a string, or any content such as an image */
  children?: React.ReactNode;
  /** 'me' sits at the end in the primary color; 'them' at the start. Default: 'them' */
  from?: MessageFrom;
  /** The sender's name above the bubble, for group chats and assistants */
  name?: string;
  /** Under the bubble, e.g. "9:41" or "Read" */
  meta?: string;
  /** The bubble itself */
  bubbleStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export interface ChatComposerLabels {
  /** The input's name for screen readers. Default: 'Message' */
  input: string;
  /** The send button's name. Default: 'Send' */
  send: string;
  /** The stop button's name, shown while `sending` when there's an `onStop`. Default: 'Stop' */
  stop: string;
}

export interface ChatComposerProps extends ThemableProps {
  value?: string;
  /** Initial text when uncontrolled. Default: '' */
  defaultValue?: string;
  /** Called as the user types; never when `value` changes from your code */
  onValueChange?: (text: string) => void;
  /** Called with the trimmed text when the user sends it; the composer then clears itself */
  onSend: (text: string) => void;
  placeholder?: string;
  /** Blocks typing and sending */
  disabled?: boolean;
  /** Shows a spinner on the send button and blocks sending, e.g. while an assistant replies */
  sending?: boolean;
  /** Turns the send button into a stop button while `sending`, e.g. to stop an assistant's reply. Escape stops too */
  onStop?: () => void;
  /** Before the input, e.g. an attach button */
  leading?: React.ReactNode;
  /** The most lines the input grows to before it scrolls. Default: 5 */
  maxRows?: number;
  labels?: Partial<ChatComposerLabels>;
  style?: StyleProp<ViewStyle>;
}

export interface ChatDesign {
  radius: number;
  /** The corner on the sender's side, nearest the next bubble */
  tailRadius: number;
  mine: keyof Theme['colors'];
  theirs: keyof Theme['colors'];
  theirsBorder: boolean;
}
