import { Button, Popover, PopoverContent, type PopoverContentProps, PopoverTrigger } from 'patine-ui';

/** The Popover playground: a trigger and content; the controls go to PopoverContent. */
export const PopoverDemo = ({ children, ...props }: PopoverContentProps) => (
  <Popover>
    <PopoverTrigger style={{ alignSelf: 'center' }}>
      <Button variant="outline">Open popover</Button>
    </PopoverTrigger>
    <PopoverContent {...props}>{children}</PopoverContent>
  </Popover>
);
