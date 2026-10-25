import type { Dispatch, SetStateAction } from 'react';

import type { SelectListProps, SelectProps } from '@/index';

// Type-level regression test: `pnpm typecheck` fails this file if `onValueChange={setState}` stops compiling.
const picker = <T>(props: SelectProps<T>) => props;
const list = <T>(props: SelectListProps<T>) => props;

const options = [{ label: 'A', value: 'a' }];
const setOne = (() => {}) as Dispatch<SetStateAction<string | null>>;
const setMany = (() => {}) as Dispatch<SetStateAction<string[]>>;

describe('SelectValueProps', () => {
  it('accepts React state setters as onValueChange in single and multiple mode', () => {
    picker({ options, value: null, onValueChange: setOne });
    picker({ multiple: true, options, value: [], onValueChange: setMany });
    list({ multiple: true, options, value: [], onValueChange: setMany });
    // @ts-expect-error the value type still comes from options
    picker({ multiple: true, options, value: [], onValueChange: (v: number[]) => v });
    expect(picker({ options, onValueChange: setOne }).options).toBe(options);
  });
});
