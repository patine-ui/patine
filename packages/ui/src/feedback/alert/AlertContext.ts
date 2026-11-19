import { createContext, useContext, useEffect } from 'react';
import type { TextStyle } from 'react-native';

interface AlertContextValue {
  /** The variant's title color, a style from the theme's sheet */
  titleStyle: TextStyle | undefined;
  /** Adds a line of the alert's text to what screen readers announce; returns its removal */
  register: (text: string) => () => void;
}

export const AlertContext = createContext<AlertContextValue | null>(null);

export const useAlertTitleStyle = () => useContext(AlertContext)?.titleStyle;

/** Adds a title's or description's text to the alert's announcement, when it's a string. */
export const useAlertText = (children: unknown) => {
  const register = useContext(AlertContext)?.register;
  useEffect(() => (register && typeof children === 'string' ? register(children) : undefined), [register, children]);
};
