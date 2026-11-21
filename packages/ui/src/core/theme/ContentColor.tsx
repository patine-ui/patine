import { createContext, type ReactNode, useContext } from 'react';

const ContentColorContext = createContext<string | undefined>(undefined);

/**
 * The color of what's drawn on a filled surface, like CSS's `currentColor`: a Button sets its label color here, and an
 * `Icon` placed in it without a `color` takes it, so `<Button startIcon={<Icon name="save" />}>` matches every variant.
 */
export const ContentColor = ({ color, children }: { color: string | undefined; children: ReactNode }) => (
  <ContentColorContext.Provider value={color}>{children}</ContentColorContext.Provider>
);

/** The nearest `ContentColor`, or undefined outside one. */
export const useContentColor = () => useContext(ContentColorContext);
