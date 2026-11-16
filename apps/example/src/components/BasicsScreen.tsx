import { useState } from 'react';

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Heading,
  HStack,
  RadioGroup,
  RadioGroupItem,
  Separator,
  Skeleton,
  Stack,
  Switch,
  Text,
  VStack,
} from 'patine-ui';

/** Every foundation, action, input, display and feedback component, so a design switch shows them all at once. */
export const BasicsScreen = () => {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState('pro');
  const [notifications, setNotifications] = useState(true);

  const save = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <VStack gap="xl" padding="lg">
      <VStack gap="xs">
        <Heading level={1}>Basics</Heading>
        <Text color="textSecondary">Switch the design above: Brand is one look everywhere, Native follows the platform.</Text>
      </VStack>

      <VStack gap="md">
        <Heading level={3}>Buttons</Heading>
        <HStack gap="sm" wrap>
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Delete</Button>
          <Button variant="link">Link</Button>
        </HStack>
        <HStack gap="sm" wrap>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" aria-label="Add">
            <Text color="onPrimary" size="lg">
              +
            </Text>
          </Button>
          <Button loading={loading} onPress={save}>
            {loading ? 'Saving' : 'Save'}
          </Button>
          <Button disabled>Disabled</Button>
        </HStack>
      </VStack>

      <Separator />

      <VStack gap="md">
        <Heading level={3}>Inputs</Heading>
        <Checkbox label="Accept the terms" description="You can change this later in settings." />
        <Checkbox label="Select all" defaultChecked={false} checked="mixed" />
        <Switch label="Notifications" checked={notifications} onCheckedChange={setNotifications} />
        <Switch label="Wi-Fi" description="Join known networks automatically" defaultChecked />
        <RadioGroup value={plan} onValueChange={setPlan} aria-label="Plan">
          <RadioGroupItem value="free" label="Free" />
          <RadioGroupItem value="pro" label="Pro" description="Charts, calendar, data grid" />
          <RadioGroupItem value="team" label="Team" disabled />
        </RadioGroup>
      </VStack>

      <Separator />

      <VStack gap="md">
        <Heading level={3}>Card</Heading>
        <Card>
          <CardHeader>
            <CardTitle>Pro plan</CardTitle>
            <CardDescription>Everything in Free, plus charts, scheduler and data grid.</CardDescription>
          </CardHeader>
          <CardContent>
            <HStack gap="sm">
              <Heading level={2}>$199</Heading>
              <Text color="textSecondary">one time</Text>
            </HStack>
          </CardContent>
          <CardFooter>
            <Button>Upgrade</Button>
            <Button variant="ghost">Compare plans</Button>
          </CardFooter>
        </Card>
      </VStack>

      <VStack gap="md">
        <Heading level={3}>Badges and avatars</Heading>
        <HStack gap="sm" wrap>
          <Badge>New</Badge>
          <Badge variant="secondary">Draft</Badge>
          <Badge variant="outline">v0.1</Badge>
          <Badge variant="success">Paid</Badge>
          <Badge variant="warning">Pending</Badge>
          <Badge variant="destructive">Overdue</Badge>
        </HStack>
        <HStack gap="md">
          <Avatar name="Ada Lovelace" size="sm" />
          <Avatar name="Grace Hopper" />
          <Avatar name="Alan Turing" size="lg" />
          <Avatar name="Broken Image" src="https://invalid.example/404.png" shape="square" />
        </HStack>
      </VStack>

      <VStack gap="md">
        <Heading level={3}>Feedback</Heading>
        <Alert>
          <AlertTitle>Heads up</AlertTitle>
          <AlertDescription>You can add components to your app with the CLI.</AlertDescription>
        </Alert>
        <Alert variant="success">
          <AlertTitle>Payment received</AlertTitle>
          <AlertDescription>Your Pro licence is on its way.</AlertDescription>
        </Alert>
        <Alert variant="destructive" live={false}>
          <AlertTitle>Payment failed</AlertTitle>
          <AlertDescription>Check your card details and try again.</AlertDescription>
        </Alert>
        <HStack gap="md">
          <Skeleton width={48} height={48} radius="full" />
          <Stack gap="sm" style={{ flex: 1 }}>
            <Skeleton width="60%" />
            <Skeleton width="90%" />
          </Stack>
        </HStack>
      </VStack>
    </VStack>
  );
};
