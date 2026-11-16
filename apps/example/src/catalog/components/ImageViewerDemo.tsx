import { useState } from 'react';

import { Button, ImageViewer, type ImageViewerProps } from 'patine-ui';

const PHOTOS = [
  { source: { uri: 'https://picsum.photos/id/1018/1200/800' }, alt: 'Mountain valley' },
  { source: { uri: 'https://picsum.photos/id/1015/1200/800' }, alt: 'River in a canyon' },
  { source: { uri: 'https://picsum.photos/id/1039/1200/800' }, alt: 'Waterfall' },
];

type DemoProps = Pick<ImageViewerProps, 'swipeToClose' | 'design' | 'theme'>;

/** The ImageViewer playground: a button that opens three photos. */
export const ImageViewerDemo = (props: DemoProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onPress={() => setOpen(true)}>Open photos</Button>
      <ImageViewer {...props} images={PHOTOS} open={open} onOpenChange={setOpen} />
    </>
  );
};
