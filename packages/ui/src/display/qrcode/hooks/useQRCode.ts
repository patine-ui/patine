import { useEffect, useMemo } from 'react';

import { DEFAULT_LOGO_SIZE, DEFAULT_QUIET_ZONE, ERROR_CORRECTION } from '@/display/qrcode/qrcode.constants';
import type { QRCodeProps } from '@/display/qrcode/qrcode.types';
import { clearCenter, createQRCode, toRuns } from '@/display/qrcode/qrcode.utils';

/** The largest logo the H level reliably recovers from. */
const MAX_LOGO_SHARE = 0.3;

/**
 * Encodes the value and lays it out on whole-point modules, so rows meet without hairline seams; what's left over widens
 * the quiet zone. Null when the value doesn't fit, after telling `onError`.
 */
export const useQRCode = ({ value, size = 200, errorCorrection, quietZone = DEFAULT_QUIET_ZONE, logo, logoSize, onError }: QRCodeProps) => {
  const level = errorCorrection ?? (logo ? ERROR_CORRECTION.H : ERROR_CORRECTION.M);
  const share = Math.min(MAX_LOGO_SHARE, logoSize ?? DEFAULT_LOGO_SIZE);
  const encoded = useMemo(() => {
    try {
      return {
        code: createQRCode(value, { errorCorrection: level }),
        error: null,
      };
    } catch (error) {
      return {
        code: null,
        error: error as Error,
      };
    }
  }, [value, level]);

  useEffect(() => {
    if (encoded.error) onError?.(encoded.error);
  }, [encoded.error, onError]);

  return useMemo(() => {
    const { code } = encoded;
    if (!code) return null;
    const modules = logo ? clearCenter(code.modules, share) : code.modules;
    const span = code.size + 2 * quietZone;
    const cell = Math.max(1, Math.floor(size / span));
    const offset = Math.floor((size - code.size * cell) / 2);
    return {
      cell,
      offset,
      runs: toRuns(modules),
      logoSide: Math.ceil(code.size * share) * cell,
    };
  }, [encoded, logo, share, quietZone, size]);
};
