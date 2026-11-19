import { type ModalProps, Modal as RNModal, type ViewProps } from 'react-native';

import { IS_WEB } from '@/core/core.constants';
import { useDirection } from '@/core/theme/ThemeProvider';
import { styles } from '@/core/theme/theme.styles';
import { View } from './View';

/**
 * React Native's Modal, in the provider's direction on the web too: it draws in a portal on <body>, outside the provider's
 * `dir`, so without this an app that sets `dir` only on PatineProvider would lay its overlays out left to right.
 */
export const Modal = ({ children, ...rest }: ModalProps) => {
  const dir = useDirection();
  return (
    <RNModal {...rest}>
      {IS_WEB ? (
        // `dir` is a React Native Web prop, missing from React Native's types.
        <View {...({ dir } as ViewProps)} style={styles.contents}>
          {children}
        </View>
      ) : (
        children
      )}
    </RNModal>
  );
};
