import { CONTROL_POSITION } from '@/core/core.constants';
import type { ControlPosition } from '@/core/core.types';

/** Whether a choice's control goes after its label: `controlPosition`, else the deprecated boolean, else the component's default. */
export const isControlAtEnd = (position: ControlPosition | undefined, legacy: ControlPosition | undefined, fallback: ControlPosition) =>
  (position ?? legacy ?? fallback) === CONTROL_POSITION.end;
