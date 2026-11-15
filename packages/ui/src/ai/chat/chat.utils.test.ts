import { lightTheme } from '@/core/theme/theme.constants';
import { CHAT_DESIGN } from './chat.constants';
import { getBubbleColors, getBubbleCorners, getSendableText } from './chat.utils';

const { colors } = lightTheme;

describe('getBubbleColors', () => {
  it('fills my bubbles with the primary color and reads them in onPrimary', () => {
    expect(getBubbleColors(colors, CHAT_DESIGN.ios, 'me')).toEqual({
      background: colors.primary,
      text: colors.onPrimary,
      border: 'transparent',
    });
  });

  it('tints sent bubbles in Material, so they read in the text color', () => {
    expect(getBubbleColors(colors, CHAT_DESIGN.material, 'me')).toMatchObject({ background: colors.primaryMuted, text: colors.text });
  });

  it('outlines received bubbles on the web', () => {
    expect(getBubbleColors(colors, CHAT_DESIGN.web, 'them')).toMatchObject({ background: colors.background, border: colors.border });
  });
});

describe('getBubbleCorners', () => {
  it('puts the small corner on the sender’s side', () => {
    expect(getBubbleCorners(CHAT_DESIGN.brand, 'me')).toMatchObject({ borderBottomRightRadius: 4, borderBottomLeftRadius: 16 });
    expect(getBubbleCorners(CHAT_DESIGN.brand, 'them')).toMatchObject({ borderBottomLeftRadius: 4, borderBottomRightRadius: 16 });
  });
});

describe('getSendableText', () => {
  it('trims the text', () => {
    expect(getSendableText('  hi there \n', false)).toBe('hi there');
  });

  it('sends nothing when empty or blocked', () => {
    expect(getSendableText('   ', false)).toBeNull();
    expect(getSendableText('hi', true)).toBeNull();
  });
});
