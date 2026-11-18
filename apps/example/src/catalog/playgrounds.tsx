import { Text, View } from 'react-native';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  ActionSheet,
  Alert,
  AlertDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertTitle,
  Avatar,
  Badge,
  BottomSheet,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Carousel,
  Checkbox,
  ChipGroup,
  ColorPicker,
  ColorPickerField,
  CountryPicker,
  DatePicker,
  DatePickerField,
  DatePickerSheet,
  DateTimePicker,
  DateTimePickerField,
  DateWheelPicker,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DurationPicker,
  DurationPickerField,
  EmojiPicker,
  EmojiPickerField,
  EmptyState,
  ExpandableCalendar,
  Header,
  InputOTP,
  LanguagePicker,
  List,
  ListItem,
  MessageBubble,
  ModalBody,
  ModalClose,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  MonthPicker,
  MonthPickerField,
  MultiWheelPicker,
  PhoneField,
  Progress,
  QRCode,
  RadioGroup,
  RadioGroupItem,
  Rating,
  SegmentedControl,
  Select,
  SelectList,
  Separator,
  SignaturePad,
  Skeleton,
  Slider,
  Stack,
  Steps,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TextArea,
  TextField,
  TimePicker,
  TimePickerField,
  TimeRangePicker,
  TimeRangePickerField,
  TimeZonePicker,
  Tooltip,
  Text as UIText,
  WeekStrip,
  WheelPicker,
  WheelPickerField,
} from 'patine-ui';

import { styles } from './catalog.styles';
import type { PlaygroundConfig, PlaygroundKey, PlaygroundSelection } from './catalog.types';
import { CollapsibleDemo } from './components/CollapsibleDemo';
import { AlertDialogDemo, DialogDemo, ModalDemo } from './components/DialogDemo';
import { DropdownMenuTrigger } from './components/DropdownMenuTrigger';
import { ImageViewerDemo } from './components/ImageViewerDemo';
import { PopoverDemo } from './components/PopoverDemo';
import { SortableDemo } from './components/SortableDemo';
import { SwipeableDemo } from './components/SwipeableDemo';
import { ToastDemo } from './components/ToastDemo';
import { EXTRA_PLAYGROUNDS } from './extraPlaygrounds';

const PRESENTATION = { prop: 'presentation', options: ['auto', 'dropdown', 'bottomSheet', 'modal', 'inline'] } as const;
const CLEARABLE = { prop: 'clearable', options: [false, true] } as const;
const REQUIRED = { prop: 'required', options: [false, true] } as const;
const ERROR = { prop: 'error', options: ['none', 'This field is required'], unset: 'none' } as const;
/** The look, over the platform's own: 'native' leaves it to the iOS / Android / Web switch. */
const DESIGN = { prop: 'design', options: ['native', 'brand', 'ios', 'material', 'web'], unset: 'native' } as const;
const DISABLED = { prop: 'disabled', options: [false, true] } as const;
/** An icon for a node-valued prop, shown as `code` in the generated code. */
const icon = (glyph: string, code: string) => ({
  live: <Text>{glyph}</Text>,
  code,
});
const PHOTO = 'https://picsum.photos/id/64/160/160';

const SLIDE_COLORS = ['#6366F1', '#0EA5E9', '#10B981', '#F59E0B'];

const toOptions = (labels: string[]) =>
  labels.map((label) => ({
    label,
    value: label,
  }));
const twoDigits = (length: number) =>
  Array.from({ length }, (_, i) => ({
    label: String(i).padStart(2, '0'),
    value: i,
  }));

const dateValue = ({ mode }: PlaygroundSelection) =>
  mode === 'range' ? { start: null, end: null } : mode === 'multiple' || mode === 'ranges' ? [] : null;

