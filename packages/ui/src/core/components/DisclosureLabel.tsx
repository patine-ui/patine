import { ICON_POSITION } from '@/core/core.constants';
import { coreStyles } from '@/core/core.styles';
import type { DisclosureLabelProps } from '@/core/core.types';
import { DisclosureIcon } from './DisclosureIcon';
import { PickerText } from './PickerText';

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
      {typeof children === 'string' || typeof children === 'number' ? (
        <PickerText theme={theme} weight={look.labelWeight} style={[coreStyles.disclosureLabel, labelStyle]}>
          {children}
        </PickerText>
      ) : (
        children
      )}
      {iconPosition === ICON_POSITION.end ? icon : null}
    </>
  );
};
