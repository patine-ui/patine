import { useState } from 'react';
import type { ImageSourcePropType } from 'react-native';

import type { ImageStatus } from '@/display/image/image.types';
import { sourceKey, toImageStatus } from '@/display/image/image.utils';

/** Whether a source is loading, loaded or failed. A new source starts loading again; a missing one is an error. */
export const useImageStatus = (source: ImageSourcePropType | undefined, onLoad?: () => void, onError?: () => void) => {
  const key = sourceKey(source);
  const [settled, setSettled] = useState<{ key: string; status: ImageStatus } | null>(null);
  return {
    status: toImageStatus(key, settled),
    handleLoad: () => {
      setSettled({ key, status: 'loaded' });
      onLoad?.();
    },
    handleError: () => {
      setSettled({ key, status: 'error' });
      onError?.();
    },
  };
};