/** The prop playgrounds of every component page; the docs and the example app render the same ones. */
export const PLAYGROUNDS: Record<PlaygroundKey, PlaygroundConfig> = {
  ...EXTRA_PLAYGROUNDS,
  text: {
    name: 'Text',
    component: UIText,
    children: 'The quick brown fox jumps over the lazy dog.',
    controls: [
      { prop: 'size', options: ['md', 'xs', 'sm', 'lg', 'xl', '2xl', '3xl'] },
      { prop: 'weight', options: ['regular', 'medium', 'bold'] },
      { prop: 'color', options: ['text', 'textSecondary', 'primary', 'danger'] },
    ],
  },
  stack: {
    name: 'Stack',
    component: Stack,
    children: [1, 2, 3].map((n) => <Skeleton key={n} width={64} height={64} radius="md" />),
    controls: [
      { prop: 'direction', options: ['column', 'row'] },
      { prop: 'gap', options: ['md', 'xs', 'sm', 'lg', 'xl'], default: null },
      { prop: 'align', options: ['stretch', 'flex-start', 'center', 'flex-end'], unset: 'stretch' },
    ],
  },
  separator: {
    name: 'Separator',
    component: Separator,
    props: { style: { alignSelf: 'stretch', minHeight: 1, minWidth: 1 } },
    controls: [{ prop: 'orientation', options: ['horizontal', 'vertical'] }],
  },
  button: {
    name: 'Button',
    component: Button,
    children: 'Save changes',
    controls: [
      { prop: 'variant', options: ['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'] },
      { prop: 'size', options: ['default', 'sm', 'lg'] },
      {
        prop: 'startIcon',
        options: ['none', 'save', 'mail'],
        unset: 'none',
        values: { save: icon('💾', '<SaveIcon />'), mail: icon('✉️', '<MailIcon />') },
      },
      { prop: 'endIcon', options: ['none', 'next'], unset: 'none', values: { next: icon('➡️', '<ArrowRightIcon />') } },
      { prop: 'loading', options: [false, true] },
      DISABLED,
      DESIGN,
    ],
  },
  checkbox: {
    name: 'Checkbox',
    component: Checkbox,
    props: { label: 'Email me about new releases' },
    code: 'label="Email me about new releases"',
    controls: [
      {
        prop: 'description',
        options: ['none', 'About once a month. Unsubscribe anytime.'],
        unset: 'none',
        initial: 'About once a month. Unsubscribe anytime.',
      },
      { prop: 'checked', options: ['uncontrolled', true, false, 'mixed'], unset: 'uncontrolled' },
      { prop: 'defaultChecked', options: [false, true] },
      { prop: 'controlPosition', options: ['start', 'end'] },
      DISABLED,
      DESIGN,
    ],
  },
  switch: {
    name: 'Switch',
    component: Switch,
    props: { label: 'Push notifications' },
    code: 'label="Push notifications"',
    controls: [
      {
        prop: 'description',
        options: ['none', 'Replies, mentions and new followers'],
        unset: 'none',
        initial: 'Replies, mentions and new followers',
      },
      { prop: 'defaultChecked', options: [false, true], initial: true },
      { prop: 'controlPosition', options: ['end', 'start'] },
      DISABLED,
      DESIGN,
    ],
  },
  radioGroup: {
    name: 'RadioGroup',
    component: RadioGroup,
    props: { defaultValue: 'express', 'aria-label': 'Delivery' },
    code: 'defaultValue="express" aria-label="Delivery"',
    children: [
      <RadioGroupItem key="standard" value="standard" label="Standard" description="4–6 working days · Free" />,
      <RadioGroupItem key="express" value="express" label="Express" description="1–2 working days · $9.90" />,
      <RadioGroupItem key="pickup" value="pickup" label="Store pickup" description="Ready tomorrow · Free" />,
      <RadioGroupItem key="drone" value="drone" label="Drone" description="Not available in your area" disabled />,
    ],
    controls: [{ prop: 'orientation', options: ['vertical', 'horizontal'] }, DISABLED, DESIGN],
  },
  card: {
    name: 'Card',
    component: Card,
    props: { style: { width: 320 } },
    children: [
      <CardHeader key="header">
        <CardTitle>Pro plan</CardTitle>
        <CardDescription>Charts, scheduler and data grid.</CardDescription>
      </CardHeader>,
      <CardContent key="content">
        <UIText size="2xl" weight="bold">
          $199
        </UIText>
        <UIText color="textSecondary">One-time payment, a year of updates</UIText>
      </CardContent>,
      <CardFooter key="footer">
        <Button>Upgrade</Button>
        <Button variant="ghost">Compare</Button>
      </CardFooter>,
    ],
    controls: [
      { prop: 'shadow', options: ['auto', 'none', 'xs', 'sm', 'md', 'lg', 'xl'], unset: 'auto' },
      { prop: 'onPress', options: ['none', 'set'], unset: 'none', values: { set: { live: () => {}, code: 'openPlan' } } },
      { prop: 'interactive', options: ['auto', true, false], unset: 'auto' },
      DISABLED,
      DESIGN,
    ],
  },
  avatar: {
    name: 'Avatar',
    component: Avatar,
    controls: [
      { prop: 'name', options: ['Maya Cohen', 'Daniel', 'Ana Lucía Pérez'], default: null },
      {
        prop: 'src',
        options: ['none', 'photo', 'broken'],
        unset: 'none',
        values: {
          photo: { live: PHOTO, code: 'user.photoUrl' },
          broken: { live: 'https://invalid.example/404.png', code: "'https://invalid.example/404.png'" },
        },
      },
      { prop: 'size', options: ['md', 'sm', 'lg', 72] },
      { prop: 'shape', options: ['circle', 'square'] },
      DESIGN,
    ],
  },
  badge: {
    name: 'Badge',
    component: Badge,
    children: 'In stock',
    controls: [{ prop: 'variant', options: ['default', 'secondary', 'outline', 'success', 'warning', 'destructive'] }, DESIGN],
  },
  alert: {
    name: 'Alert',
    component: Alert,
    props: { style: { width: 360 } },
    children: [
      <AlertTitle key="title">Payment failed</AlertTitle>,
      <AlertDescription key="description">Your card was declined. Update it to keep your Pro plan.</AlertDescription>,
    ],
    controls: [
      { prop: 'variant', options: ['default', 'destructive', 'success', 'warning'] },
      {
        prop: 'icon',
        options: ['none', 'card', 'info'],
        unset: 'none',
        values: { card: icon('💳', '<CreditCardIcon />'), info: icon('ℹ️', '<InfoIcon />') },
      },
      { prop: 'live', options: ['auto', true, false], unset: 'auto' },
      DESIGN,
    ],
  },
  list: {
    name: 'List',
    component: List,
    props: { style: { width: 360 } },
    children: [
      <ListItem
        key="notifications"
        title="Notifications"
        leading={<Text>🔔</Text>}
        trailing={<Switch accessibilityLabel="Notifications" defaultChecked />}
      />,
      <ListItem key="language" title="Language" leading={<Text>🌐</Text>} value="English" onPress={() => {}} />,
      <ListItem key="storage" title="Storage" description="2.4 GB of 5 GB used" leading={<Text>💾</Text>} onPress={() => {}} />,
      <ListItem key="beta" title="Beta features" leading={<Text>🧪</Text>} trailing={<Badge variant="secondary">New</Badge>} />,
      <ListItem key="sign-out" title="Sign out" destructive showChevron={false} onPress={() => {}} />,
    ],
    controls: [
      { prop: 'title', options: ['General', 'none'], unset: 'none', default: null },
      {
        prop: 'footer',
        options: ['none', 'Changes apply on every device.'],
        unset: 'none',
        initial: 'Changes apply on every device.',
        default: null,
      },
      DESIGN,
    ],
  },
  header: {
    name: 'Header',
    component: Header,
    props: { style: { width: 360 } },
    controls: [
      { prop: 'title', options: ['Settings', 'Maya Cohen'], default: null },
      { prop: 'subtitle', options: ['none', 'Last seen 5 min ago'], unset: 'none' },
      { prop: 'onBack', options: ['set', 'none'], unset: 'none', default: null, values: { set: { live: () => {}, code: 'goBack' } } },
      { prop: 'backLabel', options: ['Back', 'Inbox'] },
      {
        prop: 'actions',
        options: ['none', 'edit'],
        unset: 'none',
        values: {
          edit: {
            live: (
              <Button size="sm" variant="ghost">
                Edit
              </Button>
            ),
            code: '<Button size="sm" variant="ghost">Edit</Button>',
          },
        },
      },
      { prop: 'size', options: ['default', 'large'] },
      DESIGN,
    ],
  },
  progress: {
    name: 'Progress',
    component: Progress,
    props: { accessibilityLabel: 'Upload', style: { width: 280 } },
    code: 'accessibilityLabel="Upload"',
    controls: [
      { prop: 'value', options: ['indeterminate', 0, 25, 60, 100], unset: 'indeterminate', default: null, initial: 60 },
      { prop: 'max', options: [100, 200], default: 100 },
      { prop: 'height', options: ['auto', 4, 8, 12], unset: 'auto' },
      DESIGN,
    ],
  },
  emptyState: {
    name: 'EmptyState',
    component: EmptyState,
    props: { style: { width: 360 } },
    controls: [
      { prop: 'title', options: ['No messages yet', 'No results for “bluetooth”'], default: null },
      { prop: 'description', options: ['When someone writes to you, it shows up here.', 'none'], unset: 'none', default: null },
      {
        prop: 'icon',
        options: ['inbox', 'search', 'none'],
        unset: 'none',
        default: null,
        values: { inbox: { live: '📭', code: '"📭"' }, search: { live: '🔍', code: '"🔍"' } },
      },
      {
        prop: 'action',
        options: ['one', 'two', 'none'],
        unset: 'none',
        default: null,
        values: {
          one: { live: <Button>New message</Button>, code: '<Button>New message</Button>' },
          two: {
            live: (
              <>
                <Button>Clear filters</Button>
                <Button variant="ghost">Browse all</Button>
              </>
            ),
            code: '<><Button>Clear filters</Button><Button variant="ghost">Browse all</Button></>',
          },
        },
      },
      DESIGN,
    ],
  },
  messageBubble: {
    name: 'MessageBubble',
    component: MessageBubble,
    props: { meta: '9:41', style: { width: 320 } },
    code: 'meta="9:41"',
    children: 'See you at 7 by the river?',
    controls: [{ prop: 'from', options: ['them', 'me'] }],
  },
  skeleton: {
    name: 'Skeleton',
    component: Skeleton,
    controls: [
      { prop: 'width', options: [240, 120, 48, '100%'], default: null },
      { prop: 'height', options: [16, 40, 48, 120], default: 16 },
      { prop: 'radius', options: ['sm', 'md', 'lg', 'full', 0] },
    ],
  },
  datePicker: {
    name: 'DatePicker',
    component: DatePicker,
    value: dateValue,
    code: 'value={value} onValueChange={setValue}',
    controls: [
      { prop: 'display', options: ['calendar', 'wheel'] },
      { prop: 'mode', options: ['single', 'range', 'multiple'] },
      { prop: 'weekdayFormat', options: ['auto', 'short', 'narrow'], unset: 'auto' },
      { prop: 'firstDayOfWeek', options: [0, 1, 6], default: null, initial: 0 },
      { prop: 'showOutsideDays', options: [true, false] },
      { prop: 'fixedWeeks', options: [true, false] },
      { prop: 'showWeekdays', options: [true, false] },
      { prop: 'enableQuickJump', options: [true, false] },
    ],
  },
  datePickerField: {
    name: 'DatePickerField',
    component: DatePickerField,
    changeProp: 'onConfirm',
    resetProp: 'onClear',
    props: { label: 'Due date', placeholder: 'Pick a date' },
    value: null,
    code: 'label="Due date" placeholder="Pick a date" value={date} onConfirm={setDate}',
    controls: [
      PRESENTATION,
      { prop: 'display', options: ['calendar', 'wheel'] },
      { prop: 'confirmOnSelect', options: [false, true] },
      CLEARABLE,
    ],
  },
  dateRange: {
    name: 'DatePicker',
    component: DatePicker,
    value: dateValue,
    code: 'value={value} onValueChange={setValue}',
    controls: [
      { prop: 'mode', options: ['single', 'range', 'multiple', 'ranges'], initial: 'range' },
      { prop: 'allowSingleDayRange', options: [true, false] },
      { prop: 'maxRangeDays', options: [7, 14, 30], default: null, initial: 14 },
      { prop: 'maxSelections', options: [3, 5, 10], default: null, initial: 5 },
      { prop: 'maxRanges', options: [2, 3, 5], default: null, initial: 3 },
    ],
  },
  dateRangeField: {
    name: 'DatePickerField',
    component: DatePickerField,
    changeProp: 'onConfirm',
    resetProp: 'onClear',
    props: { label: 'Your stay', placeholder: 'Add dates' },
    value: dateValue,
    code: 'label="Your stay" placeholder="Add dates" value={stay} onConfirm={setStay}',
    controls: [PRESENTATION, { prop: 'mode', options: ['range', 'multiple', 'ranges'], default: null }, CLEARABLE],
  },
  dateWheelPicker: {
    platforms: false,
    name: 'DateWheelPicker',
    component: DateWheelPicker,
    value: new Date(1990, 4, 17),
    code: 'value={date} onValueChange={setDate}',
    controls: [
      {
        prop: 'order',
        options: [
          ['day', 'month', 'year'],
          ['month', 'day', 'year'],
          ['year', 'month', 'day'],
        ],
        default: null,
      },
      { prop: 'monthFormat', options: ['long', 'short', 'numeric'] },
      { prop: 'loop', options: [true, false] },
      { prop: 'variant', options: ['3d', 'flat'] },
    ],
  },
  birthdayField: {
    name: 'DatePickerField',
    component: DatePickerField,
    changeProp: 'onConfirm',
    resetProp: 'onClear',
    props: { label: 'Birthday', placeholder: 'Pick a date', display: 'wheel' },
    value: null,
    code: 'label="Birthday" placeholder="Pick a date" display="wheel" value={date} onConfirm={setDate}',
    controls: [PRESENTATION, CLEARABLE],
  },
  monthPicker: {
    name: 'MonthPicker',
    component: MonthPicker,
    value: new Date(2026, 9, 1),
    code: 'value={month} onValueChange={setMonth}',
    controls: [
      { prop: 'display', options: ['auto', 'wheel', 'grid'], unset: 'auto' },
      { prop: 'monthFormat', options: ['long', 'short', 'numeric'] },
      { prop: 'locale', options: ['en-US', 'de-DE', 'ja-JP'], default: null },
      { prop: 'loop', options: [true, false] },
    ],
  },
  monthPickerField: {
    name: 'MonthPickerField',
    component: MonthPickerField,
    changeProp: 'onConfirm',
    resetProp: 'onClear',
    props: { label: 'Report month', placeholder: 'Pick a month' },
    value: () => undefined,
    code: 'label="Report month" placeholder="Pick a month" value={month} onConfirm={setMonth}',
    controls: [PRESENTATION, { prop: 'display', options: ['auto', 'wheel', 'grid'], unset: 'auto' }, CLEARABLE],
  },
  weekStrip: {
    name: 'WeekStrip',
    component: WeekStrip,
    value: new Date(2026, 9, 28),
    code: 'value={day} onValueChange={setDay}',
    controls: [
      { prop: 'firstDayOfWeek', options: [0, 1, 6], default: null },
      { prop: 'weekdayFormat', options: ['short', 'narrow'], default: null },
      { prop: 'showHeader', options: [true, false] },
      { prop: 'showWeekdays', options: [true, false] },
      { prop: 'enableSwipe', options: [true, false] },
    ],
  },
  expandableCalendar: {
    name: 'ExpandableCalendar',
    component: ExpandableCalendar,
    value: new Date(2026, 9, 14),
    code: 'value={day} onValueChange={setDay}',
    controls: [
      { prop: 'defaultExpanded', options: [false, true] },
      { prop: 'firstDayOfWeek', options: [0, 1, 6], default: null },
      { prop: 'weekdayFormat', options: ['short', 'narrow'], default: null },
      { prop: 'showHeader', options: [true, false] },
      { prop: 'enableSwipe', options: [true, false] },
    ],
  },
  timePicker: {
    name: 'TimePicker',
    component: TimePicker,
    value: new Date(2026, 9, 26, 9, 41, 0),
    code: 'value={time} onValueChange={setTime}',
    controls: [
      { prop: 'display', options: ['auto', 'wheel', 'dial', 'input', 'list'], unset: 'auto' },
      { prop: 'format', options: ['auto', '12h', '24h'] },
      { prop: 'showSeconds', options: [false, true] },
      { prop: 'minuteInterval', options: [1, 5, 15, 30] },
      { prop: 'dayPeriodFirst', options: [false, true] },
      { prop: 'loop', options: [true, false] },
      { prop: 'variant', options: ['3d', 'flat'] },
    ],
  },
  timePickerField: {
    name: 'TimePickerField',
    component: TimePickerField,
    changeProp: 'onConfirm',
    resetProp: 'onClear',
    props: { label: 'Alarm', placeholder: 'Set a time' },
    value: () => undefined,
    code: 'label="Alarm" placeholder="Set a time" value={time} onConfirm={setTime}',
    controls: [
      PRESENTATION,
      { prop: 'display', options: ['auto', 'wheel', 'dial', 'input', 'list'], unset: 'auto' },
      { prop: 'format', options: ['auto', '12h', '24h'] },
      CLEARABLE,
    ],
  },
  timeRange: {
    name: 'TimeRangePicker',
    component: TimeRangePicker,
    value: { start: new Date(2026, 9, 26, 9, 0), end: new Date(2026, 9, 26, 17, 0) },
    code: 'value={hours} onValueChange={setHours}',
    controls: [
      { prop: 'display', options: ['auto', 'wheel', 'dial', 'input', 'list'], unset: 'auto' },
      { prop: 'format', options: ['auto', '12h', '24h'] },
      { prop: 'minuteInterval', options: [1, 5, 15, 30], initial: 15 },
      { prop: 'minDuration', options: [30, 60, 120], default: null, initial: 60 },
      { prop: 'allowOvernight', options: [true, false] },
    ],
  },
  timeRangeField: {
    name: 'TimeRangePickerField',
    component: TimeRangePickerField,
    changeProp: 'onConfirm',
    resetProp: 'onClear',
    props: { label: 'Opening hours', placeholder: 'Set hours', minuteInterval: 15 },
    value: () => undefined,
    code: 'label="Opening hours" placeholder="Set hours" minuteInterval={15} value={hours} onConfirm={setHours}',
    controls: [
      PRESENTATION,
      { prop: 'display', options: ['auto', 'wheel', 'dial', 'input', 'list'], unset: 'auto' },
      { prop: 'format', options: ['auto', '12h', '24h'] },
      CLEARABLE,
    ],
  },
  durationPicker: {
    name: 'DurationPicker',
    component: DurationPicker,
    value: 5400,
    code: 'value={seconds} onValueChange={setSeconds}',
    controls: [
      { prop: 'display', options: ['auto', 'wheel', 'input', 'list'], unset: 'auto' },
      { prop: 'showHours', options: [true, false] },
      { prop: 'showSeconds', options: [false, true] },
      { prop: 'minuteInterval', options: [1, 5, 15], default: 1 },
      { prop: 'loop', options: [true, false] },
      { prop: 'variant', options: ['3d', 'flat'] },
    ],
  },
  durationPickerField: {
    name: 'DurationPickerField',
    component: DurationPickerField,
    changeProp: 'onConfirm',
    resetProp: 'onClear',
    props: { label: 'Timer', placeholder: 'Set a timer', minuteInterval: 5 },
    value: () => undefined,
    code: 'label="Timer" placeholder="Set a timer" minuteInterval={5} value={seconds} onConfirm={setSeconds}',
    controls: [PRESENTATION, { prop: 'showSeconds', options: [false, true] }, CLEARABLE],
  },
  dateTimePicker: {
    wide: true,
    name: 'DateTimePicker',
    component: DateTimePicker,
    value: new Date(2026, 9, 26, 9, 41, 0),
    code: 'value={date} onValueChange={setDate}',
    controls: [
      { prop: 'display', options: ['auto', 'wheel', 'calendar'], unset: 'auto' },
      { prop: 'timePosition', options: ['auto', 'beside', 'below'], unset: 'auto' },
      { prop: 'timeDisplay', options: ['auto', 'wheel', 'dial', 'input', 'list'], unset: 'auto' },
      { prop: 'format', options: ['auto', '12h', '24h'] },
      { prop: 'minuteInterval', options: [1, 5, 15, 30] },
      { prop: 'showSeconds', options: [false, true] },
      { prop: 'variant', options: ['3d', 'flat'] },
    ],
  },
  dateTimePickerField: {
    name: 'DateTimePickerField',
    component: DateTimePickerField,
    changeProp: 'onConfirm',
    resetProp: 'onClear',
    props: { label: 'Reminder', placeholder: 'Set a reminder' },
    value: () => undefined,
    code: 'label="Reminder" placeholder="Set a reminder" value={date} onConfirm={setDate}',
    controls: [
      PRESENTATION,
      { prop: 'display', options: ['auto', 'wheel', 'calendar'], unset: 'auto' },
      { prop: 'minuteInterval', options: [1, 5, 15, 30] },
      CLEARABLE,
    ],
  },
  selectPicker: {
    name: 'Select',
    component: Select,
    props: {
      label: 'Fruit',
      options: toOptions(['Apple', 'Banana', 'Cherry', 'Grape', 'Mango', 'Orange', 'Peach', 'Pear', 'Plum']),
    },
    value: ({ multiple }: PlaygroundSelection) => (multiple ? ['Banana'] : 'Banana'),
    resetProp: 'onClear',
    code: 'label="Fruit" options={fruits} value={value} onValueChange={setValue}',
    controls: [
      PRESENTATION,
      { prop: 'multiple', options: [false, true] },
      CLEARABLE,
      { prop: 'searchable', options: [true, false], default: null },
      { prop: 'chips', options: [true, false] },
      { prop: 'closeOnSelect', options: [true, false] },
      { prop: 'showCheckmarks', options: [true, false] },
      REQUIRED,
      ERROR,
      { prop: 'disabled', options: [false, true] },
      { prop: 'loading', options: [false, true] },
      DESIGN,
    ],
  },
  selectList: {
    name: 'SelectList',
    component: SelectList,
    props: {
      listHeight: 260,
      options: toOptions(['Canada', 'France', 'Germany', 'Israel', 'Italy', 'Japan', 'Mexico', 'Spain', 'Sweden', 'United States']),
    },
    value: ({ multiple }: PlaygroundSelection) => (multiple ? ['Japan'] : 'Japan'),
    code: 'options={countries} value={value} onValueChange={setValue}',
    controls: [
      { prop: 'multiple', options: [false, true] },
      { prop: 'searchable', options: [true, false], default: null },
      { prop: 'showCheckmarks', options: [true, false] },
      { prop: 'loading', options: [false, true] },
    ],
  },
  countryPicker: {
    name: 'CountryPicker',
    component: CountryPicker,
    props: { label: 'Country', preferred: ['US', 'GB', 'IL'] },
    value: ({ multiple }: PlaygroundSelection) => (multiple ? ['FR', 'JP'] : 'FR'),
    resetProp: 'onClear',
    code: "label=\"Country\" preferred={['US', 'GB', 'IL']} value={value} onValueChange={setValue}",
    controls: [
      PRESENTATION,
      { prop: 'showDialCode', options: [false, true] },
      { prop: 'multiple', options: [false, true] },
      CLEARABLE,
      { prop: 'locale', options: ['en', 'de', 'he', 'ja'], default: null },
      { prop: 'disabled', options: [false, true] },
    ],
  },
  languagePicker: {
    name: 'LanguagePicker',
    component: LanguagePicker,
    props: { label: 'App language', preferred: ['en', 'es'] },
    value: ({ multiple }: PlaygroundSelection) => (multiple ? ['en', 'fr'] : 'fr'),
    resetProp: 'onClear',
    code: "label=\"App language\" preferred={['en', 'es']} value={value} onValueChange={setValue}",
    controls: [
      PRESENTATION,
      { prop: 'showFlag', options: [true, false] },
      { prop: 'multiple', options: [false, true] },
      CLEARABLE,
      { prop: 'locale', options: ['en', 'de', 'he', 'ja'], default: null },
      { prop: 'disabled', options: [false, true] },
    ],
  },
  phoneField: {
    name: 'PhoneField',
    component: PhoneField,
    props: { label: 'Phone', preferred: ['US', 'GB', 'IL'] },
    value: '+12015550123',
    code: "label=\"Phone\" preferred={['US', 'GB', 'IL']} value={phone} onValueChange={setPhone}",
    controls: [
      PRESENTATION,
      { prop: 'locale', options: ['en', 'de', 'he', 'ja'], default: null },
      REQUIRED,
      ERROR,
      { prop: 'disabled', options: [false, true] },
    ],
  },
  timeZonePicker: {
    name: 'TimeZonePicker',
    component: TimeZonePicker,
    props: { label: 'Time zone' },
    value: ({ multiple }: PlaygroundSelection) => (multiple ? ['Europe/Lisbon', 'Asia/Tokyo'] : 'Europe/Lisbon'),
    resetProp: 'onClear',
    code: 'label="Time zone" value={timeZone} onValueChange={setTimeZone}',
    controls: [
      PRESENTATION,
      { prop: 'multiple', options: [false, true] },
      CLEARABLE,
      { prop: 'locale', options: ['en', 'de', 'he', 'ja'], default: null },
      { prop: 'disabled', options: [false, true] },
    ],
  },
  segmentedControl: {
    name: 'SegmentedControl',
    component: SegmentedControl,
    props: {
      items: [
        { label: 'Walk', value: 'walk', icon: <Text>🚶</Text> },
        { label: 'Bike', value: 'bike', icon: <Text>🚲</Text> },
        { label: 'Bus', value: 'bus', icon: <Text>🚌</Text> },
        { label: 'Car', value: 'car', icon: <Text>🚗</Text> },
      ],
    },
    value: 'bike',
    code: 'items={modes} value={mode} onValueChange={setMode}',
    controls: [
      { prop: 'iconPosition', options: ['left', 'right', 'top', 'bottom'] },
      { prop: 'showArrows', options: [false, true] },
      { prop: 'arrowPosition', options: ['outside', 'overlay'] },
    ],
  },
  chipGroup: {
    name: 'ChipGroup',
    component: ChipGroup,
    props: {
      items: [
        { label: 'Walk', value: 'walk', icon: <Text>🚶</Text> },
        { label: 'Bike', value: 'bike', icon: <Text>🚲</Text> },
        { label: 'Bus', value: 'bus', icon: <Text>🚌</Text> },
        { label: 'Car', value: 'car', icon: <Text>🚗</Text> },
      ],
    },
    value: 'bike',
    code: 'items={modes} value={mode} onValueChange={setMode}',
    controls: [
      { prop: 'iconPosition', options: ['left', 'right', 'top', 'bottom'] },
      { prop: 'showArrows', options: [false, true] },
      { prop: 'arrowPosition', options: ['outside', 'overlay'] },
    ],
  },
  wheelPicker: {
    platforms: false,
    name: 'WheelPicker',
    component: WheelPicker,
    props: { items: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
    value: 'M',
    code: 'items={sizes} value={size} onValueChange={setSize}',
    controls: [
      { prop: 'variant', options: ['3d', 'flat'] },
      { prop: 'loop', options: [false, true] },
      { prop: 'visibleItems', options: [3, 5, 7], default: 5 },
      { prop: 'textAlign', options: ['center', 'left', 'right'] },
      { prop: 'showIndicator', options: [true, false] },
      { prop: 'keyboardInput', options: [true, false] },
      { prop: 'disabled', options: [false, true] },
    ],
  },
  wheelPickerField: {
    name: 'WheelPickerField',
    component: WheelPickerField,
    changeProp: 'onConfirm',
    resetProp: 'onClear',
    props: { label: 'Size', placeholder: 'Choose a size', items: ['XS', 'S', 'M', 'L', 'XL'] },
    value: () => undefined,
    code: 'label="Size" placeholder="Choose a size" items={sizes} value={size} onConfirm={setSize}',
    controls: [PRESENTATION, { prop: 'variant', options: ['3d', 'flat'] }, CLEARABLE],
  },
  multiWheelPicker: {
    platforms: false,
    name: 'MultiWheelPicker',
    component: MultiWheelPicker,
    props: {
      separator: ':',
      columns: [
        { key: 'h', items: twoDigits(24), defaultValue: 9 },
        { key: 'm', items: twoDigits(60), defaultValue: 41, loop: true },
      ],
    },
    code: 'columns={columns} separator=":"',
    controls: [
      { prop: 'variant', options: ['3d', 'flat'] },
      { prop: 'visibleItems', options: [3, 5, 7], default: 5 },
      { prop: 'itemHeight', options: [32, 40, 52], default: 40 },
    ],
  },
  emojiPicker: {
    name: 'EmojiPicker',
    component: EmojiPicker,
    props: { onSelect: () => {} },
    code: 'onSelect={insert}',
    controls: [
      { prop: 'categoryBarPosition', options: ['auto', 'top', 'bottom'] },
      { prop: 'columns', options: [6, 8, 10], default: 8 },
      { prop: 'searchable', options: [true, false] },
      { prop: 'showCategoryBar', options: [true, false] },
      { prop: 'showSectionHeaders', options: [true, false] },
      { prop: 'showSkinTones', options: [true, false] },
      { prop: 'showRecent', options: [true, false] },
    ],
  },
  emojiPickerField: {
    name: 'EmojiPickerField',
    component: EmojiPickerField,
    changeProp: 'onSelect',
    resetProp: 'onClear',
    props: { label: 'Icon', placeholder: 'Pick an icon' },
    value: () => undefined,
    code: 'label="Icon" placeholder="Pick an icon" value={icon} onSelect={setIcon}',
    controls: [PRESENTATION, { prop: 'closeOnSelect', options: [true, false] }, CLEARABLE],
  },
  colorPicker: {
    name: 'ColorPicker',
    component: ColorPicker,
    value: '#E91E63',
    code: 'value={color} onValueChange={setColor}',
    controls: [
      { prop: 'display', options: ['auto', 'tabs', 'swatches', 'spectrum'], unset: 'auto' },
      { prop: 'showAlpha', options: [false, true] },
      { prop: 'showCustom', options: [true, false] },
    ],
  },
  slider: {
    name: 'Slider',
    component: Slider,
    props: { accessibilityLabel: 'Volume' },
    value: ({ range }: PlaygroundSelection) => (range ? [20, 80] : 40),
    code: 'value={volume} onValueChange={setVolume} accessibilityLabel="Volume"',
    controls: [
      { prop: 'range', options: [false, true] },
      { prop: 'step', options: [1, 10, 0], default: 1 },
      { prop: 'showSteps', options: [false, true] },
      {
        prop: 'marks',
        options: ['none', 'quarters'],
        unset: 'none',
        values: {
          quarters: { live: [0, { value: 25, label: '25' }, { value: 50, label: '50' }, { value: 75, label: '75' }, 100], code: 'marks' },
        },
      },
      { prop: 'snapToMarks', options: [false, true] },
      { prop: 'valueLabel', options: ['auto', 'never', 'drag', 'always'], unset: 'auto' },
      { prop: 'minimumIcon', options: ['none', 'speaker'], unset: 'none', values: { speaker: icon('🔈', '<VolumeLowIcon />') } },
      { prop: 'maximumIcon', options: ['none', 'speaker'], unset: 'none', values: { speaker: icon('🔊', '<VolumeHighIcon />') } },
      DISABLED,
      DESIGN,
    ],
  },
  rating: {
    platforms: false,
    name: 'Rating',
    component: Rating,
    // A row of stars is as wide as its stars, so the preview centres it.
    props: { style: { alignSelf: 'center' } },
    value: 3,
    code: 'value={stars} onValueChange={setStars}',
    controls: [
      { prop: 'step', options: [1, 0.5], default: 1 },
      { prop: 'max', options: [5, 10, 3], default: 5 },
      { prop: 'readOnly', options: [false, true] },
      { prop: 'disabled', options: [false, true] },
    ],
  },
  otpField: {
    name: 'InputOTP',
    component: InputOTP,
    value: '',
    code: 'value={code} onValueChange={setCode} onComplete={verify}',
    controls: [
      { prop: 'length', options: [6, 4, 8], default: 6 },
      { prop: 'inputMode', options: ['numeric', 'text'], default: 'numeric' },
      { prop: 'secureTextEntry', options: [false, true] },
      { prop: 'error', options: ['none', 'That code didn’t match'], unset: 'none' },
      { prop: 'disabled', options: [false, true] },
    ],
  },
  colorPickerField: {
    name: 'ColorPickerField',
    component: ColorPickerField,
    changeProp: 'onConfirm',
    resetProp: 'onClear',
    props: { label: 'Label colour', placeholder: 'Pick a colour' },
    value: () => undefined,
    code: 'label="Label colour" placeholder="Pick a colour" value={color} onConfirm={setColor}',
    controls: [
      PRESENTATION,
      { prop: 'display', options: ['auto', 'tabs', 'swatches', 'spectrum'], unset: 'auto' },
      { prop: 'showAlpha', options: [false, true] },
      CLEARABLE,
    ],
  },
  pickerField: {
    name: 'DatePickerField',
    component: DatePickerField,
    changeProp: 'onConfirm',
    resetProp: 'onClear',
    props: { label: 'Dates', placeholder: 'Pick dates' },
    value: dateValue,
    code: 'label="Dates" placeholder="Pick dates" value={value} onConfirm={setValue}',
    controls: [
      { prop: 'mode', options: ['single', 'range', 'multiple', 'ranges'] },
      { prop: 'display', options: ['calendar', 'wheel'] },
      PRESENTATION,
      CLEARABLE,
      { prop: 'confirmOnSelect', options: [false, true] },
      REQUIRED,
      ERROR,
      { prop: 'disabled', options: [false, true] },
    ],
  },
  pickerSheet: {
    name: 'DatePickerSheet',
    component: DatePickerSheet,
    opener: 'Pick dates',
    changeProp: 'onConfirm',
    props: { title: 'Dates' },
    value: dateValue,
    code: 'visible={open} onClose={() => setOpen(false)} value={value} onConfirm={setValue}',
    controls: [
      { prop: 'presentation', options: ['auto', 'bottomSheet', 'modal'] },
      { prop: 'mode', options: ['single', 'range', 'multiple'] },
      { prop: 'display', options: ['calendar', 'wheel'] },
      { prop: 'confirmOnSelect', options: [false, true] },
      { prop: 'showCancel', options: [true, false] },
    ],
  },
  bottomSheet: {
    name: 'BottomSheet',
    component: BottomSheet,
    opener: 'Open sheet',
    props: { title: 'Share' },
    code: 'visible={open} onClose={() => setOpen(false)} title="Share"',
    controls: [
      { prop: 'presentation', options: ['auto', 'bottomSheet', 'modal'] },
      { prop: 'enableSwipeToClose', options: [true, false] },
      { prop: 'draggable', options: [true, false], default: null },
      { prop: 'expandable', options: [true, false] },
      { prop: 'closeOnBackdropPress', options: [true, false] },
    ],
    children: (
      <View style={styles.sheetActions}>
        {['Copy link', 'Send via message', 'Share to…'].map((action) => (
          <Text key={action} style={styles.sheetAction}>
            {action}
          </Text>
        ))}
      </View>
    ),
  },
  actionSheet: {
    name: 'ActionSheet',
    component: ActionSheet,
    opener: 'Photo options',
    props: {
      title: 'Profile photo',
      actions: [{ label: 'Take photo' }, { label: 'Choose from library' }, { label: 'Remove photo', destructive: true }],
    },
    code: 'visible={open} onClose={() => setOpen(false)} title="Profile photo" actions={actions}',
    controls: [
      { prop: 'presentation', options: ['auto', 'bottomSheet', 'modal'] },
      { prop: 'showCancel', options: ['auto', true, false], unset: 'auto' },
    ],
  },
  menu: {
    name: 'DropdownMenu',
    component: DropdownMenu,
    props: {
      accessibilityLabel: 'Note options',
      style: { alignSelf: 'center' },
      styles: { trigger: styles.pill },
      actions: [
        { label: 'Edit', icon: <Text>✏️</Text> },
        { label: 'Duplicate', icon: <Text>📄</Text> },
        { label: 'Pin to top', icon: <Text>📌</Text>, selected: true },
        { label: 'Delete', icon: <Text>🗑️</Text>, destructive: true },
      ],
    },
    code: 'actions={actions} accessibilityLabel="Note options"',
    controls: [
      { prop: 'align', options: ['auto', 'start', 'end'] },
      { prop: 'title', options: ['none', 'Note'], unset: 'none' },
      { prop: 'presentation', options: ['menu', 'sheet'] },
      { prop: 'openOnLongPress', options: [false, true] },
      { prop: 'disabled', options: [false, true] },
    ],
    children: <DropdownMenuTrigger />,
  },
  textField: {
    name: 'TextField',
    component: TextField,
    props: { label: 'Email', placeholder: 'you@example.com', keyboardType: 'email-address', autoCapitalize: 'none' },
    value: '',
    code: 'label="Email" placeholder="you@example.com" value={email} onValueChange={setEmail}',
    controls: [
      { prop: 'helperText', options: ['none', "We'll send the receipt here"], unset: 'none', initial: "We'll send the receipt here" },
      { prop: 'startIcon', options: ['none', 'mail'], unset: 'none', values: { mail: icon('✉️', '<MailIcon />') } },
      { prop: 'prefix', options: ['none', '$', 'https://'], unset: 'none' },
      { prop: 'suffix', options: ['none', 'kg', '.com'], unset: 'none' },
      CLEARABLE,
      { prop: 'secureTextEntry', options: [false, true] },
      { prop: 'passwordToggle', options: [true, false] },
      { prop: 'maxLength', options: ['none', 40], unset: 'none' },
      { prop: 'showCount', options: [false, true] },
      REQUIRED,
      ERROR,
      { prop: 'readOnly', options: [false, true] },
      DISABLED,
      DESIGN,
    ],
  },
  textArea: {
    name: 'TextArea',
    component: TextArea,
    props: { label: 'Bio', placeholder: 'A few words about you', maxLength: 160 },
    value: '',
    code: 'label="Bio" placeholder="A few words about you" maxLength={160} value={bio} onValueChange={setBio}',
    controls: [
      { prop: 'minRows', options: [3, 2, 5], default: 3 },
      { prop: 'maxRows', options: ['none', 6, 10], unset: 'none' },
      { prop: 'showCount', options: [false, true], initial: true },
      REQUIRED,
      ERROR,
      { prop: 'disabled', options: [false, true] },
    ],
  },
  dialog: {
    name: 'Dialog',
    component: DialogDemo,
    opener: 'Edit profile',
    code: 'open={open} onOpenChange={setOpen}',
    controls: [{ prop: 'dismissible', options: [true, false] }, DESIGN],
    children: (
      <>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile. Save when you're done.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button>Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </>
    ),
  },
  alertDialog: {
    name: 'AlertDialog',
    component: AlertDialogDemo,
    opener: 'Delete note',
    code: 'open={open} onOpenChange={setOpen}',
    controls: [{ prop: 'dismissible', options: [true, false] }, DESIGN],
    children: (
      <>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this note?</AlertDialogTitle>
          <AlertDialogDescription>This can't be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </>
    ),
  },
  popover: {
    name: 'PopoverContent',
    component: PopoverDemo,
    props: { accessibilityLabel: 'Details', style: { width: 240 } },
    code: 'accessibilityLabel="Details"',
    controls: [
      { prop: 'side', options: ['bottom', 'top', 'left', 'right'] },
      { prop: 'align', options: ['center', 'start', 'end'] },
      { prop: 'arrow', options: ['auto', true, false], unset: 'auto' },
      { prop: 'presentation', options: ['popover', 'sheet'] },
    ],
    children: <UIText>Your plan renews on the 1st of each month.</UIText>,
  },
  tooltip: {
    name: 'Tooltip',
    component: Tooltip,
    props: { content: 'Copy link' },
    code: 'content="Copy link"',
    controls: [
      { prop: 'side', options: ['top', 'bottom', 'left', 'right'] },
      { prop: 'align', options: ['center', 'start', 'end'] },
      { prop: 'delayDuration', options: [500, 0, 1000] },
    ],
    children: (
      <Button size="icon" variant="outline" accessibilityLabel="Copy link" style={{ alignSelf: 'center' }}>
        <UIText>⧉</UIText>
      </Button>
    ),
  },
  toast: {
    name: 'Toaster',
    component: ToastDemo,
    controls: [
      { prop: 'position', options: ['auto', 'top', 'bottom'], unset: 'auto' },
      { prop: 'max', options: [3, 1, 5] },
      { prop: 'duration', options: [4000, 2000, 8000] },
      { prop: 'closeButton', options: ['auto', true, false], unset: 'auto' },
      DESIGN,
    ],
  },
  tabs: {
    name: 'Tabs',
    component: Tabs,
    props: { defaultValue: 'account', style: { width: 360 } },
    code: 'defaultValue="account"',
    children: [
      <TabsList key="list" aria-label="Settings">
        <TabsTrigger value="account" icon={<Text>👤</Text>}>
          Account
        </TabsTrigger>
        <TabsTrigger value="password" icon={<Text>🔒</Text>}>
          Password
        </TabsTrigger>
        <TabsTrigger value="team" disabled>
          Team
        </TabsTrigger>
      </TabsList>,
      <TabsContent key="account" value="account">
        <Stack gap="sm">
          <TextField label="Name" defaultValue="Maya Cohen" />
          <Button style={{ alignSelf: 'flex-start' }}>Save</Button>
        </Stack>
      </TabsContent>,
      <TabsContent key="password" value="password">
        <Stack gap="sm">
          <TextField label="Current password" secureTextEntry />
          <TextField label="New password" secureTextEntry helperText="At least 12 characters" />
        </Stack>
      </TabsContent>,
      <TabsContent key="team" value="team">
        <UIText>Invite people to your workspace.</UIText>
      </TabsContent>,
    ],
    controls: [
      { prop: 'variant', options: ['auto', 'pills', 'underline'], unset: 'auto' },
      { prop: 'orientation', options: ['horizontal', 'vertical'] },
      DESIGN,
    ],
  },
  collapsible: {
    name: 'Collapsible',
    component: CollapsibleDemo,
    props: { style: { width: 320 } },
    controls: [
      { prop: 'iconPosition', options: ['auto', 'start', 'end', 'none'], unset: 'auto' },
      { prop: 'rotation', options: ['auto', false], unset: 'auto' },
      { prop: 'disabled', options: [false, true] },
    ],
  },
  modal: {
    name: 'Modal',
    component: ModalDemo,
    opener: 'Edit profile',
    code: 'open={open} onOpenChange={setOpen}',
    controls: [
      { prop: 'size', options: ['md', 'sm', 'lg', 'xl', 'full'] },
      { prop: 'fullScreen', options: ['auto', true, false], unset: 'auto' },
      { prop: 'showCloseButton', options: [true, false] },
      { prop: 'dismissible', options: [true, false] },
    ],
    children: (
      <>
        <ModalHeader>
          <ModalTitle>Edit profile</ModalTitle>
          <ModalDescription>Changes show on your public page.</ModalDescription>
        </ModalHeader>
        <ModalBody>
          <TextField label="Name" defaultValue="Maya Cohen" />
          <TextArea label="Bio" defaultValue="Designer in Tel Aviv." />
        </ModalBody>
        <ModalFooter>
          <ModalClose>
            <Button>Save</Button>
          </ModalClose>
        </ModalFooter>
      </>
    ),
  },
  accordion: {
    name: 'Accordion',
    component: Accordion,
    props: { type: 'single', collapsible: true, defaultValue: 'shipping', style: { width: 340 } },
    code: 'type="single" collapsible defaultValue="shipping"',
    children: [
      <AccordionItem key="shipping" value="shipping">
        <AccordionTrigger>How long does shipping take?</AccordionTrigger>
        <AccordionContent>
          <UIText color="textSecondary">Orders ship within two working days.</UIText>
        </AccordionContent>
      </AccordionItem>,
      <AccordionItem key="returns" value="returns">
        <AccordionTrigger>Can I return an item?</AccordionTrigger>
        <AccordionContent>
          <UIText color="textSecondary">Yes, within 30 days.</UIText>
        </AccordionContent>
      </AccordionItem>,
      <AccordionItem key="warranty" value="warranty">
        <AccordionTrigger>Is there a warranty?</AccordionTrigger>
        <AccordionContent>
          <UIText color="textSecondary">Two years on every product.</UIText>
        </AccordionContent>
      </AccordionItem>,
    ],
    controls: [DISABLED, DESIGN],
  },
  carousel: {
    name: 'Carousel',
    component: Carousel,
    props: { accessibilityLabel: 'Featured', style: { width: 340 } },
    code: 'accessibilityLabel="Featured"',
    children: SLIDE_COLORS.map((color, i) => (
      <View key={color} style={[styles.slide, { backgroundColor: color }]}>
        <Text style={styles.slideText}>{i + 1}</Text>
      </View>
    )),
    controls: [
      { prop: 'itemWidth', options: ['100%', '85%', '70%'] },
      { prop: 'loop', options: [false, true] },
      { prop: 'autoplay', options: [false, true] },
      { prop: 'align', options: ['center', 'start'] },
    ],
  },
  qrCode: {
    name: 'QRCode',
    component: QRCode,
    props: { value: 'https://github.com/patine-ui/patine' },
    code: 'value="https://github.com/patine-ui/patine"',
    controls: [
      { prop: 'errorCorrection', options: ['M', 'L', 'Q', 'H'] },
      { prop: 'size', options: [200, 140, 260] },
      { prop: 'quietZone', options: [4, 2, 0] },
    ],
  },
  sortableList: {
    name: 'SortableList',
    component: SortableDemo,
    code: 'data={items} onReorder={setItems} keyExtractor={(item) => item} renderItem={renderRow}',
    controls: [
      { prop: 'activation', options: ['longPress', 'handle'] },
      { prop: 'disabled', options: [false, true] },
    ],
  },
  swipeableRow: {
    name: 'SwipeableRow',
    component: SwipeableDemo,
    code: "trailingActions={[{ label: 'Delete', variant: 'destructive', onPress: remove }]}",
    controls: [
      { prop: 'fullSwipe', options: [false, true] },
      { prop: 'disabled', options: [false, true] },
    ],
  },
  imageViewer: {
    name: 'ImageViewer',
    component: ImageViewerDemo,
    code: 'images={photos} open={open} onOpenChange={setOpen}',
    controls: [{ prop: 'swipeToClose', options: [true, false] }],
  },
  signaturePad: {
    name: 'SignaturePad',
    component: SignaturePad,
    props: { style: { width: 340 } },
    controls: [
      { prop: 'strokeWidth', options: [3, 2, 5] },
      { prop: 'height', options: [200, 160, 260] },
      { prop: 'disabled', options: [false, true] },
    ],
  },
  steps: {
    name: 'Steps',
    component: Steps,
    props: {
      steps: [{ title: 'Cart' }, { title: 'Shipping' }, { title: 'Payment' }, { title: 'Review' }],
      style: { width: 360 },
    },
    code: 'steps={steps}',
    controls: [
      { prop: 'value', options: [1, 0, 2, 4], default: null },
      { prop: 'variant', options: ['steps', 'progress'] },
      { prop: 'orientation', options: ['horizontal', 'vertical'] },
    ],
  },
};
