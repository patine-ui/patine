import { useEffect, useRef, useState } from 'react';

import { useLabels } from '@/core/theme/ThemeProvider';
import { Button } from './Button';
import { COPIED_GLYPH, COPY_GLYPH, COPY_TIMEOUT } from './link.constants';
import type { CopyButtonProps } from './link.types';
import { copyToWebClipboard } from './link.utils';

/**
 * Copies a value, then shows a check for a moment: an API key, a code, a link. Uses the browser clipboard on the web;
 * on iOS and Android, pass `onCopy` from your clipboard library. Screen readers hear "Copied".
 */
export const CopyButton = ({
  value,
  onCopy,
  label,
  copiedLabel: copiedLabelProp,
  timeout = COPY_TIMEOUT,
  variant = 'ghost',
  size,
  accessibilityLabel,
  ...rest
}: CopyButtonProps) => {
  const words = useLabels();
  const copiedLabel = copiedLabelProp ?? words.copied;
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );
  const copy = async () => {
    await (onCopy ? onCopy(value) : copyToWebClipboard(value));
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), timeout);
  };
  const name = copied ? copiedLabel : (accessibilityLabel ?? label ?? words.copy);
  return (
    <Button variant={variant} size={size ?? (label ? 'sm' : 'icon')} aria-label={name} aria-live="polite" onPress={copy} {...rest}>
      {label ? `${copied ? COPIED_GLYPH : COPY_GLYPH} ${copied ? copiedLabel : label}` : copied ? COPIED_GLYPH : COPY_GLYPH}
    </Button>
  );
};
