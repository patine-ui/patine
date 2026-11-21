// The words components show and say by default, in one place so an app can translate them all through PatineProvider's
// `labels`. A component's own label props still win.

/** What the step buttons say to screen readers, for translation. */
export interface StepLabels {
  /** Default: 'Decrease' */
  decrement: string;
  /** Default: 'Increase' */
  increment: string;
}

/** What the field's buttons say, for translation. */
export interface TextFieldLabels {
  /** The clear button, for screen readers. Default: 'Clear' */
  clear: string;
  /** The password toggle while the password is hidden. Default: 'Show' */
  show: string;
  /** The password toggle while the password is shown. Default: 'Hide' */
  hide: string;
  /** The toggle, for screen readers, while the password is hidden. Default: 'Show password' */
  showPassword: string;
  /** The toggle, for screen readers, while the password is shown. Default: 'Hide password' */
  hidePassword: string;
}

/** What SearchField's buttons say, for translation. */
export interface SearchFieldLabels {
  /** The clear button, for screen readers. Default: 'Clear search' */
  clear: string;
  /** Default: 'Cancel' */
  cancel: string;
}

export interface SignatureLabels {
  /** Shown on the empty pad. Default: 'Sign here' */
  placeholder: string;
  /** Default: 'Clear' */
  clear: string;
  /** Read by screen readers. Default: 'Signature' */
  label: string;
  /** The pad's value for screen readers. Defaults: 'Signed', 'Empty' */
  signed: string;
  empty: string;
}

export interface ChatComposerLabels {
  /** The input's name for screen readers. Default: 'Message' */
  input: string;
  /** The send button's name. Default: 'Send' */
  send: string;
  /** The stop button's name, shown while `sending` when there's an `onStop`. Default: 'Stop' */
  stop: string;
}

export interface StepsLabels {
  /** With `{page}` and `{count}`. Default: 'Step {page} of {count}' */
  step: string;
  /** Read after a done step. Default: 'completed' */
  completed: string;
  /** Default: 'error' */
  error: string;
}

/** What the pagination says, for translation. */
export interface PaginationLabels {
  /** Default: 'Pagination' */
  nav: string;
  /** Default: 'Previous' */
  previous: string;
  /** Default: 'Next' */
  next: string;
  /** A page button's name for screen readers. Default: page => `Page ${page}` */
  page: (page: number) => string;
  /** The compact variant's text. Default: (page, count) => `Page ${page} of ${count}` */
  status: (page: number, count: number) => string;
}

export interface SortableLabels {
  /** The screen-reader action. Default: 'Move up' */
  moveUp: string;
  /** Default: 'Move down' */
  moveDown: string;
  /** Announced after a move, with `{position}` and `{count}`. Default: 'Moved to position {position} of {count}' */
  moved: string;
  /** Read on a row on the web: how to move it with keys. Default: 'Press Space to pick up, arrows to move, Space to drop' */
  keyboardHint: string;
}

export interface CarouselLabels {
  /** The previous-slide arrow. Default: 'Previous slide' */
  previous: string;
  /** The next-slide arrow. Default: 'Next slide' */
  next: string;
  /** Each slide's name, with `{page}` and `{count}` filled in. Default: 'Slide {page} of {count}' */
  slide: string;
}

export interface LightboxLabels {
  /** Default: 'Close' */
  close: string;
  /** Default: 'Previous image' */
  previous: string;
  /** Default: 'Next image' */
  next: string;
  /** The counter, with `{page}` and `{count}`. Default: 'Image {page} of {count}' */
  image: string;
}

/** Every default word in the library, by component. Give PatineProvider a partial copy in your language. */
export interface Labels {
  /** Closes a sheet, dialog, popover or menu. Default: 'Close' */
  close: string;
  /** Default: 'Cancel' */
  cancel: string;
  /** Confirms a picker sheet, in every design but Material. Default: 'Done' */
  done: string;
  /** Confirms a picker sheet in the Material design. Default: 'OK' */
  ok: string;
  /** A header's back button. Default: 'Back' */
  back: string;
  /** A retry action after something failed to load or send. Default: 'Try again' */
  retry: string;
  /** Clears a field's value, for screen readers. Default: 'Clear' */
  clear: string;
  /** A picker field with nothing picked. Default: 'Select…' */
  select: string;
  /** A list's search box. Default: 'Search' */
  search: string;
  /** A filtered list with no matches. Default: 'No results' */
  noResults: string;
  /** Default: 'Loading…' */
  loading: string;
  /** Read after a required field's name. Default: 'required' */
  required: string;
  /** The heading over suggested options in a long list. Default: 'Suggested' */
  suggested: string;
  /** The row that adds what was typed. Default: text => `Add "${text}"` */
  create: (text: string) => string;
  /** Default: 'Copy' */
  copy: string;
  /** Default: 'Copied' */
  copied: string;
  /** A toast's close button. Default: 'Close notification' */
  closeNotification: string;
  breadcrumbs: { nav: string; expand: string };
  tabBar: string;
  rating: string;
  otp: string;
  suggestions: string;
  alertDialog: { confirm: string; cancel: string };
  table: { empty: string };
  slider: { thumbs: [string, string] };
  emoji: { search: string; empty: string; skinTone: string; categories: Record<EmojiCategoryKey, string> };
  stepper: StepLabels;
  textField: TextFieldLabels;
  searchField: SearchFieldLabels;
  signature: SignatureLabels;
  composer: ChatComposerLabels;
  steps: StepsLabels;
  pagination: PaginationLabels;
  sortable: SortableLabels;
  carousel: CarouselLabels;
  lightbox: LightboxLabels;
  duration: Record<'hours' | 'minutes' | 'seconds', string>;
  color: Record<ColorLabelKey, string>;
  /** Read after an `error` set to `true`, which has no message of its own. Default: 'Invalid' */
  invalid: string;
  /** The day's name when `Intl` can't say it. Default: 'Today' */
  today: string;
  /** The Spinner's name for screen readers. Default: 'Loading' */
  spinner: string;
  /** SegmentedControl and ChipGroup's scroll arrows */
  scroll: { left: string; right: string };
  country: { placeholder: string; search: string; all: string; phone: string; code: string };
  language: { placeholder: string; search: string; all: string };
  timeZone: { placeholder: string; search: string; current: string; all: string };
  time: { start: string; end: string; range: string; hour: string; minute: string; toKeyboard: string; toDial: string };
  /** The duration wheels' names for screen readers */
  durationColumns: Record<'hours' | 'minutes' | 'seconds', string>;
  calendar: {
    previous: string;
    next: string;
    expand: string;
    collapse: string;
    presets: string;
    today: string;
    yesterday: string;
    last7Days: string;
    last30Days: string;
    thisMonth: string;
    lastMonth: string;
  };
}

export type EmojiCategoryKey =
  | 'recent'
  | 'search'
  | 'smileys'
  | 'people'
  | 'animals'
  | 'food'
  | 'travel'
  | 'activities'
  | 'objects'
  | 'symbols'
  | 'flags';

export type ColorLabelKey =
  | 'grid'
  | 'spectrum'
  | 'sliders'
  | 'hue'
  | 'saturation'
  | 'brightness'
  | 'opacity'
  | 'red'
  | 'green'
  | 'blue'
  | 'hex'
  | 'copy'
  | 'copied'
  | 'eyedropper'
  | 'custom';
