# Feedback Components

Feedback components provide user feedback through alerts, modals, toasts, and other notification mechanisms.

## Table of Contents

- [Alert](#alert)
- [Toast](#toast)
- [ToastProvider](#toastprovider)
- [Modal](#modal)
- [AlertDialog](#alertdialog)
- [Drawer](#drawer)
- [Tooltip](#tooltip)
- [Popover](#popover)

---

## Alert

Alert component with multiple variants for displaying contextual information. Supports dismissible option with animation.

### When to Use

- Success messages after form submission
- Warning messages about issues
- Error messages for validation errors
- Info messages for helpful tips
- System announcements

### Installation

```svelte
<script>
	import { Alert, StatusVariant } from 'requify-design-system';
</script>
```

### Props API

| Prop          | Type                                                           | Default  | Description                        |
| ------------- | -------------------------------------------------------------- | -------- | ---------------------------------- |
| `variant`     | `StatusVariant \| 'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Color variant                      |
| `dismissible` | `boolean`                                                      | `false`  | If true, shows X button to dismiss |
| `onDismiss`   | `() => void`                                                   | -        | Callback when alert is dismissed   |
| `icon`        | `Snippet`                                                      | -        | Custom icon snippet                |
| `children`    | `Snippet`                                                      | -        | Alert content                      |
| `class`       | `string`                                                       | -        | Additional CSS classes to apply    |

### Examples

#### Basic Usage

```svelte
<Alert>
	<p>This is an informational alert</p>
</Alert>
```

#### All Variants

```svelte
<Alert variant={StatusVariant.INFO}>
	<p>This is an info alert</p>
</Alert>

<Alert variant={StatusVariant.SUCCESS}>
	<p>Changes saved successfully!</p>
</Alert>

<Alert variant={StatusVariant.WARNING}>
	<p>This is a warning message</p>
</Alert>

<Alert variant={StatusVariant.ERROR}>
	<p>An error occurred</p>
</Alert>
```

#### Dismissible

```svelte
<Alert dismissible onDismiss={handleDismiss}>
	<p>This alert can be dismissed</p>
</Alert>
```

#### With Custom Icon

```svelte
<Alert icon>
	{#snippet icon()}
		<Rocket class="h-5 w-5" />
	{/snippet}
	<p>Custom alert with rocket icon</p>
</Alert>
```

#### Success Message

```svelte
<Alert variant={StatusVariant.SUCCESS}>
	<p>Profile updated successfully!</p>
</Alert>
```

#### Error Message

```svelte
<Alert variant={StatusVariant.ERROR} dismissible onDismiss={clearError}>
	<p>Failed to save changes. Please try again.</p>
</Alert>
```

#### Warning Message

```svelte
<Alert variant={StatusVariant.WARNING}>
	<p>Your session will expire in 5 minutes</p>
</Alert>
```

#### Rich Content

```svelte
<Alert variant={StatusVariant.INFO}>
	<h4 class="mb-1 font-semibold">New Feature Available</h4>
	<p>We've added a new feature to help you manage your projects.</p>
	<Button variant={ButtonVariant.OUTLINE} size="sm" class="mt-3">Learn More</Button>
</Alert>
```

#### With Action

```svelte
<Alert variant={StatusVariant.WARNING} dismissible>
	<div class="flex items-start gap-3">
		<div class="flex-1">
			<p class="font-medium">Unsaved changes</p>
			<p class="text-sm">You have unsaved changes. Save before leaving?</p>
		</div>
		<div class="flex gap-2">
			<Button variant={ButtonVariant.OUTLINE} size="sm">Discard</Button>
			<Button variant={ButtonVariant.PRIMARY} size="sm">Save</Button>
		</div>
	</div>
</Alert>
```

### Accessibility

- role="alert" for screen readers
- Semantic colors convey meaning
- Dismiss button has aria-label
- High contrast colors for all variants

---

## Toast

Toast notification component with multiple variants and dismissible option. Supports auto-dismiss, custom content, and fly-in animation.

### When to Use

- Success notifications (action completed)
- Error notifications (action failed)
- Warning notifications (attention needed)
- Info notifications (updates, tips)
- Non-intrusive feedback

### Installation

```svelte
<script>
	import { Toast, StatusVariant } from 'requify-design-system';
</script>
```

### Props API

| Prop          | Type                   | Default  | Description                                                       |
| ------------- | ---------------------- | -------- | ----------------------------------------------------------------- |
| `toast`       | `ToastData`            | -        | Toast data object containing id, variant, and message             |
| `onDismiss`   | `(id: string) => void` | -        | Callback when toast is dismissed via close button                 |
| `dismissable` | `boolean`              | `false`  | If true, shows dismiss button. Auto-detected from toast/onDismiss |
| `onclose`     | `() => void`           | -        | Callback when toast is closed or dismissed                        |
| `color`       | `StatusVariant`        | `'info'` | Color variant (alternative to toast.variant)                      |
| `children`    | `Snippet`              | -        | Custom toast content (overrides toast.message)                    |
| `class`       | `string`               | -        | Additional CSS classes to apply                                   |

#### ToastData Interface

| Property  | Type            | Description             |
| --------- | --------------- | ----------------------- |
| `id`      | `string`        | Unique toast identifier |
| `variant` | `StatusVariant` | Toast variant           |
| `message` | `string`        | Toast message text      |

### Examples

#### Basic Usage

```svelte
<Toast color={StatusVariant.SUCCESS}>Changes saved successfully!</Toast>
```

Note: there is no top-level `variant`/`message` prop — use `color` for the color variant, and pass the message as `children` (or via the `toast` data object, shown below).

#### All Variants

```svelte
<Toast color={StatusVariant.INFO}>New message received</Toast>
<Toast color={StatusVariant.SUCCESS}>Success!</Toast>
<Toast color={StatusVariant.WARNING}>Warning message</Toast>
<Toast color={StatusVariant.ERROR}>Error occurred</Toast>
```

#### Dismissible

```svelte
<Toast color={StatusVariant.ERROR} dismissable onclose={() => console.log('dismissed')}>
	Failed to save changes
</Toast>
```

#### With Custom Content

```svelte
<Toast dismissable onclose={() => console.log('closed')}>
	{#snippet children()}
		<div>
			<p class="font-bold">Custom Notification</p>
			<p class="text-sm">With custom content</p>
		</div>
	{/snippet}
</Toast>
```

#### With Toast Data Object

```svelte
<script>
	const myToastData = {
		id: 'toast-1',
		variant: StatusVariant.SUCCESS,
		message: 'Item added to cart'
	};
</script>

<Toast toast={myToastData} onDismiss={(id) => removeToast(id)} />
```

#### Warning Variant

```svelte
<Toast color={StatusVariant.WARNING}>This is a warning</Toast>
```

#### Multiple Toasts

```svelte
<script>
	let toasts = $state([
		{ id: '1', variant: 'success', message: 'Saved!' },
		{ id: '2', variant: 'info', message: 'New message' }
	]);

	function removeToast(id: string) {
		toasts = toasts.filter((t) => t.id !== id);
	}
</script>

<div class="space-y-2">
	{#each toasts as toast}
		<Toast {toast} onDismiss={removeToast} />
	{/each}
</div>
```

### Accessibility

- ARIA: role="alert" and aria-live="polite" for screen readers
- Keyboard: Dismiss button is keyboard accessible
- Dismiss button has proper aria-label
- Fly-in animation respects prefers-reduced-motion
- High contrast colors for all variants

---

## ToastProvider

Provider component for toast state management. Wraps multiple Toast components and manages their positioning.

### When to Use

- Managing multiple toasts in an application
- Centralized toast state
- Toast queue management
- Consistent toast positioning

### Installation

```svelte
<script>
	import { ToastProvider, Toast, StatusVariant } from 'requify-design-system';
</script>
```

### Props API

| Prop        | Type                                                                                              | Default       | Description                                       |
| ----------- | ------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------- |
| `children`  | `Snippet`                                                                                         | -             | App content, rendered below the toast container   |
| `toasts`    | `ToastData[]`                                                                                     | `[]`          | Array of toast data objects                       |
| `position`  | `'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'top-right'` | Toast position on screen                          |
| `onDismiss` | `(id: string) => void`                                                                            | -             | Callback when a toast's dismiss button is clicked |

Note: there is no `class` prop, and no built-in auto-dismiss/`duration` — the caller manages the `toasts` array (e.g. remove entries via `setTimeout`).

### Examples

#### Basic Provider

```svelte
<script>
	let toasts = $state([]);

	function addToast(message: string, variant: StatusVariant) {
		toasts = [...toasts, { id: Date.now().toString(), message, variant }];
	}

	function removeToast(id: string) {
		toasts = toasts.filter((t) => t.id !== id);
	}
</script>

<Button onclick={() => addToast('Success!', StatusVariant.SUCCESS)}>Add Toast</Button>

<ToastProvider {toasts} onDismiss={removeToast} />
```

#### Custom Position

```svelte
<ToastProvider {toasts} position="top-center" onDismiss={removeToast} />
```

---

## Modal

Modal dialog component for displaying content in an overlay. Supports multiple sizes, forms, and custom content.

### When to Use

- Form dialogs (settings, confirmations)
- Detailed content views
- Image/video galleries
- Confirmations and alerts (use AlertDialog instead)
- Complex forms

### Installation

```svelte
<script>
	import { Modal, ModalSize } from 'requify-design-system';
</script>
```

### Props API

| Prop           | Type                                                  | Default | Description                           |
| -------------- | ----------------------------------------------------- | ------- | ------------------------------------- |
| `open`         | `boolean`                                             | `false` | Modal open state (bindable)           |
| `size`         | `ModalSize \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'`  | Modal size                            |
| `dismissible`  | `boolean`                                             | `true`  | Whether the modal can be dismissed    |
| `title`        | `string`                                              | -       | Modal title                           |
| `description`  | `string`                                              | -       | Modal description                     |
| `children`     | `Snippet`                                             | -       | Main content snippet                  |
| `footer`       | `Snippet`                                             | -       | Footer content snippet                |
| `header`       | `Snippet`                                             | -       | Header content snippet                |
| `onClose`      | `() => void`                                          | -       | Callback when modal closes            |
| `onsubmit`     | `(event: SubmitEvent) => void`                        | -       | Form submit handler                   |
| `form`         | `boolean`                                             | `false` | Whether to render as a form           |
| `class`        | `string`                                              | -       | Additional CSS classes to apply       |
| `outsideclose` | `boolean`                                             | `true`  | Whether clicking outside closes modal |

### Examples

#### Basic Usage

```svelte
<script>
	let isOpen = $state(false);
</script>

<Button onclick={() => (isOpen = true)}>Open Modal</Button>

<Modal bind:open={isOpen} title="Welcome">
	<p>This is a modal dialog</p>
</Modal>
```

#### All Sizes

```svelte
<Modal bind:open={isOpen1} size={ModalSize.SM} title="Small">
	<p>Small modal</p>
</Modal>

<Modal bind:open={isOpen2} size={ModalSize.MD} title="Medium">
	<p>Medium modal</p>
</Modal>

<Modal bind:open={isOpen3} size={ModalSize.LG} title="Large">
	<p>Large modal</p>
</Modal>

<Modal bind:open={isOpen4} size={ModalSize.XL} title="Extra Large">
	<p>Extra large modal</p>
</Modal>

<Modal bind:open={isOpen5} size={ModalSize.FULL} title="Full">
	<p>Full width modal</p>
</Modal>
```

#### With Footer

```svelte
<Modal bind:open={isOpen} title="Confirm Action" footer>
	{#snippet footer()}
		<Button variant={ButtonVariant.OUTLINE} onclick={() => (isOpen = false)}>Cancel</Button>
		<Button variant={ButtonVariant.PRIMARY} onclick={confirmAction}>Confirm</Button>
	{/snippet}

	<p>Are you sure you want to proceed?</p>
</Modal>
```

#### With Form

```svelte
<Modal bind:open={isOpen} title="Edit Profile" form onsubmit={handleSave}>
	<div class="space-y-4">
		<div>
			<Label for="name">Name</Label>
			<Input id="name" bind:value={name} />
		</div>
		<div>
			<Label for="email">Email</Label>
			<Input id="email" bind:value={email} />
		</div>
	</div>
</Modal>
```

#### With Custom Header

```svelte
<Modal bind:open={isOpen}>
	{#snippet header()}
		<div class="flex items-center gap-3">
			<div class="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
			<div>
				<h3 class="font-semibold">User Profile</h3>
				<p class="text-sm text-gray-600">Edit your details</p>
			</div>
		</div>
	{/snippet}

	<p>Modal content here</p>
</Modal>
```

#### Non-dismissible

```svelte
<Modal bind:open={isOpen} title="Processing" dismissible={false}>
	<div class="py-8 text-center">
		<Spinner size="xl" />
		<p class="mt-4">Please wait...</p>
	</div>
</Modal>
```

#### With Description

```svelte
<Modal bind:open={isOpen} title="Delete Account" description="This action cannot be undone" footer>
	{#snippet footer()}
		<Button variant={ButtonVariant.OUTLINE} onclick={() => (isOpen = false)}>Cancel</Button>
		<Button variant={ButtonVariant.DANGER} onclick={deleteAccount}>Delete</Button>
	{/snippet}

	<p>Are you sure you want to delete your account?</p>
</Modal>
```

#### Rich Content

```svelte
<Modal bind:open={isOpen} title="Product Details">
	<div class="space-y-4">
		<img src="/product.jpg" alt="Product" class="rounded-lg" />
		<h3 class="text-xl font-bold">Product Name</h3>
		<p class="text-gray-600">
			Product description goes here with all the details about the product.
		</p>
		<div class="flex items-center gap-2">
			<Badge variant="success">In Stock</Badge>
			<Badge>Free Shipping</Badge>
		</div>
	</div>
	<Button variant={ButtonVariant.PRIMARY} onclick={addToCart}>Add to Cart - $99.99</Button>
</Modal>
```

#### OnClose Handler

```svelte
<script>
	function handleClose() {
		// Clean up or save state
		console.log('Modal closed');
	}
</script>

<Modal bind:open={isOpen} title="Settings" onClose={handleClose}>
	<p>Settings content</p>
</Modal>
```

### Accessibility

- Keyboard: Escape to close, Tab/Shift+Tab for focus management
- Focus trap: Managed by bits-ui Dialog primitive
- ARIA: Proper role and attributes managed by bits-ui
- Backdrop click closes modal (when outsideclose is true)
- Animation respects prefers-reduced-motion

---

## AlertDialog

Alert dialog for critical confirmations, built directly on bits-ui's native `AlertDialog` primitive (not a wrapper around Modal/Dialog). Provides built-in confirm/cancel buttons.

### When to Use

- Confirmations (delete, discard changes)
- Critical alerts
- Warning dialogs
- Destructive action confirmations

### Installation

```svelte
<script>
	import { AlertDialog, StatusVariant } from 'requify-design-system';
</script>
```

### Props API

| Prop          | Type            | Default     | Description                                                     |
| ------------- | --------------- | ----------- | --------------------------------------------------------------- |
| `open`        | `boolean`       | `false`     | Alert open state (bindable)                                     |
| `title`       | `string`        | -           | Alert title                                                     |
| `description` | `string`        | -           | Alert description                                               |
| `confirmText` | `string`        | `'Confirm'` | Confirm button text                                             |
| `cancelText`  | `string`        | `'Cancel'`  | Cancel button text                                              |
| `onConfirm`   | `() => void`    | -           | Callback when confirmed                                         |
| `onCancel`    | `() => void`    | -           | Callback when cancelled (also fires on Escape)                  |
| `variant`     | `StatusVariant` | `'info'`    | Icon/color variant: 'info' \| 'success' \| 'warning' \| 'error' |
| `children`    | `Snippet`       | -           | Custom content between description and actions                  |

### Examples

#### Basic Usage

```svelte
<script>
	let isOpen = $state(false);
</script>

<Button onclick={() => (isOpen = true)}>Delete Item</Button>

<AlertDialog
	bind:open={isOpen}
	title="Delete Item"
	description="This action cannot be undone"
	onConfirm={deleteItem} />
```

#### Error Variant

```svelte
<AlertDialog
	bind:open={isOpen}
	title="Delete Account"
	description="This will permanently delete your account"
	confirmText="Delete"
	variant={StatusVariant.ERROR}
	onConfirm={deleteAccount} />
```

#### Warning Variant

```svelte
<AlertDialog
	bind:open={isOpen}
	title="Unsaved Changes"
	description="You have unsaved changes. Continue?"
	confirmText="Continue"
	variant={StatusVariant.WARNING}
	onConfirm={handleContinue} />
```

#### Custom Button Text

```svelte
<AlertDialog
	bind:open={isOpen}
	title="Leave Page"
	description="Changes will be lost"
	confirmText="Leave"
	cancelText="Stay"
	onConfirm={leave} />
```

### Accessibility

- `role="alertdialog"` from bits-ui's native AlertDialog primitive (not Dialog)
- Escape triggers Cancel (calls `onCancel` and closes) rather than a silent dismiss
- Clicking outside does not dismiss the dialog by default
- Focus management with proper tab order

---

## Drawer

Slide-out drawer/sheet component from any edge of viewport. Wraps bits-ui Dialog with placement-specific animations.

### When to Use

- Side panels (filters, navigation)
- Mobile menus
- Off-canvas content
- Detail panels
- Settings drawers

### Installation

```svelte
<script>
	import { Drawer } from 'requify-design-system';
</script>
```

### Props API

| Prop               | Type                                     | Default  | Description                      |
| ------------------ | ---------------------------------------- | -------- | -------------------------------- |
| `children`         | `Snippet`                                | -        | Drawer content                   |
| `open`             | `boolean`                                | `false`  | Controls drawer visibility       |
| `placement`        | `'left' \| 'right' \| 'top' \| 'bottom'` | `'left'` | Which edge to slide from         |
| `backdrop`         | `boolean`                                | `true`   | If true, shows backdrop overlay  |
| `class`            | `string`                                 | -        | Additional CSS classes to apply  |
| `transitionParams` | `Partial<FlyParams>`                     | -        | Custom fly transition parameters |

### Examples

#### Left Sidebar Drawer

```svelte
<script>
	let showDrawer = $state(false);
</script>

<Button onclick={() => (showDrawer = true)}>Open Menu</Button>

<Drawer bind:open={showDrawer} placement="left">
	<h2>Settings</h2>
	<div class="mt-4 space-y-2">
		<SidebarItem href="/profile">Profile</SidebarItem>
		<SidebarItem href="/account">Account</SidebarItem>
	</div>
</Drawer>
```

#### Right Drawer with Backdrop

```svelte
<Drawer bind:open={showDrawer} placement="right" backdrop>
	<Button onclick={() => (showDrawer = false)}>Close</Button>
	<p>Right drawer content</p>
</Drawer>
```

#### Bottom Sheet (Mobile Style)

```svelte
<Drawer bind:open={showSheet} placement="bottom">
	<h3>Select Option</h3>
	<div class="mt-4 space-y-2">
		<Button variant={ButtonVariant.OUTLINE} onclick={() => selectOption(1)}>Option 1</Button>
		<Button variant={ButtonVariant.OUTLINE} onclick={() => selectOption(2)}>Option 2</Button>
	</div>
</Drawer>
```

#### Without Backdrop

```svelte
<Drawer bind:open={showDrawer} placement="right" backdrop={false}>
	<p>Drawer without backdrop</p>
</Drawer>
```

#### Custom Transition

```svelte
<Drawer bind:open={showDrawer} placement="left" transitionParams={{ duration: 400 }}>
	<p>Slow fade drawer</p>
</Drawer>
```

#### Top Drawer

```svelte
<Drawer bind:open={showDrawer} placement="top">
	<div class="p-4">
		<h3>Top Notification</h3>
		<p>Important message</p>
		<Button onclick={() => (showDrawer = false)}>Dismiss</Button>
	</div>
</Drawer>
```

#### With Content

```svelte
<Drawer bind:open={showDrawer} placement="right">
	<div class="space-y-6">
		<div>
			<h3 class="font-semibold">Filters</h3>
			<p class="text-sm text-gray-600">Refine your search</p>
		</div>

		<div class="space-y-3">
			<Label>Category</Label>
			<Select options={categories} />
		</div>

		<div class="space-y-3">
			<Label>Price Range</Label>
			<Input type="number" placeholder="Min" />
			<Input type="number" placeholder="Max" />
		</div>

		<Button variant={ButtonVariant.PRIMARY} onclick={applyFilters}>Apply Filters</Button>
	</div>
</Drawer>
```

### Accessibility

- Keyboard: Escape to close, Tab/Shift+Tab for focus management
- Focus trap: Managed by bits-ui Dialog primitive
- ARIA: Proper role and attributes managed by bits-ui
- Backdrop click closes drawer
- Animation respects prefers-reduced-motion

---

## Tooltip

Tooltip component for displaying contextual information on hover/focus. Wraps bits-ui Tooltip with scale animation.

### When to Use

- Providing additional context (button actions)
- Displaying shortcuts
- Showing help text
- Clarifying abbreviations
- Form field hints

### Installation

```svelte
<script>
	import { Tooltip } from 'requify-design-system';
</script>
```

### Props API

| Prop                      | Type                                     | Default     | Description                                       |
| ------------------------- | ---------------------------------------- | ----------- | ------------------------------------------------- |
| `content`                 | `string \| Snippet`                      | -           | Tooltip text or custom content snippet            |
| `children`                | `Snippet`                                | -           | Trigger element that shows tooltip on hover/focus |
| `side`                    | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'`     | Tooltip placement side relative to trigger        |
| `align`                   | `'start' \| 'center' \| 'end'`           | `'center'`  | Tooltip alignment along of side                   |
| `delayDuration`           | `number`                                 | `200`       | Delay in ms before tooltip appears                |
| `disableHoverableContent` | `boolean`                                | `undefined` | If true, tooltip closes when leaving trigger      |
| `class`                   | `string`                                 | -           | Additional CSS classes to apply                   |

### Examples

#### Basic Tooltip

```svelte
<Tooltip content="This is a tooltip">
	<Button>Hover me</Button>
</Tooltip>
```

#### With Custom Placement

```svelte
<Tooltip content="Tooltip on right" side="right">
	<Button>Hover me</Button>
</Tooltip>
```

#### With Custom Alignment

```svelte
<Tooltip content="Start aligned" side="bottom" align="start">
	<Button>Hover me</Button>
</Tooltip>
```

#### With Custom Content

```svelte
<Tooltip>
	{#snippet content()}
		<div>
			<p class="font-bold">Custom Tooltip</p>
			<p class="text-sm">Rich content</p>
		</div>
	{/snippet}
	<Button>Hover me</Button>
</Tooltip>
```

#### No Delay

```svelte
<Tooltip content="Instant tooltip" delayDuration={0}>
	<Button>Hover me</Button>
</Tooltip>
```

#### With Hoverable Content

```svelte
<Tooltip content="Click to dismiss" disableHoverableContent={false}>
	<Button>Hover me</Button>
</Tooltip>
```

#### All Sides

```svelte
<Tooltip content="Top" side="top">
	<Button>Top</Button>
</Tooltip>

<Tooltip content="Right" side="right">
	<Button>Right</Button>
</Tooltip>

<Tooltip content="Bottom" side="bottom">
	<Button>Bottom</Button>
</Tooltip>

<Tooltip content="Left" side="left">
	<Button>Left</Button>
</Tooltip>
```

#### With Icon Button

```svelte
<Tooltip content="Delete item">
	<Button variant={ButtonVariant.GHOST} icon>
		{#snippet icon()}
			<Trash class="h-4 w-4" />
		{/snippet}
	</Button>
</Tooltip>
```

#### Keyboard Shortcut Hint

```svelte
<Tooltip>
	{#snippet content()}
		<div>
			<p>Save changes</p>
			<p class="text-xs text-gray-500">Ctrl + S</p>
		</div>
	{/snippet}
	<Button icon>
		{#snippet icon()}
			<Save class="h-4 w-4" />
		{/snippet}
	</Button>
</Tooltip>
```

### Accessibility

- Keyboard: Focus/blur shows/hides tooltip
- ARIA: Proper role and aria-describedby managed by bits-ui
- Screen reader: Tooltip content announced on focus
- Scale animation respects prefers-reduced-motion
- High contrast for text readability

---

## Popover

Popover component for displaying rich, interactive content on demand. Wraps bits-ui Popover with scale animation.

### When to Use

- Interactive content (forms, lists)
- Filter panels
- Rich content (images, actions)
- Context menus with complex content
- Tooltips with interactive elements

### Installation

```svelte
<script>
	import { Popover } from 'requify-design-system';
</script>
```

### Props API

| Prop       | Type                                     | Default    | Description                                                                                                 |
| ---------- | ---------------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------- |
| `open`     | `boolean`                                | `false`    | Controls popover visibility                                                                                 |
| `trigger`  | `Snippet<[{ props }]>`                   | -          | Trigger content. Spread the given `props` onto your own trigger element for correct keyboard/ARIA behavior. |
| `children` | `Snippet`                                | -          | Popover content                                                                                             |
| `align`    | `'start' \| 'center' \| 'end'`           | `'start'`  | Popover alignment along of side                                                                             |
| `side`     | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` | Popover placement side relative to trigger                                                                  |
| `class`    | `string`                                 | -          | Additional CSS classes to apply                                                                             |

### Examples

#### Basic Popover

```svelte
<script>
	let showPopover = $state(false);
</script>

<Popover bind:open={showPopover}>
	{#snippet trigger({ props })}
		<Button {...props}>Click to open</Button>
	{/snippet}
	<div>
		<h3>Popover Title</h3>
		<p>Popover content</p>
	</div>
</Popover>
```

#### With Custom Alignment

```svelte
<Popover bind:open={showPopover} align="center" side="top">
	{#snippet trigger({ props })}
		<Button {...props}>Open Popover</Button>
	{/snippet}
	<p>Centered content</p>
</Popover>
```

#### With Form Content

```svelte
<Popover bind:open={showPopover}>
	{#snippet trigger({ props })}
		<Button {...props}>Filter</Button>
	{/snippet}
	<form onsubmit={handleFilter} class="space-y-3">
		<Label>Filter by...</Label>
		<Input placeholder="Search" />
		<Button type="submit" variant={ButtonVariant.PRIMARY}>Apply</Button>
	</form>
</Popover>
```

#### Right Placement

```svelte
<Popover bind:open={showPopover} side="right">
	{#snippet trigger({ props })}
		<Button {...props}>Open Right</Button>
	{/snippet}
	<p>Content on right side</p>
</Popover>
```

#### Without Trigger (Manual Open)

```svelte
<Button onclick={() => (showPopover = !showPopover)}>Toggle</Button>

<Popover bind:open={showPopover}>
	<p>Manually controlled popover</p>
</Popover>
```

#### With Actions

```svelte
<Popover bind:open={showPopover}>
	{#snippet trigger({ props })}
		<Button icon {...props}>
			{#snippet icon()}
				<MoreHorizontal class="h-4 w-4" />
			{/snippet}
		</Button>
	{/snippet}
	<div class="space-y-2">
		<Button variant={ButtonVariant.GHOST} onclick={edit}>Edit</Button>
		<Button variant={ButtonVariant.GHOST} onclick={duplicate}>Duplicate</Button>
		<Button variant={ButtonVariant.GHOST} onclick={share}>Share</Button>
	</div>
</Popover>
```

#### Rich Content

```svelte
<Popover bind:open={showPopover}>
	{#snippet trigger({ props })}
		<button {...props}>
			<Img src="/avatar.jpg" alt="User" class="h-10 w-10 rounded-full object-cover" />
		</button>
	{/snippet}
	<div class="space-y-3">
		<div class="text-center">
			<p class="font-semibold">John Doe</p>
			<p class="text-sm text-gray-600">john@example.com</p>
		</div>
		<div class="border-t pt-3">
			<Button variant={ButtonVariant.OUTLINE} onclick={viewProfile}>View Profile</Button>
		</div>
	</div>
</Popover>
```

### Accessibility

- Keyboard: Enter/Space to open, Escape to close, Tab/Shift+Tab for navigation
- ARIA: Proper role and aria-expanded managed by bits-ui
- Focus management: Focus trap within popover content
- Screen reader: Popover content announced when opened
- Click outside closes popover
- Scale animation respects prefers-reduced-motion

---

## Related Components

- [Foundation Components](./foundation.md) - Button (for modal/toast actions), Badge, CloseButton
- [Navigation Components](./navigation.md) - Dropdown (alternative to popover)
- [Form Components](./forms.md) - Form components for use in modals/popovers
