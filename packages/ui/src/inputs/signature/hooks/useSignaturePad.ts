import { useRef, useState } from 'react';
import { PanResponder } from 'react-native';

import type { PanHandlers } from '@/core/core.types';
import { useControllableState } from '@/core/hooks/useControllableState';
import { toLayoutScale } from '@/core/utils/touch.utils';
import type { SignaturePadProps, SignatureStroke } from '@/inputs/signature/signature.types';
import { addPoint, isSignatureEmpty } from '@/inputs/signature/signature.utils';

const NONE: readonly SignatureStroke[] = [];

type Params = Pick<SignaturePadProps, 'value' | 'defaultValue' | 'onValueChange' | 'onBegin' | 'onEnd' | 'disabled'>;

/**
 * Drawing on the pad: the pen claims the touch at once (so a sheet or scroll view around it doesn't take it), each move
 * adds a point, and lifting it commits the stroke through `onValueChange`.
 */
export const useSignaturePad = ({ value, defaultValue = NONE, onValueChange, onBegin, onEnd, disabled = false }: Params) => {
  const [strokes, setStrokes] = useControllableState<readonly SignatureStroke[]>(value, defaultValue);
  const [current, setCurrent] = useState<SignatureStroke>([]);
  const g = useRef({ x: 0, y: 0, scale: 1, stroke: [] as SignatureStroke }).current;
  const latest = useRef({ strokes, onValueChange, onBegin, onEnd, disabled, setStrokes });
  latest.current = { strokes, onValueChange, onBegin, onEnd, disabled, setStrokes };

  const commit = (next: SignatureStroke[]) => {
    latest.current.setStrokes(next);
    latest.current.onValueChange?.(next);
  };

  const end = () => {
    if (!g.stroke.length) return;
    commit([...latest.current.strokes, g.stroke]);
    g.stroke = [];
    setCurrent([]);
    latest.current.onEnd?.();
  };

  const responder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !latest.current.disabled,
      onMoveShouldSetPanResponder: () => !latest.current.disabled,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: (e) => {
        // Touches in a zoomed region of a web page come in screen pixels; the pad draws in its own.
        g.scale = toLayoutScale(e.currentTarget);
        g.x = e.nativeEvent.locationX * g.scale;
        g.y = e.nativeEvent.locationY * g.scale;
        g.stroke = addPoint([], { x: g.x, y: g.y });
        setCurrent(g.stroke);
        latest.current.onBegin?.();
      },
      // locationX jumps when the finger crosses a drawn segment, so moves are measured from where the pen landed.
      onPanResponderMove: (_, gesture) => {
        const next = addPoint(g.stroke, { x: g.x + gesture.dx * g.scale, y: g.y + gesture.dy * g.scale });
        if (next === g.stroke) return;
        g.stroke = next;
        setCurrent(next);
      },
      onPanResponderRelease: end,
      onPanResponderTerminate: end,
    })
  ).current;

  return {
    strokes,
    current,
    empty: isSignatureEmpty(strokes) && current.length === 0,
    panHandlers: responder.panHandlers as PanHandlers,
    clear: () => commit([]),
  };
};
