import type { ViewStyle } from 'react-native';

import type { CollapsibleTriggerProps } from 'patine-ui';
import { Collapsible, CollapsibleContent, CollapsibleTrigger, Text } from 'patine-ui';

interface CollapsibleDemoProps extends Pick<CollapsibleTriggerProps, 'iconPosition' | 'rotation'> {
  disabled?: boolean;
  style?: ViewStyle;
}

/** The playground's controls go to the trigger (icon) and the root (disabled). */
export const CollapsibleDemo = ({ iconPosition, rotation, disabled, style }: CollapsibleDemoProps) => (
  <Collapsible disabled={disabled} style={style}>
    <CollapsibleTrigger iconPosition={iconPosition} rotation={rotation}>
      Advanced settings
    </CollapsibleTrigger>
    <CollapsibleContent>
      <Text color="textSecondary">Proxy off · Cache 512 MB · Log level: warnings</Text>
    </CollapsibleContent>
  </Collapsible>
);
