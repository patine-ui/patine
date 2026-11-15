import { Platform, View } from 'react-native';

import { fireEvent, render, screen } from '@testing-library/react-native';

import { Carousel } from './Carousel';
import { PageIndicator } from './components/PageIndicator';
import { Pager } from './Pager';

const slides = ['a', 'b', 'c'].map((id) => <View key={id} testID={`slide-${id}`} />);
const layout = (width: number) => ({ nativeEvent: { layout: { width, height: 200, x: 0, y: 0 } } });
const scrollEnd = (x: number) => ({ nativeEvent: { contentOffset: { x, y: 0 } } });

describe('Carousel', () => {
  it('reports the slide a swipe settles on, and only then', async () => {
    const onValueChange = jest.fn();
    await render(
      <Pager testID="pager" onValueChange={onValueChange}>
        {slides}
      </Pager>
    );
    const scroll = screen.getByTestId('pager-scroll');
    await fireEvent(scroll, 'layout', layout(300));
    await fireEvent(scroll, 'momentumScrollEnd', scrollEnd(300));
    expect(onValueChange).toHaveBeenCalledWith(1);
    await fireEvent(scroll, 'momentumScrollEnd', scrollEnd(310));
    expect(onValueChange).toHaveBeenCalledTimes(1);
  });

  it('does not call onValueChange when the app changes value', async () => {
    const onValueChange = jest.fn();
    const { rerender } = await render(
      <Carousel testID="c" value={0} onValueChange={onValueChange}>
        {slides}
      </Carousel>
    );
    await fireEvent(screen.getByTestId('c-scroll'), 'layout', layout(300));
    await rerender(
      <Carousel testID="c" value={2} onValueChange={onValueChange}>
        {slides}
      </Carousel>
    );
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('steps with the arrows and the dots, and holds at the ends without loop', async () => {
    const onValueChange = jest.fn();
    await render(
      <Carousel testID="c" showArrows onValueChange={onValueChange}>
        {slides}
      </Carousel>
    );
    await fireEvent(screen.getByTestId('c-scroll'), 'layout', layout(300));
    expect(screen.getByRole('button', { name: 'Previous slide' })).toBeDisabled();
    await fireEvent.press(screen.getByRole('button', { name: 'Next slide' }));
    expect(onValueChange).toHaveBeenLastCalledWith(1);
    await fireEvent.press(screen.getByTestId('c-indicator-2'));
    expect(onValueChange).toHaveBeenLastCalledWith(2);
    expect(screen.getByRole('button', { name: 'Next slide' })).toBeDisabled();
  });

  it('wraps in a loop and hides the extra copies from screen readers', async () => {
    const onValueChange = jest.fn();
    await render(
      <Carousel testID="c" loop showArrows onValueChange={onValueChange}>
        {slides}
      </Carousel>
    );
    expect(screen.getAllByTestId('slide-a', { includeHiddenElements: true })).toHaveLength(3);
    expect(screen.getAllByTestId('slide-a')).toHaveLength(1);
    await fireEvent(screen.getByTestId('c-scroll'), 'layout', layout(300));
    await fireEvent.press(screen.getByRole('button', { name: 'Previous slide' }));
    expect(onValueChange).toHaveBeenLastCalledWith(2);
  });

  it('gives screen readers an adjustable page control on phones', async () => {
    expect(Platform.OS).not.toBe('web');
    const onValueChange = jest.fn();
    await render(<PageIndicator count={4} value={1} onValueChange={onValueChange} />);
    const dots = screen.getByRole('adjustable');
    expect(dots.props.accessibilityValue).toEqual({ text: 'Slide 2 of 4' });
    await fireEvent(dots, 'accessibilityAction', { nativeEvent: { actionName: 'increment' } });
    expect(onValueChange).toHaveBeenCalledWith(2);
  });
});
