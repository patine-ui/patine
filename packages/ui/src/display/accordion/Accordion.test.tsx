import { Text } from 'react-native';

import { act, fireEvent, render, screen } from '@testing-library/react-native';

import type { DistributiveOmit } from '@/core/core.types';
import { Accordion } from './Accordion';
import { AccordionContent } from './AccordionContent';
import { AccordionItem } from './AccordionItem';
import { AccordionTrigger } from './AccordionTrigger';
import type { AccordionProps } from './accordion.types';

const keyDown = (key: string) => ({
  nativeEvent: { key },
  preventDefault: jest.fn(),
  stopPropagation: jest.fn(),
});

const Items = () => (
  <>
    <AccordionItem value="shipping">
      <AccordionTrigger>Shipping</AccordionTrigger>
      <AccordionContent>
        <Text>Ships in two days.</Text>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="returns" disabled>
      <AccordionTrigger>Returns</AccordionTrigger>
      <AccordionContent>
        <Text>Thirty days.</Text>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="warranty">
      <AccordionTrigger>Warranty</AccordionTrigger>
      <AccordionContent>
        <Text>Two years.</Text>
      </AccordionContent>
    </AccordionItem>
  </>
);

const FAQ = (props: DistributiveOmit<AccordionProps, 'children'>) => (
  <Accordion {...props}>
    <Items />
  </Accordion>
);

const trigger = (name: string) => screen.getByRole('button', { name });

// Closing animates first and unmounts after.
const finishAnimations = () =>
  act(async () => {
    jest.runAllTimers();
  });

describe('Accordion', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('opens one item at a time and reports it', async () => {
    const onValueChange = jest.fn();
    await render(<FAQ type="single" defaultValue="shipping" onValueChange={onValueChange} />);
    expect(trigger('Shipping')).toBeExpanded();
    expect(screen.getByText('Ships in two days.')).toBeOnTheScreen();
    expect(screen.queryByText('Two years.')).toBeNull();

    await fireEvent.press(trigger('Warranty'));
    expect(onValueChange).toHaveBeenCalledWith('warranty');
    expect(trigger('Warranty')).toBeExpanded();
    expect(trigger('Shipping')).toBeCollapsed();
    await finishAnimations();
    expect(screen.queryByText('Ships in two days.')).toBeNull();
    expect(screen.getByText('Two years.')).toBeOnTheScreen();
  });

  it('keeps the open item open unless collapsible', async () => {
    const onValueChange = jest.fn();
    const { rerender } = await render(<FAQ type="single" defaultValue="shipping" onValueChange={onValueChange} />);
    await fireEvent.press(trigger('Shipping'));
    expect(onValueChange).not.toHaveBeenCalled();
    expect(trigger('Shipping')).toBeExpanded();

    await rerender(<FAQ type="single" collapsible defaultValue="shipping" onValueChange={onValueChange} />);
    await fireEvent.press(trigger('Shipping'));
    expect(onValueChange).toHaveBeenCalledWith('');
    expect(trigger('Shipping')).toBeCollapsed();
  });

  it('opens items independently when multiple', async () => {
    const onValueChange = jest.fn();
    await render(<FAQ type="multiple" defaultValue={['shipping']} onValueChange={onValueChange} />);
    await fireEvent.press(trigger('Warranty'));
    expect(onValueChange).toHaveBeenLastCalledWith(['shipping', 'warranty']);
    await fireEvent.press(trigger('Shipping'));
    expect(onValueChange).toHaveBeenLastCalledWith(['warranty']);
    expect(trigger('Shipping')).toBeCollapsed();
    expect(trigger('Warranty')).toBeExpanded();
  });

  it('follows a controlled value without reporting it', async () => {
    const onValueChange = jest.fn();
    const { rerender } = await render(<FAQ type="single" value="shipping" onValueChange={onValueChange} />);
    await fireEvent.press(trigger('Warranty'));
    expect(onValueChange).toHaveBeenCalledWith('warranty');
    // The parent didn't take the change, so nothing moved.
    expect(trigger('Shipping')).toBeExpanded();

    onValueChange.mockClear();
    await rerender(<FAQ type="single" value="warranty" onValueChange={onValueChange} />);
    expect(trigger('Warranty')).toBeExpanded();
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('does not open a disabled item', async () => {
    const onValueChange = jest.fn();
    await render(<FAQ type="multiple" onValueChange={onValueChange} />);
    await fireEvent.press(trigger('Returns'));
    expect(onValueChange).not.toHaveBeenCalled();
    expect(trigger('Returns')).toBeDisabled();
  });

  it('labels the content with its trigger', async () => {
    await render(<FAQ type="single" defaultValue="shipping" />);
    const region = screen.getByText('Ships in two days.').parent?.parent;
    expect(region?.props.role).toBe('region');
    expect(trigger('Shipping').props['aria-controls']).toBe(region?.props.id);
    expect(region?.props['aria-labelledby']).toBe(trigger('Shipping').props.id);
  });

  it('answers the arrow keys, Home and End without opening anything', async () => {
    const onValueChange = jest.fn();
    await render(<FAQ type="single" onValueChange={onValueChange} />);
    for (const key of ['ArrowDown', 'ArrowUp', 'Home', 'End']) {
      const event = keyDown(key);
      await fireEvent(trigger('Shipping'), 'keyDown', event);
      expect(event.preventDefault).toHaveBeenCalled();
    }
    const left = keyDown('ArrowLeft');
    await fireEvent(trigger('Shipping'), 'keyDown', left);
    expect(left.preventDefault).not.toHaveBeenCalled();
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('draws every design', async () => {
    for (const design of ['brand', 'ios', 'material', 'web'] as const) {
      await render(<FAQ type="single" defaultValue="shipping" design={design} />);
      expect(trigger('Shipping')).toBeExpanded();
    }
  });

  it('takes any icon on the trigger, on either side or none', async () => {
    const { rerender } = await render(
      <Accordion type="single">
        <AccordionItem value="a">
          <AccordionTrigger icon={<Text>ICON</Text>} iconPosition="start" rotation={false}>
            A
          </AccordionTrigger>
        </AccordionItem>
      </Accordion>
    );
    expect(screen.getByText('ICON', { includeHiddenElements: true })).toBeTruthy();
    await rerender(
      <Accordion type="single">
        <AccordionItem value="a">
          <AccordionTrigger icon={<Text>ICON</Text>} iconPosition="none">
            A
          </AccordionTrigger>
        </AccordionItem>
      </Accordion>
    );
    expect(screen.queryByText('ICON', { includeHiddenElements: true })).toBeNull();
  });
});

describe('Accordion shorthand', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('draws sections from items, single by default, valued by index', async () => {
    const onValueChange = jest.fn();
    await render(
      <Accordion
        onValueChange={onValueChange}
        items={[
          { title: 'Shipping', content: <Text>Two days</Text> },
          { title: 'Returns', content: <Text>Thirty days</Text> },
        ]}
      />
    );
    await fireEvent.press(screen.getByRole('button', { name: 'Returns' }));
    expect(onValueChange).toHaveBeenLastCalledWith('1');
    await act(async () => {
      jest.runAllTimers();
    });
    expect(screen.getByText('Thirty days')).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: 'Shipping' }));
    expect(onValueChange).toHaveBeenLastCalledWith('0');
  });
});
