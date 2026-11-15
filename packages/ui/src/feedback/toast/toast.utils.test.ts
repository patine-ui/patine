import { lightTheme } from '@/core/theme/theme.constants';
import { TOAST_DESIGN, TOAST_TYPE } from './toast.constants';
import type { ToastData } from './toast.types';
import {
  getDefaultPosition,
  getToastAnnouncement,
  getToastColors,
  getToastDuration,
  getToasts,
  isPersistent,
  subscribeToasts,
  toast,
} from './toast.utils';

const data = (over: Partial<ToastData> = {}): ToastData => ({
  id: 1,
  type: TOAST_TYPE.default,
  message: 'Saved',
  open: true,
  ...over,
});

describe('toast store', () => {
  beforeEach(() => toast.dismiss());

  it('adds the newest first, by type, and returns the id', () => {
    const first = toast('One');
    const second = toast.success('Two', { description: 'Done' });
    expect(getToasts().map((t) => [t.id, t.type, t.message])).toEqual([
      [second, 'success', 'Two'],
      [first, 'default', 'One'],
    ]);
    expect(getToasts()[0]?.description).toBe('Done');
  });

  it('updates a toast in place when its id is reused', () => {
    toast('Other');
    toast.loading('Uploading', { id: 'upload' });
    toast.success('Uploaded', { id: 'upload' });
    expect(getToasts()).toHaveLength(2);
    expect(getToasts()[0]).toMatchObject({ id: 'upload', type: 'success', message: 'Uploaded', open: true });
  });

  it('removes at once with no Toaster, and marks closed while one listens', () => {
    const id = toast('Gone');
    toast.dismiss(id);
    expect(getToasts()).toEqual([]);

    const unsubscribe = subscribeToasts(() => {});
    const kept = toast('Kept');
    toast.dismiss(kept);
    expect(getToasts()[0]?.open).toBe(false);
    unsubscribe();
  });

  it('notifies subscribers', () => {
    const listener = jest.fn();
    const unsubscribe = subscribeToasts(listener);
    toast('Hi');
    unsubscribe();
    toast('Bye');
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('turns a loading toast into success or error when the promise settles', async () => {
    const ok = toast.promise(Promise.resolve(3), { loading: 'Saving', success: (n) => `Saved ${n}`, error: 'Failed' });
    expect(getToasts()[0]).toMatchObject({ id: ok, type: 'loading', message: 'Saving' });
    await Promise.resolve();
    expect(getToasts()[0]).toMatchObject({ id: ok, type: 'success', message: 'Saved 3' });

    const bad = toast.promise(() => Promise.reject(new Error('offline')), {
      loading: 'Saving',
      success: 'Saved',
      error: (e) => (e as Error).message,
    });
    await Promise.resolve();
    expect(getToasts().find((t) => t.id === bad)).toMatchObject({ type: 'error', message: 'offline' });
  });
});

describe('toast utils', () => {
  it('stays until closed when loading or with an action, unless it sets a duration', () => {
    expect(getToastDuration(data(), 4000)).toBe(4000);
    expect(getToastDuration(data({ duration: 1000 }), 4000)).toBe(1000);
    expect(getToastDuration(data({ type: TOAST_TYPE.loading, duration: 1000 }), 4000)).toBe(Number.POSITIVE_INFINITY);
    expect(getToastDuration(data({ action: { label: 'Undo', onPress: () => {} } }), 4000)).toBe(Number.POSITIVE_INFINITY);
    expect(getToastDuration(data({ action: { label: 'Undo', onPress: () => {} }, duration: 8000 }), 4000)).toBe(8000);
  });

  it('counts a toast as persistent when only closing it ends it, but not a loading one', () => {
    expect(isPersistent(data({ duration: Number.POSITIVE_INFINITY }), 4000)).toBe(true);
    expect(isPersistent(data({ type: TOAST_TYPE.loading }), 4000)).toBe(false);
    expect(isPersistent(data(), 4000)).toBe(false);
  });

  it('announces the message and description', () => {
    expect(getToastAnnouncement({ message: 'Saved' })).toBe('Saved');
    expect(getToastAnnouncement({ message: 'Saved', description: 'Just now' })).toBe('Saved. Just now');
  });

  it('puts iOS at the top and the rest at the bottom', () => {
    expect(getDefaultPosition('ios')).toBe('top');
    expect(getDefaultPosition('android')).toBe('bottom');
    expect(getDefaultPosition('web')).toBe('bottom');
  });

  it('draws Material on the inverse surface', () => {
    const material = getToastColors(lightTheme, TOAST_DESIGN.material, TOAST_TYPE.error);
    expect(material).toMatchObject({
      background: lightTheme.colors.text,
      text: lightTheme.colors.background,
      accent: lightTheme.colors.danger,
    });
    expect(getToastColors(lightTheme, TOAST_DESIGN.brand, TOAST_TYPE.default).background).toBe(lightTheme.colors.background);
  });
});
