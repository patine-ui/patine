import { type GestureResponderEvent, Linking } from 'react-native';

import { EXTERNAL_HREF_ATTRS, getAnchorProps, openHref } from './href.utils';

let mockWeb = false;
jest.mock('@/core/core.constants', () => ({
  ...jest.requireActual('@/core/core.constants'),
  get IS_WEB() {
    return mockWeb;
  },
}));

const press = (prevented = false) => ({ isDefaultPrevented: () => prevented }) as GestureResponderEvent;

describe('getAnchorProps', () => {
  afterEach(() => {
    mockWeb = false;
  });

  it('makes an anchor on the web, in a new tab when external, and nothing when disabled', () => {
    mockWeb = true;
    expect(getAnchorProps('/docs')).toEqual({ href: '/docs', hrefAttrs: undefined });
    expect(getAnchorProps('https://x.dev', true)).toEqual({ href: 'https://x.dev', hrefAttrs: EXTERNAL_HREF_ATTRS });
    expect(getAnchorProps('/docs', false, true)).toEqual({});
  });

  it('adds nothing on iOS and Android', () => {
    expect(getAnchorProps('/docs')).toEqual({});
  });
});

describe('openHref', () => {
  afterEach(() => jest.restoreAllMocks());

  it('opens the address on native unless the press prevented it', () => {
    const open = jest.spyOn(Linking, 'openURL').mockResolvedValue(undefined);
    openHref(press(), 'https://x.dev');
    openHref(press(true), 'https://y.dev');
    openHref(press(), undefined);
    expect(open).toHaveBeenCalledTimes(1);
    expect(open).toHaveBeenCalledWith('https://x.dev');
  });
});
