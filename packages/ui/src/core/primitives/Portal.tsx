import { createContext, type ReactNode, useContext, useEffect, useId, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

interface PortalContextValue {
  mount: (key: string, node: ReactNode) => void;
  unmount: (key: string) => void;
}

const PortalContext = createContext<PortalContextValue | null>(null);

export interface PortalHostProps {
  /** The app, or the part of it portals should cover */
  children?: ReactNode;
}

export interface PortalProps {
  /** Drawn on top of everything inside the nearest PortalHost */
  children?: ReactNode;
}

/**
 * Where portals draw: wrap the app in it once, under PatineProvider. Its portals sit over the app in the order they
 * mounted, above every sibling, without a native Modal.
 */
export const PortalHost = ({ children }: PortalHostProps) => {
  const [nodes, setNodes] = useState<ReadonlyArray<[string, ReactNode]>>([]);
  const value = useMemo<PortalContextValue>(
    () => ({
      mount: (key, node) =>
        setNodes((prev) => (prev.some(([k]) => k === key) ? prev.map((e) => (e[0] === key ? [key, node] : e)) : [...prev, [key, node]])),
      unmount: (key) => setNodes((prev) => prev.filter(([k]) => k !== key)),
    }),
    []
  );
  return (
    <PortalContext.Provider value={value}>
      {children}
      {nodes.length > 0 ? (
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
          {nodes.map(([key, node]) => (
            <View key={key} style={StyleSheet.absoluteFill} pointerEvents="box-none">
              {node}
            </View>
          ))}
        </View>
      ) : null}
    </PortalContext.Provider>
  );
};

/** Draws its children in the nearest PortalHost, over the rest of the app. Without a host, it draws them where it is. */
export const Portal = ({ children }: PortalProps) => {
  const host = useContext(PortalContext);
  const key = useId();
  useEffect(() => {
    host?.mount(key, children);
  }, [host, key, children]);
  useEffect(() => () => host?.unmount(key), [host, key]);
  return host ? null : children;
};
