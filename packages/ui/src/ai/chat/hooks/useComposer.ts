import type { TextInputKeyPressEvent } from 'react-native';

import { getSendableText } from '@/ai/chat/chat.utils';
import { useControllableState } from '@/core/hooks/useControllableState';

/** The composer's text, and sending it: the send button, or Enter on a hardware keyboard (Shift+Enter for a new line). */
export const useComposer = ({
  value,
  defaultValue = '',
  onValueChange,
  onSend,
  onStop,
  blocked,
}: {
  value?: string;
  defaultValue?: string;
  onValueChange?: (text: string) => void;
  onSend: (text: string) => void;
  /** Escape calls it, e.g. to stop a reply */
  onStop?: () => void;
  blocked: boolean;
}) => {
  const [text, setText] = useControllableState(value, defaultValue, onValueChange);
  const sendable = getSendableText(text, blocked);
  const send = () => {
    if (sendable === null) return;
    onSend(sendable);
    setText('');
  };
  const onKeyPress = (event: TextInputKeyPressEvent) => {
    // Hardware keyboards (the web, iPad) report Shift; a phone keyboard's return key never sends.
    const { key, shiftKey } = event.nativeEvent as { key: string; shiftKey?: boolean };
    if (key === 'Escape' && onStop) {
      onStop();
      return;
    }
    if (key !== 'Enter' || shiftKey) return;
    // Keeps the web from adding the new line; fired test events have no preventDefault.
    event.preventDefault?.();
    send();
  };
  return {
    text,
    setText,
    canSend: sendable !== null,
    send,
    onKeyPress,
  };
};
