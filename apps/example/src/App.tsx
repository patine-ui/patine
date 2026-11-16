import { useState } from 'react';

import type { DesignPreference } from 'patine-ui';
import { DESIGN, PatineProvider } from 'patine-ui';

import { Layout } from './components/Layout';
import type { Insets } from './example.types';

const NO_INSETS: Insets = { top: 0, bottom: 0 };

/** Every free component with its prop playgrounds, in one app for contributors. */
const App = ({ insets = NO_INSETS }: { insets?: Insets }) => {
  const [design, setDesign] = useState<DesignPreference>(DESIGN.brand);
  return (
    <PatineProvider design={design}>
      <Layout insets={insets} design={design} onDesignChange={setDesign} />
    </PatineProvider>
  );
};

export default App;
