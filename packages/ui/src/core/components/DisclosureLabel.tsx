import { ICON_POSITION } from '@/core/core.constants';
import type { DisclosureLabelProps } from '@/core/core.types';
import { Text } from '@/core/primitives/Text';
import { isTextContent } from '@/core/utils/text.utils';
import { styles } from './components.styles';
import { DisclosureIcon } from './DisclosureIcon';

/** A disclosure trigger's inside: the label, with its icon before or after it (or none), as the design or the options say. */
export const DisclosureLabel = ({ open, theme, look, options, children, labelStyle }: DisclosureLabelProps) => {
  const { iconPosition = look.iconPosition, ...iconOptions } = options;
  const icon =
    iconPosition === ICON_POSITION.none ? null : (
      <DisclosureIcon open={open} theme={theme} defaultRotation={look.rotation} {...iconOptions} />
    );
  return (
    <>
      {iconPosition === ICON_POSITION.start ? icon : null}
      {isTextContent(children) ? (
        <Text theme={theme} weight={look.labelWeight} style={[styles.disclosureLabel, labelStyle]}>
          {children}
        </Text>
      ) : (
        children
      )}
      {iconPosition === ICON_POSITION.end ? icon : null}
    </>
  );
};
