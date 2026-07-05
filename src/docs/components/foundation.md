# Foundation Components

Foundation components are the building blocks of the design system. These essential UI elements provide core functionality and are used throughout applications for user interaction, content organization, and visual feedback.

## Table of Contents

- [Button](#button)
- [Card](#card)
- [Input](#input)
- [Label](#label)
- [Textarea](#textarea)
- [Badge](#badge)
- [Spinner](#spinner)
- [ButtonGroup](#buttongroup)
- [CloseButton](#closebutton)

---

## Button

Interactive button component with multiple visual variants, sizes, and states. Wraps bits-ui.Button.Root with custom styling and theming.

### When to Use

- Primary actions (submit forms, confirm operations)
- Secondary actions (cancel, go back)
- Destructive actions (delete, remove)
- Navigation links (when href is provided)
- Icon-only buttons (with icon prop)

### Installation

```svelte
<script>
	import { Button, ButtonVariant, ComponentSize } from 'requify-design-system';
</script>
```

### Props API

| Prop        | Type                                                                                         | Default     | Description                                            |
| ----------- | -------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------ |
| `variant`   | `ButtonVariant \| 'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger' \| 'success'` | `'primary'` | Visual style variant                                   |
| `size`      | `ComponentSize \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                      | `'md'`      | Button size affecting padding and text size            |
| `fullWidth` | `boolean`                                                                                    | `false`     | If true, button takes full width of container          |
| `loading`   | `boolean`                                                                                    | `false`     | If true, shows loading spinner and disables button     |
| `disabled`  | `boolean`                                                                                    | `false`     | If true, button is disabled                            |
| `icon`      | `Snippet`                                                                                    | -           | Icon slot for leading icon                             |
| `children`  | `Snippet`                                                                                    | -           | Main button content                                    |
| `class`     | `string`                                                                                     | -           | Additional CSS classes to apply                        |
| `href`      | `string`                                                                                     | -           | If provided, renders as anchor tag with href attribute |
| `type`      | `'button' \| 'submit' \| 'reset'`                                                            | `'button'`  | HTML button type                                       |
| `onclick`   | `(e: MouseEvent) => void`                                                                    | -           | Click event handler                                    |

### Examples

#### Basic Usage

```svelte
<Button variant={ButtonVariant.PRIMARY}>Click me</Button>
<Button variant={ButtonVariant.SECONDARY}>Cancel</Button>
<Button variant={ButtonVariant.OUTLINE}>Learn More</Button>
```

#### All Variants

```svelte
<Button variant={ButtonVariant.PRIMARY}>Primary</Button>
<Button variant={ButtonVariant.SECONDARY}>Secondary</Button>
<Button variant={ButtonVariant.OUTLINE}>Outline</Button>
<Button variant={ButtonVariant.GHOST}>Ghost</Button>
<Button variant={ButtonVariant.DANGER}>Danger</Button>
<Button variant={ButtonVariant.SUCCESS}>Success</Button>
```

#### All Sizes

```svelte
<Button size={ComponentSize.XS}>Extra Small</Button>
<Button size={ComponentSize.SM}>Small</Button>
<Button size={ComponentSize.MD}>Medium</Button>
<Button size={ComponentSize.LG}>Large</Button>
<Button size={ComponentSize.XL}>Extra Large</Button>
```

#### With Icons

```svelte
<Button icon>
	{#snippet icon()}
		<Search class="h-4 w-4" />
	{/snippet}
	Search
</Button>

<Button icon variant={ButtonVariant.DANGER}>
	{#snippet icon()}
		<Trash class="h-4 w-4" />
	{/snippet}
	Delete
</Button>
```

#### Loading State

```svelte
<Button variant={ButtonVariant.PRIMARY} loading={true}>Loading...</Button>

<Button loading={true}>
	{#snippet icon()}
		<Save class="h-4 w-4" />
	{/snippet}
	Saving...
</Button>
```

#### Disabled State

```svelte
<Button disabled>Disabled Button</Button>
<Button variant={ButtonVariant.PRIMARY} disabled>Cannot Submit</Button>
```

#### Full Width

```svelte
<Button fullWidth>Full Width Button</Button>
<ButtonGroup class="w-full">
	<Button fullWidth>Previous</Button>
	<Button fullWidth variant={ButtonVariant.PRIMARY}>Next</Button>
</ButtonGroup>
```

#### As Link

```svelte
<Button href="/dashboard">Go to Dashboard</Button>
<Button href="https://example.com" target="_blank">External Link</Button>
```

#### Form Submit

```svelte
<form onsubmit={handleSubmit}>
	<Input placeholder="Email" />
	<Button type="submit" variant={ButtonVariant.PRIMARY}>Submit</Button>
</form>
```

### Accessibility

- **Keyboard Navigation**: Enter and Space to activate
- **ARIA**: Supports all button ARIA attributes
- **Focus**: Visible focus ring indicator
- **Screen Reader**: Proper button role announced

---

## Card

Container component with multiple visual variants for content grouping. Can render as link when href provided.

### When to Use

- Grouping related content sections
- Creating clickable cards for navigation
- Displaying dashboard widgets
- Form containers with consistent styling
- Product cards in e-commerce

### Installation

```svelte
<script>
	import { Card } from 'requify-design-system';
</script>
```

### Props API

| Prop        | Type                                                         | Default     | Description                                                    |
| ----------- | ------------------------------------------------------------ | ----------- | -------------------------------------------------------------- |
| `variant`   | `'default' \| 'bordered' \| 'elevated' \| 'flat' \| 'glass'` | `'default'` | Visual style variant                                           |
| `padding`   | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                     | `'md'`      | Padding size                                                   |
| `hoverable` | `boolean`                                                    | `false`     | If true or href provided, adds hover lift effect               |
| `href`      | `string`                                                     | -           | If provided, renders as anchor tag with href and link behavior |
| `children`  | `Snippet`                                                    | -           | Card content                                                   |
| `class`     | `string`                                                     | -           | Additional CSS classes to apply                                |

### Examples

#### Basic Card

```svelte
<Card>
	<h3>Card Title</h3>
	<p>Card content goes here</p>
</Card>
```

#### All Variants

```svelte
<Card variant="default">Default Card</Card>
<Card variant="bordered">Bordered Card</Card>
<Card variant="elevated">Elevated Card</Card>
<Card variant="flat">Flat Card</Card>
```

#### All Sizes

```svelte
<Card padding="sm">Small padding</Card>
<Card padding="md">Medium padding</Card>
<Card padding="lg">Large padding</Card>
<Card padding="xl">Extra large padding</Card>
<Card padding="none">No padding</Card>
```

#### Clickable Card

```svelte
<Card variant="elevated" hoverable href="/details">
	<h3>Clickable Card</h3>
	<p>Click to view details</p>
</Card>
```

#### Glass Morphism

```svelte
<Card variant="glass" padding="lg">
	<h3>Glass Card</h3>
	<p>Modern glass effect with backdrop blur</p>
</Card>
```

#### With Button

```svelte
<Card>
	<h3>Feature Card</h3>
	<p class="mb-4 text-sm text-gray-600">Description of the feature</p>
	<Button variant={ButtonVariant.PRIMARY}>Learn More</Button>
</Card>
```

#### Product Card

```svelte
<Card variant="elevated" hoverable>
	<img src="/product.jpg" alt="Product" class="mb-4 rounded-lg" />
	<h4>Product Name</h4>
	<p class="text-primary-600 text-lg font-bold">$99.99</p>
</Card>
```

#### Form Container

```svelte
<Card>
	<h3 class="mb-4 text-xl font-bold">Contact Form</h3>
	<form>
		<Label for="name">Name</Label>
		<Input id="name" placeholder="Your name" />
		<Button variant={ButtonVariant.PRIMARY} class="mt-4">Submit</Button>
	</form>
</Card>
```

### Accessibility

- When href is provided, renders as semantic link with proper ARIA
- Keyboard focusable with hover effect
- Visible focus indicator

---

## Input

Text input with error states, icon slots, and clearable functionality. Extends HTML input attributes for full compatibility.

### When to Use

- Single-line text input (names, emails, passwords)
- Search fields (use Search component instead)
- Numeric input (with type="number")
- Date/time input (use Datepicker component instead)

### Installation

```svelte
<script>
	import { Input, ComponentSize } from 'requify-design-system';
</script>
```

### Props API

| Prop        | Type                                                    | Default | Description                                                  |
| ----------- | ------------------------------------------------------- | ------- | ------------------------------------------------------------ |
| `size`      | `ComponentSize \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`  | Input size affecting height and padding                      |
| `error`     | `string`                                                | -       | Error message to display below input. Triggers error styling |
| `clearable` | `boolean`                                               | `false` | If true, shows X button to clear value when not empty        |
| `left`      | `Snippet`                                               | -       | Left icon slot (displayed before input text)                 |
| `right`     | `Snippet`                                               | -       | Right icon slot (displayed after input text)                 |
| `class`     | `string`                                                | -       | Additional CSS classes to apply                              |
| `value`     | `string`                                                | -       | Input value (bindable)                                       |
| `disabled`  | `boolean`                                               | `false` | Disables input                                               |
| `id`        | `string`                                                | -       | HTML id for label association                                |

### Examples

#### Basic Usage

```svelte
<Label for="name">Name</Label>
<Input id="name" placeholder="Enter your name" bind:value={name} />
```

#### All Sizes

```svelte
<Input size={ComponentSize.XS} placeholder="Extra small" />
<Input size={ComponentSize.SM} placeholder="Small" />
<Input size={ComponentSize.MD} placeholder="Medium" />
<Input size={ComponentSize.LG} placeholder="Large" />
<Input size={ComponentSize.XL} placeholder="Extra large" />
```

#### With Left Icon

```svelte
<Input placeholder="Search...">
	{#snippet left()}
		<Search class="h-4 w-4" />
	{/snippet}
</Input>
```

#### With Error State

```svelte
<Label for="email">Email</Label>
<Input id="email" error="Please enter a valid email address" bind:value={email} />
```

#### Clearable Input

```svelte
<Input clearable placeholder="Type something..." bind:value={search} />
```

#### Disabled

```svelte
<Input disabled value="Cannot edit this" />
```

#### With Right Icon

```svelte
<Input type="password">
	{#snippet right()}
		<Eye class="h-4 w-4" />
	{/snippet}
</Input>
```

#### Form Group

```svelte
<div class="space-y-4">
	<div>
		<Label for="firstName">First Name</Label>
		<Input id="firstName" bind:value={firstName} />
	</div>
	<div>
		<Label for="lastName">Last Name</Label>
		<Input id="lastName" bind:value={lastName} />
	</div>
</div>
```

#### Numeric Input

```svelte
<Label for="age">Age</Label>
<Input id="age" type="number" bind:value={age} />
```

### Accessibility

- Requires Label with matching for/id for proper screen reader support
- Error state announced to screen readers via aria-describedby
- Keyboard navigation: Enter, Escape
- Clearable button has proper aria-label
- Visible focus ring for keyboard navigation

---

## Label

Form label component with required field indicator. Wraps bits-ui.Label.Root for accessibility and proper label-input association.

### When to Use

- All form inputs (Input, Textarea, Select, Checkbox, Switch, Radio)
- Required field indicators
- Form field descriptions

### Installation

```svelte
<script>
	import { Label } from 'requify-design-system';
</script>
```

### Props API

| Prop       | Type      | Default | Description                                  |
| ---------- | --------- | ------- | -------------------------------------------- |
| `for`      | `string`  | -       | id of the associated input                   |
| `required` | `boolean` | `false` | If true, shows red asterisk (\*) after label |
| `children` | `Snippet` | -       | Label text and content                       |
| `class`    | `string`  | -       | Additional CSS classes to apply              |

### Examples

#### Basic Label

```svelte
<Label for="email">Email</Label>
<Input id="email" bind:value={email} />
```

#### Required Field

```svelte
<Label for="name" required>Name</Label>
<Input id="name" bind:value={name} />
```

#### With Custom Content

```svelte
<Label for="description">
	Description
	<span class="text-xs text-gray-400">(optional)</span>
</Label>
<Textarea id="description" bind:value={description} />
```

#### With Helper Text

```svelte
<Label for="password">Password</Label>
<Input id="password" type="password" />
<Helper>Must be at least 8 characters</Helper>
```

### Accessibility

- Proper label association via for/id attributes
- Required indicator announced to screen readers
- Automatic keyboard focus to associated input
- Wraps bits-ui.Label for ARIA support

---

## Textarea

Multi-line text input with error state support. Extends HTML textarea attributes for full compatibility.

### When to Use

- Multi-line text input (comments, descriptions)
- Long form content (articles, notes)
- Address input
- Message input

### Installation

```svelte
<script>
	import { Textarea } from 'requify-design-system';
</script>
```

### Props API

| Prop       | Type      | Default | Description                                                     |
| ---------- | --------- | ------- | --------------------------------------------------------------- |
| `error`    | `string`  | -       | Error message to display below textarea. Triggers error styling |
| `class`    | `string`  | -       | Additional CSS classes to apply                                 |
| `disabled` | `boolean` | `false` | Disables textarea                                               |
| `value`    | `string`  | -       | Textarea value (bindable)                                       |
| `rows`     | `number`  | `4`     | Number of visible rows                                          |

### Examples

#### Basic Textarea

```svelte
<Label for="message">Message</Label>
<Textarea id="message" placeholder="Enter your message..." bind:value={message} />
```

#### With Error State

```svelte
<Label for="description">Description</Label>
<Textarea
	id="description"
	error="Description must be at least 10 characters"
	bind:value={description} />
```

#### Custom Rows

```svelte
<Textarea rows={10} placeholder="Long form content" bind:value={article} />
```

#### Disabled

```svelte
<Textarea disabled placeholder="Disabled textarea" value="Can't edit this" />
```

#### With Character Count

```svelte
<script>
	let comment = $state('');
</script>

<Label for="comment">Comment</Label>
<Textarea id="comment" bind:value={comment} />
<Helper>{comment.length}/500 characters</Helper>
```

### Accessibility

- Requires Label with matching for/id for proper screen reader support
- Error state announced to screen readers via aria-describedby
- Resizable with drag handle (visual indicator)
- Keyboard navigation: Enter, Tab
- Visible focus ring

---

## Badge

Small status indicator with semantic colors and dismissible option. Can render as link when href provided.

### When to Use

- Status indicators (active, inactive, pending)
- Notification counts
- Feature labels (beta, new)
- Category tags
- Version indicators

### Installation

```svelte
<script>
	import { Badge, BadgeVariant, ComponentSize } from 'requify-design-system';
</script>
```

### Props API

| Prop          | Type                                                                                                   | Default     | Description                                          |
| ------------- | ------------------------------------------------------------------------------------------------------ | ----------- | ---------------------------------------------------- |
| `variant`     | `BadgeVariant \| 'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'` | Color variant for semantic meaning                   |
| `size`        | `ComponentSize \| 'xs' \| 'sm' \| 'md' \| 'lg'`                                                        | `'md'`      | Badge size affecting padding and text                |
| `dismissable` | `boolean`                                                                                              | `false`     | If true, shows X button to dismiss. Requires onclose |
| `onclose`     | `() => void`                                                                                           | -           | Callback when dismiss button is clicked              |
| `children`    | `Snippet`                                                                                              | -           | Badge text and content                               |
| `class`       | `string`                                                                                               | -           | Additional CSS classes to apply                      |
| `href`        | `string`                                                                                               | -           | If provided, renders as anchor tag with hover effect |

### Examples

#### Basic Badge

```svelte
<Badge>New</Badge>
<Badge variant={BadgeVariant.PRIMARY}>Primary</Badge>
<Badge variant={BadgeVariant.SUCCESS}>Success</Badge>
```

#### All Variants

```svelte
<Badge variant={BadgeVariant.DEFAULT}>Default</Badge>
<Badge variant={BadgeVariant.PRIMARY}>Primary</Badge>
<Badge variant={BadgeVariant.SECONDARY}>Secondary</Badge>
<Badge variant={BadgeVariant.SUCCESS}>Success</Badge>
<Badge variant={BadgeVariant.WARNING}>Warning</Badge>
<Badge variant={BadgeVariant.ERROR}>Error</Badge>
<Badge variant={BadgeVariant.INFO}>Info</Badge>
```

#### All Sizes

```svelte
<Badge size={ComponentSize.XS}>XS</Badge>
<Badge size={ComponentSize.SM}>SM</Badge>
<Badge size={ComponentSize.MD}>MD</Badge>
<Badge size={ComponentSize.LG}>LG</Badge>
```

#### Dismissible

```svelte
<Badge dismissable onclose={() => console.log('dismissed')} variant={BadgeVariant.INFO}>
	New notification
</Badge>
```

#### As Link

```svelte
<Badge href="/notifications" variant={BadgeVariant.ERROR}>3 unread messages</Badge>
```

#### With Icon

```svelte
<Badge variant={BadgeVariant.SUCCESS}>
	<Check class="mr-1 h-3 w-3" />
	Verified
</Badge>
```

#### Notification Count

```svelte
<div class="relative">
	<Button icon>
		{#snippet icon()}
			<Bell class="h-4 w-4" />
		{/snippet}
	</Button>
	<Badge size={ComponentSize.XS} variant={BadgeVariant.ERROR} class="absolute -top-1 -right-1">
		5
	</Badge>
</div>
```

#### Status Indicators

```svelte
<Badge variant={BadgeVariant.SUCCESS}>Active</Badge>
<Badge variant={BadgeVariant.WARNING}>Pending</Badge>
<Badge variant={BadgeVariant.ERROR}>Inactive</Badge>
```

### Accessibility

- Semantic colors convey meaning to all users
- Dismiss button has aria-label="Remove"
- When href provided, renders as semantic link
- Proper contrast ratios for all variants

---

## Spinner

Circular loading spinner for indicating async operations. Animated SVG with configurable size.

### When to Use

- Loading states during async operations
- Data fetching indicators
- Form submission feedback
- Page loading

### Installation

```svelte
<script>
	import { Spinner } from 'requify-design-system';
</script>
```

### Props API

| Prop    | Type                                                                                          | Default | Description                                                                                                                              |
| ------- | --------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `size`  | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '4' \| '6' \| '8' \| '10' \| '12' \| '16' \| string` | `'md'`  | Spinner size. Named sizes: 'xs' (12px), 'sm' (16px), 'md' (24px), 'lg' (32px), 'xl' (48px). Numeric sizes correspond to Tailwind spacing |
| `class` | `string`                                                                                      | -       | Additional CSS classes to apply (useful for custom colors)                                                                               |

### Examples

#### Basic Usage

```svelte
<Spinner />
```

#### All Named Sizes

```svelte
<Spinner size="xs" />
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />
```

#### Numeric Sizes

```svelte
<Spinner size="4" />
<Spinner size="6" />
<Spinner size="8" />
<Spinner size="10" />
<Spinner size="12" />
<Spinner size="16" />
```

#### Custom Size

```svelte
<Spinner size="h-8 w-8" />
```

#### Custom Color

```svelte
<Spinner class="text-primary-500" />
<Spinner class="text-secondary-500" />
<Spinner class="text-success-500" />
```

#### With Loading Text

```svelte
<div class="flex items-center gap-2">
	<Spinner />
	<span>Loading...</span>
</div>
```

#### Centered

```svelte
<div class="flex h-64 items-center justify-center">
	<Spinner size="xl" />
</div>
```

#### Overlay Loading

```svelte
<div class="relative">
	<Card>
		<p>Content</p>
	</Card>
	<div class="absolute inset-0 flex items-center justify-center bg-white/50">
		<Spinner size="lg" />
	</div>
</div>
```

### Accessibility

- aria-label="Loading" for screen readers
- Not focusable (decorative loading indicator)
- Smooth animation, respectful of prefers-reduced-motion

---

## ButtonGroup

Groups buttons together with proper spacing and visual connection. Creates cohesive button groups for related actions.

### When to Use

- Grouping related actions (edit, copy, delete)
- Pagination controls
- Toggle buttons
- Icon-only button groups
- Segmented controls

### Installation

```svelte
<script>
	import { ButtonGroup, Button } from 'requify-design-system';
</script>
```

### Props API

| Prop       | Type      | Default | Description                         |
| ---------- | --------- | ------- | ----------------------------------- |
| `children` | `Snippet` | -       | Button components to group together |
| `class`    | `string`  | -       | Additional CSS classes to apply     |

### Examples

#### Basic Button Group

```svelte
<ButtonGroup>
	<Button variant={ButtonVariant.OUTLINE}>Cancel</Button>
	<Button variant={ButtonVariant.PRIMARY}>Confirm</Button>
</ButtonGroup>
```

#### Multiple Actions

```svelte
<ButtonGroup>
	<Button variant={ButtonVariant.GHOST}>
		{#snippet icon()}
			<Edit class="h-4 w-4" />
		{/snippet}
	</Button>
	<Button variant={ButtonVariant.GHOST}>
		{#snippet icon()}
			<Copy class="h-4 w-4" />
		{/snippet}
	</Button>
	<Button variant={ButtonVariant.GHOST}>
		{#snippet icon()}
			<Trash class="h-4 w-4" />
		{/snippet}
	</Button>
</ButtonGroup>
```

#### Full Width Group

```svelte
<ButtonGroup class="w-full">
	<Button fullWidth>Previous</Button>
	<Button fullWidth variant={ButtonVariant.PRIMARY}>Next</Button>
</ButtonGroup>
```

#### With Variants

```svelte
<ButtonGroup>
	<Button variant={ButtonVariant.PRIMARY}>Save</Button>
	<Button variant={ButtonVariant.SECONDARY}>Draft</Button>
	<Button variant={ButtonVariant.OUTLINE}>Cancel</Button>
</ButtonGroup>
```

#### Icon Only

```svelte
<ButtonGroup>
	<Button icon>
		{#snippet icon()}
			<Bold class="h-4 w-4" />
		{/snippet}
	</Button>
	<Button icon>
		{#snippet icon()}
			<Italic class="h-4 w-4" />
		{/snippet}
	</Button>
	<Button icon>
		{#snippet icon()}
			<Underline class="h-4 w-4" />
		{/snippet}
	</Button>
</ButtonGroup>
```

#### With Custom Classes

```svelte
<ButtonGroup class="mt-4">
	<Button>Action 1</Button>
	<Button>Action 2</Button>
</ButtonGroup>
```

### Accessibility

- role="group" for semantic grouping
- First button gets rounded-left, last gets rounded-right
- Middle buttons have no border radius
- Focus management maintained across buttons

---

## CloseButton

Pre-styled close button (X icon) for modals, panels, and alerts. Commonly used in Modal, Alert, and Drawer components.

### When to Use

- Modal close buttons
- Alert dismiss buttons
- Panel close buttons
- Drawer close buttons
- Any close action

### Installation

```svelte
<script>
	import { CloseButton } from 'requify-design-system';
</script>
```

### Props API

| Prop    | Type     | Default | Description                     |
| ------- | -------- | ------- | ------------------------------- |
| `class` | `string` | -       | Additional CSS classes to apply |

### Examples

#### Basic Usage

```svelte
<CloseButton onclick={handleClose} />
```

#### In Modal Header

```svelte
<Modal bind:open={isOpen} title="Settings">
	<!-- Modal content -->
</Modal>
```

#### Custom Positioning

```svelte
<div class="relative">
	<Card>
		<p>Content</p>
	</Card>
	<CloseButton class="absolute top-2 right-2" onclick={handleClose} />
</div>
```

#### With Alert

```svelte
<Alert dismissible onDismiss={handleDismiss}>
	<p>This is an alert with a close button</p>
</Alert>
```

### Accessibility

- aria-label="Close" for screen readers
- type="button" to prevent form submission
- Hover state provides visual feedback
- Proper focus indicator

---

## Related Components

- [Form Components](./forms.md) - Input, Select, Checkbox, Switch, Radio
- [Feedback Components](./feedback.md) - Modal, Alert, Toast
- [Navigation Components](./navigation.md) - Dropdown, Tabs, Sidebar
