import { type GestureResponderEvent, Linking } from 'react-native';

import { IS_WEB } from '@/core/core.constants';

/** What opens a link in a new tab, safely: the new page can't reach back into this one. */
export const EXTERNAL_HREF_ATTRS = { target: '_blank', rel: 'noopener noreferrer' } as const;

/**
 * The props that make a pressable a real `<a href>` on the web, so crawlers follow it and people can open it in a new tab or
 * copy its address. Nothing on iOS and Android, where `openHref` opens it on press.
 */
export const getAnchorProps = (href: string | undefined, external = false, disabled = false) =>
  IS_WEB && href && !disabled
    ? {
        href,
        hrefAttrs: external ? EXTERNAL_HREF_ATTRS : undefined,
      }
    : {};

/** On iOS and Android, opens `href` after a press, unless the press handler called `event.preventDefault()`. */
export const openHref = (event: GestureResponderEvent, href: string | undefined) => {
  if (!IS_WEB && href && !event.isDefaultPrevented()) Linking.openURL(href);
};
