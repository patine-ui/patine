import { StyleSheet, Text } from 'react-native';

import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '@/core/theme/theme.constants';
import { AspectRatio } from './AspectRatio';
import { Box } from './Box';
import { Container } from './Container';
import { Grid } from './Grid';
import { Spacer } from './Spacer';

const flat = (id: string) => StyleSheet.flatten(screen.getByTestId(id, { includeHiddenElements: true }).props.style);

describe('layout', () => {
  it('Box turns its shorthands into theme styles, under its own style', async () => {
    await render(<Box testID="box" padding="lg" background="surface" radius="md" style={{ padding: 3 }} />);
    expect(flat('box')).toMatchObject({ padding: 3, backgroundColor: lightTheme.colors.surface });
  });

  it('Spacer grows by default, or takes a fixed size, and is hidden', async () => {
    await render(
      <>
        <Spacer testID="grow" />
        <Spacer testID="fixed" size="xl" />
      </>
    );
    expect(flat('grow')).toMatchObject({ flexGrow: 1 });
    expect(flat('fixed')).toMatchObject({ width: lightTheme.spacing.xl, height: lightTheme.spacing.xl });
    expect(screen.getByTestId('grow', { includeHiddenElements: true }).props['aria-hidden']).toBe(true);
  });

  it('Container caps its width at the size', async () => {
    await render(<Container testID="c" size="md" />);
    expect(flat('c')).toMatchObject({ maxWidth: 768, alignSelf: 'center' });
  });

  it('AspectRatio keeps its ratio', async () => {
    await render(<AspectRatio testID="ar" ratio={16 / 9} />);
    expect(flat('ar')).toMatchObject({ aspectRatio: 16 / 9, width: '100%' });
  });

  it('Grid splits cells into equal columns, and fits columns to a minimum width once measured', async () => {
    await render(
      <Grid testID="grid" columns={3}>
        <Text>a</Text>
        <Text>b</Text>
      </Grid>
    );
    expect(StyleSheet.flatten(screen.getByText('a').parent?.props.style)).toMatchObject({ width: `${100 / 3}%` });

    await render(
      <Grid testID="auto" minColumnWidth={100} gap={0}>
        <Text>c</Text>
      </Grid>
    );
    await act(() => fireEvent(screen.getByTestId('auto'), 'layout', { nativeEvent: { layout: { width: 400 } } }));
    expect(StyleSheet.flatten(screen.getByText('c').parent?.props.style)).toMatchObject({ width: '25%' });
  });
});
