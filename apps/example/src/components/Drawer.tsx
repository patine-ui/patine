import { Fragment } from 'react';
import { ScrollView } from 'react-native';

import { BASICS_LABEL, CATALOG_PAGES, COMPONENTS_LABEL } from '../example.constants';
import { styles } from '../example.styles';
import type { Route } from '../example.types';
import { initialOpenSections } from '../example.utils';
import { useCollapsible } from '../hooks/useCollapsible';
import { DrawerHeader } from './DrawerHeader';
import { DrawerItem } from './DrawerItem';

interface DrawerProps {
  route: Route;
  onSelect: (route: Route) => void;
  topInset: number;
}

/** The docs sidebar's free component pages, in its order and foldable groups. */
export const Drawer = ({ route, onSelect, topInset }: DrawerProps) => {
  const { isOpen, toggle } = useCollapsible(() => initialOpenSections(route, CATALOG_PAGES));
  return (
    <ScrollView contentContainerStyle={[styles.drawerContent, { paddingTop: topInset + 12 }]}>
      <DrawerItem label={BASICS_LABEL} level={0} selected={!!route.basics} onPress={() => onSelect({ basics: true })} />
      <DrawerHeader section label={COMPONENTS_LABEL} open={isOpen(COMPONENTS_LABEL)} onPress={() => toggle(COMPONENTS_LABEL)} />
      {isOpen(COMPONENTS_LABEL)
        ? CATALOG_PAGES.map(({ page, group, depth, startsGroup }) => (
            <Fragment key={page.doc}>
              {group && startsGroup ? <DrawerHeader label={group} open={isOpen(group)} onPress={() => toggle(group)} /> : null}
              {!group || isOpen(group) ? (
                <DrawerItem
                  label={page.label}
                  level={(group ? 1 : 0) + depth}
                  selected={route.page?.doc === page.doc}
                  onPress={() => onSelect({ page })}
                />
              ) : null}
            </Fragment>
          ))
        : null}
    </ScrollView>
  );
};
