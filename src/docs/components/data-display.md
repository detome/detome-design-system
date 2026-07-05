# Data Display Components

Data display components present information in structured ways including tables, progress indicators, lists, and status markers.

## Table of Contents

- [Table](#table)
- [TableHead](#tablehead)
- [TableBody](#tablebody)
- [TableBodyRow](#tablebodyrow)
- [TableBodyCell](#tablebodycell)
- [TableHeadCell](#tableheadcell)
- [Progressbar](#progressbar)
- [Listgroup](#listgroup)
- [ListgroupItem](#listgroupitem)
- [StepIndicator](#stepindicator)
- [Indicator](#indicator)

---

## Table

Table container component with responsive scrolling and visual variants. Wraps semantic HTML table with overflow handling and styling options.

### When to Use

- Displaying tabular data
- Data grids
- Comparison tables
- Pricing tables
- Any structured data presentation

### Installation

```svelte
<script>
	import {
		Table,
		TableHead,
		TableBody,
		TableBodyRow,
		TableBodyCell,
		TableHeadCell
	} from 'requify-design-system';
</script>
```

### Props API

| Prop        | Type                             | Default     | Description                                                             |
| ----------- | -------------------------------- | ----------- | ----------------------------------------------------------------------- |
| `children`  | `Snippet`                        | -           | Table content (TableHead, TableBody)                                    |
| `class`     | `string`                         | -           | Additional CSS classes to apply to table element                        |
| `classes`   | `{div?: string, table?: string}` | -           | Object with div and table class overrides                               |
| `striped`   | `boolean`                        | `false`     | If true, applies alternating row background colors                      |
| `hoverable` | `boolean`                        | `false`     | If true, adds hover effect to rows                                      |
| `noborder`  | `boolean`                        | `false`     | If true, removes border collapse                                        |
| `shadow`    | `boolean`                        | `false`     | If true, adds shadow to table container                                 |
| `color`     | `TextColor \| TextColorType`     | `'default'` | Reserved for future use — accepted but not currently applied to styling |

### Examples

#### Basic Table

```svelte
<Table>
	<TableHead>
		<TableHeadCell>Name</TableHeadCell>
		<TableHeadCell>Email</TableHeadCell>
		<TableHeadCell>Status</TableHeadCell>
	</TableHead>
	<TableBody>
		<TableBodyRow>
			<TableBodyCell>John Doe</TableBodyCell>
			<TableBodyCell>john@example.com</TableBodyCell>
			<TableBodyCell>Active</TableBodyCell>
		</TableBodyRow>
		<TableBodyRow>
			<TableBodyCell>Jane Smith</TableBodyCell>
			<TableBodyCell>jane@example.com</TableBodyCell>
			<TableBodyCell>Active</TableBodyCell>
		</TableBodyRow>
	</TableBody>
</Table>
```

#### Striped Rows

```svelte
<Table striped>
	<TableHead>
		<TableHeadCell>Product</TableHeadCell>
		<TableHeadCell>Price</TableHeadCell>
	</TableHead>
	<TableBody>
		<TableBodyRow>
			<TableBodyCell>Item 1</TableBodyCell>
			<TableBodyCell>$10.00</TableBodyCell>
		</TableBodyRow>
	</TableBody>
</Table>
```

#### Hoverable Rows

```svelte
<Table hoverable>
	<TableHead>
		<TableHeadCell>Product</TableHeadCell>
		<TableHeadCell>Price</TableHeadCell>
	</TableHead>
	<TableBody>
		<TableBodyRow onclick={viewProduct}>
			<TableBodyCell>Hover me</TableBodyCell>
			<TableBodyCell>$19.99</TableBodyCell>
		</TableBodyRow>
	</TableBody>
</Table>
```

#### With Shadow and No Border

```svelte
<Table shadow noborder>
	<TableHead>
		<TableHeadCell>Title</TableHeadCell>
	</TableHead>
	<TableBody>
		<TableBodyRow>
			<TableBodyCell>Content</TableBodyCell>
		</TableBodyRow>
	</TableBody>
</Table>
```

#### With Custom Classes

```svelte
<Table classes={{ div: 'max-h-96', table: 'w-full' }}>
	<TableHead>
		<TableHeadCell>Header</TableHeadCell>
	</TableHead>
	<TableBody>
		<TableBodyRow>
			<TableBodyCell>Data</TableBodyCell>
		</TableBodyRow>
	</TableBody>
</Table>
```

#### With Actions

```svelte
<Table hoverable>
	<TableHead>
		<TableHeadCell>Name</TableHeadCell>
		<TableHeadCell>Actions</TableHeadCell>
	</TableHead>
	<TableBody>
		<TableBodyRow>
			<TableBodyCell>John Doe</TableBodyCell>
			<TableBodyCell>
				<div class="flex gap-2">
					<Button size="sm" variant={ButtonVariant.GHOST}>
						<Edit class="h-4 w-4" />
					</Button>
					<Button size="sm" variant={ButtonVariant.GHOST}>
						<Trash class="h-4 w-4" />
					</Button>
				</div>
			</TableBodyCell>
		</TableBodyRow>
	</TableBody>
</Table>
```

#### With Badges

```svelte
<Table>
	<TableHead>
		<TableHeadCell>Task</TableHeadCell>
		<TableHeadCell>Status</TableHeadCell>
	</TableHead>
	<TableBody>
		<TableBodyRow>
			<TableBodyCell>Complete profile</TableBodyCell>
			<TableBodyCell>
				<Badge variant={BadgeVariant.SUCCESS}>Done</Badge>
			</TableBodyCell>
		</TableBodyRow>
		<TableBodyRow>
			<TableBodyCell>Verify email</TableBodyCell>
			<TableBodyCell>
				<Badge variant={BadgeVariant.WARNING}>Pending</Badge>
			</TableBodyCell>
		</TableBodyRow>
	</TableBody>
</Table>
```

#### With Pagination

```svelte
<Card>
	<Table hoverable>
		<TableHead>
			<TableHeadCell>Name</TableHeadCell>
			<TableHeadCell>Email</TableHeadCell>
		</TableHead>
		<TableBody>
			<!-- Rows -->
		</TableBody>
	</Table>
	<div class="mt-4 flex justify-center">
		<Pagination {pages} previous={goToPrevious} next={goToNext} />
	</div>
</Card>
```

### Accessibility

- Semantic HTML table structure
- Responsive scrolling for mobile
- Proper scope attributes on headers
- Keyboard navigable rows with onclick
- High contrast text colors

---

## TableHead

Table header container. Contains TableHeadCell components.

### Installation

```svelte
<script>
	import { TableHead } from 'requify-design-system';
</script>
```

### Props API

| Prop         | Type      | Default | Description                        |
| ------------ | --------- | ------- | ---------------------------------- |
| `children`   | `Snippet` | -       | TableHeadCell components           |
| `defaultRow` | `boolean` | `true`  | Wraps children in a `<tr>` element |
| `class`      | `string`  | -       | Additional CSS classes             |

### Examples

```svelte
<TableHead>
	<TableHeadCell>Name</TableHeadCell>
	<TableHeadCell>Email</TableHeadCell>
</TableHead>
```

---

## TableBody

Table body container. Contains TableBodyRow components.

### Installation

```svelte
<script>
	import { TableBody } from 'requify-design-system';
</script>
```

### Props API

| Prop       | Type      | Default | Description             |
| ---------- | --------- | ------- | ----------------------- |
| `children` | `Snippet` | -       | TableBodyRow components |

### Examples

```svelte
<TableBody>
	<TableBodyRow>
		<TableBodyCell>John</TableBodyCell>
		<TableBodyCell>Doe</TableBodyCell>
	</TableBodyRow>
</TableBody>
```

---

## TableBodyRow

Individual table row. Can be clickable for interactive tables.

### Installation

```svelte
<script>
	import { TableBodyRow } from 'requify-design-system';
</script>
```

### Props API

| Prop       | Type                         | Default | Description                  |
| ---------- | ---------------------------- | ------- | ---------------------------- |
| `children` | `Snippet`                    | -       | TableBodyCell components     |
| `color`    | `TextColor \| TextColorType` | -       | Text color variant           |
| `class`    | `string`                     | -       | Additional CSS classes       |
| `onclick`  | `(e: MouseEvent) => void`    | -       | Click handler for entire row |

### Examples

```svelte
<TableBodyRow onclick={viewRow}>
	<TableBodyCell>Data</TableBodyCell>
</TableBodyRow>
```

---

## TableBodyCell

Individual table data cell.

### Installation

```svelte
<script>
	import { TableBodyCell } from 'requify-design-system';
</script>
```

### Props API

| Prop       | Type      | Default | Description                  |
| ---------- | --------- | ------- | ---------------------------- |
| `children` | `Snippet` | -       | Cell content                 |
| `padding`  | `string`  | -       | Padding classes for the cell |
| `colspan`  | `number`  | -       | Native `colspan` attribute   |
| `class`    | `string`  | -       | Additional CSS classes       |

### Examples

```svelte
<TableBodyCell>John Doe</TableBodyCell>
```

---

## TableHeadCell

Table header cell. Automatically adds proper scope attribute.

### Installation

```svelte
<script>
	import { TableHeadCell } from 'requify-design-system';
</script>
```

### Props API

| Prop       | Type                      | Default       | Description                      |
| ---------- | ------------------------- | ------------- | -------------------------------- |
| `children` | `Snippet`                 | -             | Cell content                     |
| `padding`  | `string`                  | `'px-6 py-3'` | Padding classes for the cell     |
| `onclick`  | `(e: MouseEvent) => void` | -             | Click handler (e.g. for sorting) |
| `class`    | `string`                  | -             | Additional CSS classes           |

Note: there is no built-in sort state (`sortable`/`sorted`) — wire up sorting yourself via `onclick` and render your own sort icon in `children`.

### Examples

```svelte
<TableHeadCell onclick={() => sort('name')}>
	Name
	<ArrowUpDown class="ml-1 inline h-4 w-4" />
</TableHeadCell>
```

---

## Progressbar

Progress bar component for displaying completion percentage. Supports multiple colors, sizes, and label positions.

### When to Use

- Loading indicators with progress
- Upload/download progress
- Form completion progress
- Task completion tracking
- Data processing progress

### Installation

```svelte
<script>
	import { Progressbar, AccentVariant, ComponentSize } from 'requify-design-system';
</script>
```

### Props API

| Prop           | Type                      | Default     | Description                                               |
| -------------- | ------------------------- | ----------- | --------------------------------------------------------- |
| `progress`     | `number`                  | `0`         | Percentage value (0-100)                                  |
| `size`         | `ComponentSize \| string` | `'md'`      | Progress bar height. Named sizes or custom Tailwind class |
| `color`        | `AccentVariant`           | `'primary'` | Color variant                                             |
| `labelInside`  | `boolean`                 | `false`     | If true, shows percentage inside bar                      |
| `labelOutside` | `boolean`                 | `false`     | If true, shows percentage above bar                       |
| `class`        | `string`                  | -           | Additional CSS classes to apply                           |

### Examples

#### Basic Progress

```svelte
<Progressbar progress={50} />
```

#### All Colors

```svelte
<Progressbar progress={75} color={AccentVariant.PRIMARY} />
<Progressbar progress={75} color={AccentVariant.SECONDARY} />
<Progressbar progress={75} color={AccentVariant.SUCCESS} />
<Progressbar progress={75} color={AccentVariant.ERROR} />
<Progressbar progress={75} color={AccentVariant.WARNING} />
<Progressbar progress={75} color={AccentVariant.INFO} />
```

#### All Sizes

```svelte
<Progressbar progress={30} size={ComponentSize.XS} />
<Progressbar progress={30} size={ComponentSize.SM} />
<Progressbar progress={30} size={ComponentSize.MD} />
<Progressbar progress={30} size={ComponentSize.LG} />
<Progressbar progress={30} size={ComponentSize.XL} />
```

#### Label Outside

```svelte
<Progressbar progress={60} size={ComponentSize.SM} labelOutside />
```

#### Label Inside

```svelte
<Progressbar progress={60} size={ComponentSize.LG} labelInside />
```

#### Error Progress

```svelte
<Progressbar progress={90} color={AccentVariant.ERROR} labelOutside />
```

#### Custom Size

```svelte
<Progressbar progress={45} size="h-1" />
```

#### Upload Progress

```svelte
<script>
	let uploadProgress = $state(0);

	function simulateUpload() {
		const interval = setInterval(() => {
			uploadProgress += 10;
			if (uploadProgress >= 100) {
				clearInterval(interval);
			}
		}, 200);
	}
</script>

<Progressbar progress={uploadProgress} labelOutside color={AccentVariant.PRIMARY} />
<p class="mt-1 text-sm text-gray-600">{uploadProgress}% complete</p>
```

#### Form Completion

```svelte
<script>
	let formProgress = $derived((completedFields / totalFields) * 100);
</script>

<Progressbar progress={formProgress} labelOutside color={AccentVariant.SUCCESS} />
<p class="mt-1 text-sm text-gray-600">
	{completedFields} of {totalFields} fields completed
</p>
```

### Accessibility

- ARIA: Should be wrapped with aria-label and aria-valuenow
- Screen reader: Use labelInside or labelOutside for visibility
- Smooth transition for visual updates
- High contrast colors for all variants

---

## Listgroup

List group container for organizing related list items. Provides consistent styling and spacing for list content.

### When to Use

- Navigation menus
- List of actions
- Settings groups
- Organizing related items

### Installation

```svelte
<script>
	import { Listgroup, ListgroupItem } from 'requify-design-system';
</script>
```

### Props API

| Prop       | Type      | Default | Description                                 |
| ---------- | --------- | ------- | ------------------------------------------- |
| `active`   | `boolean` | `false` | Reserved for future active state management |
| `children` | `Snippet` | -       | ListgroupItem components                    |
| `class`    | `string`  | -       | Additional CSS classes to apply             |

### Examples

#### Basic List Group

```svelte
<Listgroup>
	<ListgroupItem onclick={() => select('item1')}>Item 1</ListgroupItem>
	<ListgroupItem onclick={() => select('item2')}>Item 2</ListgroupItem>
	<ListgroupItem onclick={() => select('item3')}>Item 3</ListgroupItem>
</Listgroup>
```

#### With Custom Styling

```svelte
<Listgroup class="shadow-lg">
	<ListgroupItem>Item 1</ListgroupItem>
	<ListgroupItem>Item 2</ListgroupItem>
</Listgroup>
```

#### With Icons

```svelte
<Listgroup>
	<ListgroupItem onclick={goToProfile}>
		<User class="mr-2 h-4 w-4" />
		Profile
	</ListgroupItem>
	<ListgroupItem onclick={goToSettings}>
		<Settings class="mr-2 h-4 w-4" />
		Settings
	</ListgroupItem>
</Listgroup>
```

#### With Active State

```svelte
<Listgroup>
	<ListgroupItem class="bg-primary-50 text-primary-700">Active Item</ListgroupItem>
	<ListgroupItem>Other Item</ListgroupItem>
</Listgroup>
```

#### With Badges

```svelte
<Listgroup>
	<ListgroupItem onclick={goToNotifications}>
		Notifications
		<Badge variant="secondary">3</Badge>
	</ListgroupItem>
	<ListgroupItem onclick={goToMessages}>
		Messages
		<Badge variant="error">5</Badge>
	</ListgroupItem>
</Listgroup>
```

#### Settings Menu

```svelte
<Listgroup>
	<ListgroupItem onclick={openProfile}>
		<div class="flex items-center gap-3">
			<div class="bg-primary-100 h-8 w-8 rounded-full">
				<User class="h-4 w-4" />
			</div>
			<div>
				<p class="font-medium">Profile</p>
				<p class="text-sm text-gray-600">Manage your profile</p>
			</div>
		</div>
	</ListgroupItem>
	<ListgroupItem onclick={openSecurity}>
		<Shield class="mr-2 h-4 w-4" />
		Security
	</ListgroupItem>
</Listgroup>
```

#### Action List

```svelte
<Listgroup>
	<ListgroupItem onclick={handleEdit}>
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-2">
				<Edit class="h-4 w-4" />
				Edit
			</div>
			<ChevronRight class="h-4 w-4 text-gray-400" />
		</div>
	</ListgroupItem>
	<ListgroupItem onclick={handleDuplicate}>
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-2">
				<Copy class="h-4 w-4" />
				Duplicate
			</div>
			<ChevronRight class="h-4 w-4 text-gray-400" />
		</div>
	</ListgroupItem>
	<ListgroupItem onclick={handleDelete} class="text-error-600">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-2">
				<Trash class="h-4 w-4" />
				Delete
			</div>
			<ChevronRight class="h-4 w-4" />
		</div>
	</ListgroupItem>
</Listgroup>
```

### Accessibility

- Semantic list structure
- Keyboard navigable items with onclick
- High contrast colors
- Proper border and border-radius for grouped items

---

## ListgroupItem

Individual list item component. Supports rich content and click handlers.

### Installation

```svelte
<script>
	import { ListgroupItem } from 'requify-design-system';
</script>
```

### Props API

| Prop       | Type                      | Default | Description            |
| ---------- | ------------------------- | ------- | ---------------------- |
| `children` | `Snippet`                 | -       | Item content           |
| `class`    | `string`                  | -       | Additional CSS classes |
| `onclick`  | `(e: MouseEvent) => void` | -       | Click handler          |

### Examples

```svelte
<ListgroupItem onclick={handleClick}>Item</ListgroupItem>
```

---

## StepIndicator

Step indicator for multi-step workflows and wizards. Visual progress tracker with numbered steps and connecting lines.

### When to Use

- Multi-step forms/wizards
- Onboarding flows
- Checkout process
- Progressive disclosure
- Status tracking across steps

### Installation

```svelte
<script>
	import { StepIndicator } from 'requify-design-system';
</script>
```

### Props API

| Prop          | Type                                       | Default                          | Description                               |
| ------------- | ------------------------------------------ | -------------------------------- | ----------------------------------------- |
| `currentStep` | `number`                                   | `1`                              | Current active step (1-indexed)           |
| `steps`       | `string[]`                                 | `['Step 1', 'Step 2', 'Step 3']` | Array of step labels                      |
| `glow`        | `boolean`                                  | `false`                          | If true, adds glow effect to current step |
| `class`       | `string`                                   | -                                | Additional CSS classes to apply           |
| `children`    | `Snippet<[{step: number, label: string}]>` | -                                | Custom step content snippet               |

### Examples

#### Basic 3-Step Indicator

```svelte
<StepIndicator currentStep={1} steps={['Step 1', 'Step 2', 'Step 3']} />
```

#### With Custom Steps

```svelte
<StepIndicator currentStep={2} steps={['Personal Info', 'Address', 'Confirmation']} />
```

#### With Glow Effect

```svelte
<StepIndicator currentStep={2} steps={['A', 'B', 'C']} glow />
```

#### 5-Step Wizard

```svelte
<StepIndicator currentStep={3} steps={['Upload', 'Process', 'Review', 'Approve', 'Complete']} />
```

#### With Custom Step Content

```svelte
<StepIndicator currentStep={1} steps={['Step 1', 'Step 2']}>
	{#snippet children({ step, label })}
		<Icon class="h-4 w-4" />
	{/snippet}
</StepIndicator>
```

#### With Custom Styling

```svelte
<StepIndicator currentStep={2} steps={['Start', 'Middle', 'End']} class="py-8" />
```

#### Onboarding Flow

```svelte
<script>
	let currentStep = $state(1);

	function nextStep() {
		if (currentStep < 4) {
			currentStep++;
		}
	}

	function prevStep() {
		if (currentStep > 1) {
			currentStep--;
		}
	}
</script>

<StepIndicator {currentStep} steps={['Account', 'Profile', 'Preferences', 'Complete']} />

<div class="mt-8">
	{#if currentStep === 1}
		<Card>
			<h3>Create Account</h3>
			<Input placeholder="Email" />
			<Button onclick={nextStep}>Next</Button>
		</Card>
	{:else if currentStep === 2}
		<Card>
			<h3>Profile Setup</h3>
			<Input placeholder="Name" />
			<div class="flex gap-2">
				<Button variant={ButtonVariant.OUTLINE} onclick={prevStep}>Back</Button>
				<Button onclick={nextStep}>Next</Button>
			</div>
		</Card>
	{/if}
</div>
```

#### With Progress

```svelte
<script>
	const steps = ['Upload', 'Verify', 'Process', 'Complete'];
	const currentStep = $state(2);
	const progress = $derived((currentStep / steps.length) * 100);
</script>

<StepIndicator {currentStep} {steps} glow />

<div class="mt-4">
	<Progressbar {progress} labelOutside />
	<p class="mt-2 text-center text-sm text-gray-600">
		{currentStep} of {steps.length} steps completed
	</p>
</div>
```

### Accessibility

- Semantic ordered list (ol)
- Visual distinction between completed, current, and pending steps
- Checkmark icon for completed steps
- High contrast colors
- Screen reader announces current step position

---

## Indicator

Status indicator badge for notifications, alerts, and status markers. Absolute positioned dot with variant colors and flexible sizing.

### When to Use

- Notification counts
- User online/offline status
- Status markers on avatars or icons
- Alert indicators
- Unread message indicators

### Installation

```svelte
<script>
	import { Indicator } from 'requify-design-system';
</script>
```

### Props API

| Prop        | Type                                                                                                                                             | Default       | Description                                      |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- | ------------------------------------------------ |
| `variant`   | `'success' \| 'error' \| 'warning' \| 'info' \| 'default'`                                                                                       | `'default'`   | Color variant                                    |
| `size`      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                                                                                           | `'md'`        | Indicator size                                   |
| `placement` | `'top-left' \| 'top-center' \| 'top-right' \| 'center-left' \| 'center' \| 'center-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'top-right'` | Position relative to parent                      |
| `border`    | `boolean`                                                                                                                                        | `false`       | If true, adds white ring border around indicator |
| `class`     | `string`                                                                                                                                         | -             | Additional CSS classes to apply                  |

### Examples

#### Default Indicator (Top-Right)

```svelte
<div class="relative">
	<Button>Notifications</Button>
	<Indicator />
</div>
```

#### All Variants

```svelte
<Indicator variant="success" />
<Indicator variant="error" />
<Indicator variant="warning" />
<Indicator variant="info" />
<Indicator variant="default" />
```

#### All Sizes

```svelte
<Indicator size="xs" />
<Indicator size="sm" />
<Indicator size="md" />
<Indicator size="lg" />
<Indicator size="xl" />
```

#### Error With Border

```svelte
<div class="relative">
	<Img src="/avatar.jpg" alt="User" class="h-10 w-10 rounded-full object-cover" />
	<Indicator variant="error" border />
</div>
```

#### Large Indicator

```svelte
<div class="relative">
	<Card>
		<h3>Title</h3>
	</Card>
	<Indicator variant="warning" size="xl" />
</div>
```

#### Centered Placement

```svelte
<div class="relative">
	<img src="avatar.jpg" alt="Avatar" />
	<Indicator variant="success" placement="center" />
</div>
```

#### Small Indicator

```svelte
<div class="relative">
	<Badge>Badge</Badge>
	<Indicator size="xs" />
</div>
```

#### All Placements

```svelte
<Indicator placement="top-left" />
<Indicator placement="top-center" />
<Indicator placement="top-right" />
<Indicator placement="center-left" />
<Indicator placement="center" />
<Indicator placement="center-right" />
<Indicator placement="bottom-left" />
<Indicator placement="bottom-center" />
<Indicator placement="bottom-right" />
```

#### Notification Count

```svelte
<div class="relative">
	<Button icon>
		{#snippet icon()}
			<Bell class="h-4 w-4" />
		{/snippet}
	</Button>
	<Indicator variant="error" size="lg" />
</div>
```

#### Online Status

```svelte
<div class="relative">
	<Img src="/avatar.jpg" alt="User" class="h-14 w-14 rounded-full object-cover" />
	<Indicator variant="success" placement="bottom-right" border />
</div>
```

#### Unread Messages

```svelte
<div class="relative">
	<ListgroupItem>
		<div class="flex items-center gap-3">
			<Img src="/user.jpg" alt="User" class="h-10 w-10 rounded-full object-cover" />
			<div>
				<p class="font-medium">John Doe</p>
				<p class="text-sm text-gray-600">New message</p>
			</div>
		</div>
	</ListgroupItem>
	<Indicator variant="error" placement="top-right" />
</div>
```

#### Multiple Indicators

```svelte
<div class="relative">
	<Button icon>
		{#snippet icon()}
			<Bell class="h-4 w-4" />
		{/snippet}
	</Button>
	<Indicator variant="error" placement="top-right" size="lg" />
</div>

<div class="relative">
	<Button icon>
		{#snippet icon()}
			<Mail class="h-4 w-4" />
		{/snippet}
	</Button>
	<Indicator variant="warning" placement="top-right" size="md" />
</div>
```

### Accessibility

- aria-hidden="true" for decorative markers
- High contrast colors for visibility
- Optional border for better visibility on colored backgrounds
- Small footprint for subtle notifications

---

## Related Components

- [Foundation Components](./foundation.md) - Badge, Card, Button
- [Navigation Components](./navigation.md) - Pagination (for use with tables)
- [Feedback Components](./feedback.md) - Spinner (for loading states)
