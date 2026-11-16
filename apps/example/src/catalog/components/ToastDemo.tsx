import { Button, Toaster, type ToasterProps, toast, VStack } from 'patine-ui';

/** The Toast playground: a Toaster with the chosen props, and a button that sends it a toast. */
export const ToastDemo = (props: ToasterProps) => (
  <VStack gap="sm" style={{ height: 280 }}>
    <Button variant="outline" onPress={() => toast('Event created', { description: 'Friday at 10:00', toasterId: 'playground' })}>
      Show toast
    </Button>
    <Toaster {...props} id="playground" />
  </VStack>
);
