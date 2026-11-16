import { List, ListItem, SwipeableRow, type SwipeableRowProps } from 'patine-ui';

type DemoProps = Pick<SwipeableRowProps, 'fullSwipe' | 'disabled' | 'design' | 'theme'>;

/** The SwipeableRow playground: a short inbox in a List. */
export const SwipeableDemo = (props: DemoProps) => (
  <List style={{ width: 340 }} design={props.design}>
    {['Flight confirmation', 'Your receipt'].map((subject) => (
      <SwipeableRow
        key={subject}
        {...props}
        leadingActions={[{ label: 'Pin', variant: 'primary', onPress: () => {} }]}
        trailingActions={[
          { label: 'Delete', variant: 'destructive', onPress: () => {} },
          { label: 'More', onPress: () => {} },
        ]}
      >
        <ListItem title={subject} description="Swipe me" />
      </SwipeableRow>
    ))}
  </List>
);
