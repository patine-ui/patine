import { createElement } from 'react';

import { splitCardAction } from './card.utils';

const Action = () => null;
const Title = () => null;

describe('splitCardAction', () => {
  it('takes the action out of the header, keeping the rest in order', () => {
    const { text, action } = splitCardAction(
      [createElement(Title, { key: 't' }), createElement(Action, { key: 'a' }), 'Description'],
      Action
    );
    expect(text).toHaveLength(2);
    expect((action as { type: unknown }).type).toBe(Action);
  });

  it('leaves a header without an action as it is', () => {
    expect(splitCardAction(['Title', 'Description'], Action)).toEqual({ text: ['Title', 'Description'], action: undefined });
  });
});
