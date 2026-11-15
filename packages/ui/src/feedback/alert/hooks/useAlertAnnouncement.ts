import { useCallback, useEffect, useRef } from 'react';
import { AccessibilityInfo, Platform } from 'react-native';

import { PLATFORM } from '@/core/core.constants';

/**
 * Collects the alert's text and, on iOS and Android, has the screen reader say it once when the alert appears: native
 * live regions don't announce a view that's just been added. The web uses `role="alert"`, which browsers announce.
 */
export const useAlertAnnouncement = (announce: boolean) => {
  const lines = useRef<string[]>([]);
  const register = useCallback((text: string) => {
    lines.current.push(text);
    return () => {
      lines.current = lines.current.filter((line) => line !== text);
    };
  }, []);

  // Runs after the title and description registered their text (children's effects run first).
  useEffect(() => {
    if (!announce || Platform.OS === PLATFORM.web || !lines.current.length) return;
    AccessibilityInfo.announceForAccessibility(lines.current.join('. '));
  }, [announce]);

  return register;
};
