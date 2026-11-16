import { Text } from 'react-native';

import {
  AvatarGroup,
  Badge,
  BottomTabBar,
  Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
  CheckboxGroup,
  CopyButton,
  DescriptionList,
  Fab,
  Grid,
  Kbd,
  Link,
  NumberField,
  Pagination,
  SearchField,
  Stat,
  Stepper,
  Table,
  ToggleButton,
  ToggleGroup,
} from 'patine-ui';

import type { PlaygroundConfig, PlaygroundKey } from './catalog.types';

const DESIGN = { prop: 'design', options: ['native', 'brand', 'ios', 'material', 'web'], unset: 'native' } as const;
const DISABLED = { prop: 'disabled', options: [false, true] } as const;

/** Playgrounds of the layout, primitive and newer components, merged into PLAYGROUNDS. */
export const EXTRA_PLAYGROUNDS = {
  box: {
    name: 'Box',
    component: Box,
    children: <Text>Free shipping on orders over $50</Text>,
    controls: [
      { prop: 'padding', options: ['lg', 'none', 'xs', 'sm', 'md', 'xl'], unset: 'none', default: null },
      { prop: 'background', options: ['surface', 'none', 'primaryMuted', 'background'], unset: 'none', default: null },
      { prop: 'radius', options: ['md', 'none', 'sm', 'lg', 'full'], unset: 'none', default: null },
      { prop: 'border', options: [false, true] },
      { prop: 'shadow', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'], unset: 'none' },
    ],
  },
  grid: {
    name: 'Grid',
    component: Grid,
    props: { style: { width: 360 } },
    children: [1, 2, 3, 4, 5, 6].map((n) => (
      <Box key={n} padding="md" background="primaryMuted" radius="md" align="center">
        <Text>{n}</Text>
      </Box>
    )),
    controls: [
      { prop: 'columns', options: [2, 1, 3, 4] },
      { prop: 'gap', options: ['md', 'xs', 'sm', 'lg', 'xl'] },
    ],
  },
  toggleButton: {
    name: 'ToggleButton',
    component: ToggleButton,
    children: 'Starred',
    props: { defaultPressed: true },
    code: 'defaultPressed',
    controls: [{ prop: 'variant', options: ['default', 'outline'] }, { prop: 'size', options: ['default', 'sm', 'lg'] }, DISABLED, DESIGN],
  },
  toggleGroup: {
    name: 'ToggleGroup',
    component: ToggleGroup,
    props: {
      type: 'single',
      'aria-label': 'Alignment',
      items: [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' },
      ],
    },
    value: 'center',
    code: 'type="single" items={alignments} value={align} onValueChange={setAlign}',
    controls: [
      { prop: 'variant', options: ['default', 'outline'] },
      { prop: 'size', options: ['default', 'sm', 'lg'] },
      { prop: 'attached', options: [false, true] },
      { prop: 'orientation', options: ['horizontal', 'vertical'] },
      DISABLED,
      DESIGN,
    ],
  },
  buttonGroup: {
    name: 'ButtonGroup',
    component: ButtonGroup,
    props: { 'aria-label': 'Pages' },
    code: 'aria-label="Pages"',
    children: [<Button key="prev">‹ Prev</Button>, <Button key="today">Today</Button>, <Button key="next">Next ›</Button>],
    controls: [
      { prop: 'variant', options: ['outline', 'default', 'secondary', 'ghost'], default: null },
      { prop: 'size', options: ['default', 'sm', 'lg'], default: null },
      { prop: 'orientation', options: ['horizontal', 'vertical'] },
      DESIGN,
    ],
  },
  numberField: {
    name: 'NumberField',
    component: NumberField,
    props: { label: 'Quantity', style: { width: 280 } },
    value: 1,
    code: 'label="Quantity" value={quantity} onValueChange={setQuantity}',
    controls: [
      { prop: 'min', options: ['none', 0, 1], unset: 'none', default: null, initial: 0 },
      { prop: 'max', options: ['none', 10, 99], unset: 'none', default: null, initial: 10 },
      { prop: 'step', options: [1, 0.5, 5] },
      { prop: 'hideButtons', options: [false, true] },
      DISABLED,
      DESIGN,
    ],
  },
  stepper: {
    name: 'Stepper',
    component: Stepper,
    props: { accessibilityLabel: 'Guests', min: 0, max: 10 },
    value: 2,
    code: 'accessibilityLabel="Guests" min={0} max={10} value={guests} onValueChange={setGuests}',
    controls: [
      { prop: 'showValue', options: ['auto', true, false], unset: 'auto' },
      { prop: 'step', options: [1, 2, 5] },
      DISABLED,
      DESIGN,
    ],
  },
  searchField: {
    name: 'SearchField',
    component: SearchField,
    props: { style: { width: 340 } },
    value: '',
    code: 'value={query} onValueChange={setQuery}',
    controls: [
      { prop: 'placeholder', options: ['Search', 'Search contacts'] },
      { prop: 'onCancel', options: ['none', 'set'], unset: 'none', values: { set: { live: () => {}, code: 'closeSearch' } } },
      DISABLED,
      DESIGN,
    ],
  },
  checkboxGroup: {
    name: 'CheckboxGroup',
    component: CheckboxGroup,
    props: {
      'aria-label': 'Toppings',
      options: [
        { value: 'cheese', label: 'Extra cheese' },
        { value: 'olives', label: 'Olives' },
        { value: 'basil', label: 'Fresh basil' },
        { value: 'chili', label: 'Chili flakes' },
      ],
    },
    value: ['cheese', 'basil'],
    code: 'options={toppings} value={toppings} onValueChange={setToppings}',
    controls: [
      { prop: 'selectAllLabel', options: ['none', 'All toppings'], unset: 'none', default: null },
      { prop: 'orientation', options: ['vertical', 'horizontal'] },
      { prop: 'controlAtEnd', options: [false, true] },
      DISABLED,
      DESIGN,
    ],
  },
  breadcrumbs: {
    name: 'Breadcrumbs',
    component: Breadcrumbs,
    props: {
      items: [
        { label: 'Home', onPress: () => {} },
        { label: 'Projects', onPress: () => {} },
        { label: 'Patine', onPress: () => {} },
        { label: 'Settings', onPress: () => {} },
        { label: 'Billing' },
      ],
    },
    code: 'items={path}',
    controls: [{ prop: 'maxItems', options: ['none', 3, 4], unset: 'none', default: null }, DESIGN],
  },
  pagination: {
    name: 'Pagination',
    component: Pagination,
    props: { pageCount: 20 },
    value: 6,
    changeProp: 'onPageChange',
    code: 'pageCount={20} page={page} onPageChange={setPage}',
    controls: [
      { prop: 'variant', options: ['numbers', 'compact'] },
      { prop: 'siblingCount', options: [1, 0, 2] },
      { prop: 'iconOnly', options: [false, true] },
      DISABLED,
      DESIGN,
    ],
  },
  bottomTabBar: {
    name: 'BottomTabBar',
    component: BottomTabBar,
    props: {
      style: { width: 360 },
      items: [
        { value: 'home', label: 'Home', icon: <Text style={{ fontSize: 20 }}>🏠</Text> },
        { value: 'search', label: 'Search', icon: <Text style={{ fontSize: 20 }}>🔍</Text> },
        { value: 'inbox', label: 'Inbox', badge: 3, icon: <Text style={{ fontSize: 20 }}>📥</Text> },
        { value: 'profile', label: 'Profile', badge: true, icon: <Text style={{ fontSize: 20 }}>👤</Text> },
      ],
    },
    value: 'home',
    code: 'items={tabs} value={tab} onValueChange={setTab}',
    controls: [{ prop: 'bottomInset', options: [0, 34] }, DESIGN],
  },
  kbd: {
    name: 'Kbd',
    component: Kbd,
    props: { keys: ['⌘', 'K'] },
    code: "keys={['⌘', 'K']}",
    controls: [{ prop: 'size', options: ['md', 'sm'] }, { prop: 'separator', options: ['none', '+'], unset: 'none' }, DESIGN],
  },
  stat: {
    name: 'Stat',
    component: Stat,
    props: { label: 'Revenue', value: '$48,210', description: 'vs last month' },
    code: 'label="Revenue" value="$48,210" description="vs last month"',
    controls: [
      { prop: 'change', options: ['+12.5%', '-3.2%', '0%', 'none'], unset: 'none', default: null },
      { prop: 'invertTrend', options: [false, true] },
      DESIGN,
    ],
  },
  descriptionList: {
    name: 'DescriptionList',
    component: DescriptionList,
    props: {
      style: { width: 360 },
      items: [
        { term: 'Model', details: 'iPhone 17 Pro' },
        { term: 'Storage', details: '256 GB' },
        { term: 'Status', details: <Badge variant="success">Active</Badge> },
        { term: 'Serial number', details: 'F2LZK0X9N7' },
      ],
    },
    code: 'items={details}',
    controls: [
      { prop: 'orientation', options: ['auto', 'horizontal', 'vertical'], unset: 'auto' },
      { prop: 'dividers', options: [true, false] },
      DESIGN,
    ],
  },
  table: {
    name: 'Table',
    component: Table,
    props: {
      style: { width: 440 },
      columns: [
        { key: 'name', title: 'Name', flex: 2, sortable: true },
        { key: 'role', title: 'Role', flex: 2 },
        { key: 'tasks', title: 'Tasks', align: 'right', sortable: true },
      ],
      data: [
        { id: '1', name: 'Maya Cohen', role: 'Designer', tasks: 12 },
        { id: '2', name: 'Daniel Okafor', role: 'Engineer', tasks: 31 },
        { id: '3', name: 'Ana Pérez', role: 'PM', tasks: 7 },
        { id: '4', name: 'Noah Kim', role: 'Engineer', tasks: 18 },
      ],
    },
    code: 'columns={columns} data={people}',
    controls: [{ prop: 'striped', options: [false, true] }, DESIGN],
  },
  avatarGroup: {
    name: 'AvatarGroup',
    component: AvatarGroup,
    props: {
      avatars: ['Maya Cohen', 'Daniel Okafor', 'Ana Pérez', 'Noah Kim', 'Priya Raman', 'Sven Larsen'].map((name) => ({ name })),
    },
    code: 'avatars={members}',
    controls: [
      { prop: 'max', options: [4, 'none', 3, 6], unset: 'none', default: null },
      { prop: 'size', options: ['md', 'sm', 'lg'] },
      { prop: 'shape', options: ['circle', 'square'] },
    ],
  },
  link: {
    name: 'Link',
    component: Link,
    children: 'Read the docs',
    props: { href: 'https://patine.dev' },
    code: 'href="https://patine.dev"',
    controls: [
      { prop: 'underline', options: ['auto', 'always', 'hover', 'none'], unset: 'auto' },
      { prop: 'external', options: [false, true] },
      DISABLED,
      DESIGN,
    ],
  },
  fab: {
    name: 'Fab',
    component: Fab,
    props: { icon: <Text style={{ fontSize: 22 }}>✎</Text>, accessibilityLabel: 'Compose' },
    code: 'icon={<PencilIcon />} accessibilityLabel="Compose"',
    controls: [
      { prop: 'label', options: ['none', 'Compose'], unset: 'none', default: null },
      { prop: 'size', options: ['md', 'sm', 'lg'] },
      DISABLED,
      DESIGN,
    ],
  },
  copyButton: {
    name: 'CopyButton',
    component: CopyButton,
    props: { value: 'npm i patine-ui' },
    code: 'value="npm i patine-ui"',
    controls: [
      { prop: 'label', options: ['none', 'Copy command'], unset: 'none', default: null },
      { prop: 'variant', options: ['ghost', 'outline', 'secondary', 'default'] },
      DESIGN,
    ],
  },
} satisfies Partial<Record<PlaygroundKey, PlaygroundConfig>>;
