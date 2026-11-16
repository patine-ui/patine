import { useState } from 'react';
import { View } from 'react-native';

import { SortableHandle, SortableList, type SortableListProps, Text } from 'patine-ui';

import { styles } from '../catalog.styles';

type DemoProps = Pick<SortableListProps<string>, 'activation' | 'disabled' | 'design' | 'theme'>;

/** The SortableList playground: four rows it keeps in order itself. */
export const SortableDemo = (props: DemoProps) => {
  const [items, setItems] = useState(['Inbox', 'Today', 'Upcoming', 'Someday']);
  return (
    <SortableList
      {...props}
      data={items}
      onReorder={setItems}
      keyExtractor={(item) => item}
      getItemLabel={(item) => item}
      style={{ width: 320 }}
      renderItem={({ item }) => (
        <View style={styles.sortRow}>
          <Text style={styles.grow}>{item}</Text>
          <SortableHandle />
        </View>
      )}
    />
  );
};
