import { AccessibilityInfo, StyleSheet } from 'react-native';

import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { PatineProvider } from '@/core/theme/ThemeProvider';
import { Toaster } from './Toaster';
import { toast } from './toast.utils';

const flush = async (ms: number) => {
  await act(async () => {
    jest.advanceTimersByTime(ms);
  });
};

describe('Toaster', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    toast.dismiss();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('shows a toast sent from outside React, then closes it after the duration', async () => {
    await render(<Toaster duration={1000} />);
    await act(async () => {
      toast.success('Saved', { description: 'Just now' });
    });
    expect(screen.getByText('Saved')).toBeTruthy();
    expect(screen.getByText('Just now')).toBeTruthy();
    await flush(999);
    expect(screen.getByText('Saved')).toBeTruthy();
    await flush(1000);
    expect(screen.queryByText('Saved')).toBeNull();
  });

  // The toast's swipe responder declines a plain touch, so RNTL won't fire touch events through it; a device still does.
  const touch = async (text: string, event: 'onTouchStart' | 'onTouchEnd') => {
    const toastView = screen.getByText(text).parent?.parent?.parent;
    await act(async () => {
      toastView?.props[event]();
    });
  };

  it('pauses the timer while touched', async () => {
    await render(<Toaster duration={1000} />);
    await act(async () => {
      toast('Held');
    });
    await flush(500);
    await touch('Held', 'onTouchStart');
    await flush(3000);
    expect(screen.getByText('Held')).toBeTruthy();
    await touch('Held', 'onTouchEnd');
    await flush(1500);
    expect(screen.queryByText('Held')).toBeNull();
  });

  it('announces politely, and errors without waiting', async () => {
    const announce = jest.spyOn(AccessibilityInfo, 'announceForAccessibilityWithOptions').mockClear();
    await render(<Toaster />);
    await act(async () => {
      toast('Copied', { description: 'Link copied' });
    });
    expect(announce).toHaveBeenLastCalledWith('Copied. Link copied', { queue: true });
    await act(async () => {
      toast.error('Payment failed');
    });
    expect(announce).toHaveBeenLastCalledWith('Payment failed', { queue: false });
  });

  it('keeps a toast with an action until it is used, then runs it and closes', async () => {
    const onPress = jest.fn();
    await render(<Toaster duration={1000} />);
    await act(async () => {
      toast('Message deleted', { action: { label: 'Undo', onPress } });
    });
    await flush(10000);
    expect(screen.getByText('Message deleted')).toBeTruthy();
    // It stays until closed, so it gets a close button too.
    expect(screen.getByRole('button', { name: 'Close notification' })).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: 'Undo' }));
    expect(onPress).toHaveBeenCalledTimes(1);
    await flush(1000);
    expect(screen.queryByText('Message deleted')).toBeNull();
  });

  it('updates a toast in place, as toast.promise does', async () => {
    let finish: (value: string) => void = () => {};
    await render(<Toaster />);
    await act(async () => {
      toast.promise(new Promise<string>((r) => (finish = r)), {
        loading: 'Uploading',
        success: (name) => `${name} uploaded`,
        error: 'Failed',
      });
    });
    expect(screen.getByText('Uploading')).toBeTruthy();
    await act(async () => {
      finish('photo.jpg');
    });
    expect(screen.queryByText('Uploading')).toBeNull();
    expect(screen.getByText('photo.jpg uploaded')).toBeTruthy();
  });

  it('shows at most `max`, newest first, and brings older ones back', async () => {
    await render(<Toaster max={2} duration={Number.POSITIVE_INFINITY} closeButton={false} />);
    await act(async () => {
      toast('One');
      toast('Two');
      toast('Three', { id: 'three' });
    });
    expect(screen.queryByText('One')).toBeNull();
    expect(screen.getByText('Three')).toBeTruthy();
    await act(async () => {
      toast.dismiss('three');
    });
    await flush(1000);
    expect(screen.getByText('One')).toBeTruthy();
  });

  it('shows a close button on the web, stacks from the bottom there, and keeps other Toasters out', async () => {
    await render(
      <PatineProvider platform="web">
        <Toaster />
        <Toaster id="side" />
      </PatineProvider>
    );
    await act(async () => {
      toast('Hello');
    });
    expect(screen.getAllByText('Hello')).toHaveLength(1);
    await fireEvent.press(screen.getByRole('button', { name: 'Close notification' }));
    await flush(1000);
    expect(screen.queryByText('Hello')).toBeNull();
  });

  it('stacks from the top on iOS, past the insets', async () => {
    await render(<Toaster insets={{ top: 47 }} offset={10} />);
    await act(async () => {
      toast('Top');
    });
    const style = StyleSheet.flatten(screen.root?.props.style);
    expect(style).toMatchObject({ flexDirection: 'column', paddingTop: 57, paddingBottom: 10 });
  });
});
