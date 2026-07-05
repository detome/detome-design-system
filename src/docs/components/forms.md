# Form Components

Form components provide a comprehensive set of controls for collecting user input. These components handle validation, accessibility, and state management out of the box.

## Table of Contents

- [Select](#select)
- [Checkbox](#checkbox)
- [Switch](#switch)
- [RadioGroup](#radiogroup)
- [RadioItem](#radioitem)
- [Datepicker](#datepicker)
- [DateRangePicker](#daterangepicker)
- [Search](#search)

---

## Select

Dropdown select component with keyboard navigation, error states, and search functionality. Wraps bits-ui.Select.Root with custom styling.

### When to Use

- Single-select dropdowns (choosing from options)
- Form fields with predefined choices
- Settings selection
- Filtering options

### Installation

```svelte
<script>
	import { Select } from 'requify-design-system';
</script>
```

### Props API

| Prop          | Type                                                     | Default              | Description                                                            |
| ------------- | -------------------------------------------------------- | -------------------- | ---------------------------------------------------------------------- |
| `value`       | `string \| number \| null`                               | -                    | Currently selected value (bindable)                                    |
| `options`     | `SelectOption[]`                                         | `[]`                 | Available options. Each option has value, label, and optional disabled |
| `placeholder` | `string`                                                 | `'Select an option'` | Placeholder text when no option is selected                            |
| `disabled`    | `boolean`                                                | `false`              | Whether the select is disabled                                         |
| `required`    | `boolean`                                                | `false`              | Whether the select is required                                         |
| `error`       | `string`                                                 | -                    | Error message to display                                               |
| `onChange`    | `(value: string \| number \| null \| undefined) => void` | -                    | Callback when selection changes                                        |
| `class`       | `string`                                                 | -                    | Additional CSS classes to apply                                        |
| `id`          | `string`                                                 | -                    | HTML id attribute                                                      |
| `children`    | `Snippet`                                                | -                    | Custom content snippet                                                 |

#### SelectOption Interface

| Property   | Type                       | Description                    |
| ---------- | -------------------------- | ------------------------------ |
| `value`    | `string \| number \| null` | Option value                   |
| `label`    | `string`                   | Display label for the option   |
| `disabled` | `boolean`                  | Whether the option is disabled |

### Examples

#### Basic Usage

```svelte
<script>
	let country = $state('us');
	const countries = [
		{ value: 'us', label: 'United States' },
		{ value: 'uk', label: 'United Kingdom' },
		{ value: 'ca', label: 'Canada' }
	];
</script>

<Select bind:value={country} options={countries} />
```

#### With Error State

```svelte
<Select bind:value={status} options={statusOptions} error="Please select a status" />
```

#### Disabled

```svelte
<Select value="readonly" options={[{ value: 'readonly', label: 'Read Only' }]} disabled />
```

#### With Placeholder

```svelte
<Select bind:value={category} options={categories} placeholder="Choose a category..." />
```

#### With Disabled Options

```svelte
<Select
	bind:value={plan}
	options={[
		{ value: 'free', label: 'Free Plan' },
		{ value: 'pro', label: 'Pro Plan' },
		{ value: 'enterprise', label: 'Enterprise', disabled: true }
	]} />
```

#### With Label

```svelte
<Label for="role">Role</Label>
<Select id="role" bind:value={role} options={roles} />
```

#### Number Values

```svelte
<Select
	bind:value={quantity}
	options={[
		{ value: 1, label: '1 item' },
		{ value: 5, label: '5 items' },
		{ value: 10, label: '10 items' }
	]} />
```

#### With onChange Handler

```svelte
<Select
	bind:value={department}
	options={departments}
	onChange={(val) => console.log('Selected:', val)} />
```

#### Null Value Handling

```svelte
<Select
	bind:value={nullableValue}
	options={[
		{ value: null, label: 'None' },
		{ value: 'option1', label: 'Option 1' }
	]} />
```

### Accessibility

- Full keyboard navigation (arrow keys, Enter, Escape)
- ARIA role="combobox" with proper states
- Screen reader announces selected option
- Error state announced via aria-describedby
- Focus management on open/close

---

## Checkbox

Boolean input with checked/unchecked/indeterminate states. Wraps bits-ui.Checkbox.Root for accessibility and tri-state support.

### When to Use

- Binary choices (agree/disagree, yes/no)
- Multiple independent selections
- "Select all" functionality with indeterminate state
- Settings toggles (use Switch instead for toggle-like UI)

### Installation

```svelte
<script>
	import { Checkbox } from 'requify-design-system';
</script>
```

### Props API

| Prop              | Type                                            | Default | Description                                                                 |
| ----------------- | ----------------------------------------------- | ------- | --------------------------------------------------------------------------- |
| `checked`         | `boolean`                                       | -       | Current checked state (bindable)                                            |
| `indeterminate`   | `boolean`                                       | `false` | Indeterminate state for tri-state checkboxes (partially selected). Bindable |
| `disabled`        | `boolean`                                       | `false` | Disables checkbox interaction                                               |
| `required`        | `boolean`                                       | `false` | Shows asterisk, form validation hint                                        |
| `name`            | `string`                                        | -       | HTML name attribute for form submission                                     |
| `value`           | `string`                                        | -       | HTML value attribute                                                        |
| `id`              | `string`                                        | -       | HTML id for label association                                               |
| `children`        | `Snippet`                                       | -       | Label content displayed next to checkbox                                    |
| `class`           | `string`                                        | -       | Additional CSS classes to apply                                             |
| `onCheckedChange` | `(checked: boolean \| 'indeterminate') => void` | -       | Callback when checked state changes                                         |

### Examples

#### Basic Checkbox

```svelte
<Checkbox bind:checked={agreeToTerms} />
<Label>I agree to the terms</Label>
```

#### With Label

```svelte
<Checkbox bind:checked={subscribe}>I want to receive emails</Checkbox>
```

#### Required Field

```svelte
<Checkbox bind:checked={requiredField} required />
<Label>Required option</Label>
```

#### Indeterminate (Tri-State)

```svelte
<Checkbox bind:checked={allSelected} bind:indeterminate={someSelected} />
<Label>Select all</Label>

{#each items as item}
	<Checkbox bind:checked={item.selected} />
	<Label>{item.name}</Label>
{/each}
```

#### Disabled

```svelte
<Checkbox bind:checked={disabledCheck} disabled />
<Label>Disabled option</Label>
```

#### Multiple Selections

```svelte
<script>
	const fruits = [
		{ name: 'Apple', selected: $state(false) },
		{ name: 'Banana', selected: $state(false) },
		{ name: 'Orange', selected: $state(false) }
	];
</script>

{#each fruits as fruit}
	<Checkbox bind:checked={fruit.selected} />
	<Label>{fruit.name}</Label>
{/each}
```

#### With onChange Handler

```svelte
<Checkbox bind:checked={newsletter} onCheckedChange={(val) => console.log('Changed:', val)} />
<Label>Subscribe to newsletter</Label>
```

#### Form Group

```svelte
<div class="space-y-2">
	<Checkbox bind:checked={option1} />
	<Label>Option 1</Label>
	<Checkbox bind:checked={option2} />
	<Label>Option 2</Label>
	<Checkbox bind:checked={option3} />
	<Label>Option 3</Label>
</div>
```

#### With Helper Text

```svelte
<Checkbox bind:checked={dataCollection} />
<Label>Allow data collection</Label>
<Helper>Helps improve our services</Helper>
```

### Accessibility

- Native checkbox keyboard support (Space to toggle)
- Proper label association via for/id attributes
- Indeterminate state properly announced to screen readers
- Visual focus ring for keyboard navigation
- Required indicator (asterisk) for form validation

---

## Switch

Toggle switch with variants (primary, secondary, success, error, warning, info). Wraps bits-ui.Switch.Root for accessibility.

### When to Use

- Binary settings toggles (dark mode, notifications)
- On/off switches
- Feature flags
- Settings preferences

### Installation

```svelte
<script>
	import { Switch, AccentVariant } from 'requify-design-system';
</script>
```

### Props API

| Prop              | Type                                 | Default     | Description                                       |
| ----------------- | ------------------------------------ | ----------- | ------------------------------------------------- |
| `checked`         | `boolean`                            | -           | Current checked state (bindable)                  |
| `variant`         | `AccentVariant \| AccentVariantType` | `'primary'` | Color variant for semantic meaning                |
| `disabled`        | `boolean`                            | `false`     | Disables switch interaction                       |
| `required`        | `boolean`                            | `false`     | Shows asterisk, form validation hint              |
| `name`            | `string`                             | -           | HTML name attribute for form submission           |
| `value`           | `string`                             | -           | HTML value attribute                              |
| `id`              | `string`                             | -           | HTML id for label association                     |
| `children`        | `Snippet`                            | -           | Label content displayed next to switch            |
| `leftLabel`       | `Snippet`                            | -           | Label content displayed to the left of the switch |
| `class`           | `string`                             | -           | Additional CSS classes to apply                   |
| `onCheckedChange` | `(checked: boolean) => void`         | -           | Callback when checked state changes               |

### Examples

#### Basic Usage

```svelte
<Switch bind:checked={notificationsEnabled} />
<Label>Enable notifications</Label>
```

#### All Variants

```svelte
<Switch bind:checked={v1} variant={AccentVariant.PRIMARY} />
<Label>Primary</Label>

<Switch bind:checked={v2} variant={AccentVariant.SECONDARY} />
<Label>Secondary</Label>

<Switch bind:checked={v3} variant={AccentVariant.SUCCESS} />
<Label>Success</Label>

<Switch bind:checked={v4} variant={AccentVariant.ERROR} />
<Label>Error</Label>

<Switch bind:checked={v5} variant={AccentVariant.WARNING} />
<Label>Warning</Label>

<Switch bind:checked={v6} variant={AccentVariant.INFO} />
<Label>Info</Label>
```

#### Disabled

```svelte
<Switch bind:checked={disabledSwitch} disabled />
<Label>Disabled switch</Label>
```

#### With Label

```svelte
<Switch bind:checked={darkMode} variant={AccentVariant.SECONDARY}>Dark mode</Switch>
```

#### Multiple Switches

```svelte
<div class="space-y-3">
	<Switch bind:checked={setting1}>Enable notifications</Switch>
	<Switch bind:checked={setting2}>Auto-save</Switch>
	<Switch bind:checked={setting3}>Public profile</Switch>
</div>
```

#### With Helper Text

```svelte
<Switch bind:checked={locationAccess} />
<Label>Location access</Label>
<Helper>Allow app to access your location</Helper>
```

#### With onChange Handler

```svelte
<Switch bind:checked={featureFlag} onCheckedChange={(val) => console.log('Changed:', val)} />
<Label>Experimental features</Label>
```

#### Settings Panel

```svelte
<Card>
	<h3>Settings</h3>
	<div class="mt-4 space-y-4">
		<Switch bind:checked={setting1}>Email notifications</Switch>
		<Switch bind:checked={setting2} variant={AccentVariant.SUCCESS}>
			Two-factor authentication
		</Switch>
		<Switch bind:checked={setting3} variant={AccentVariant.ERROR}>Account deletion</Switch>
	</div>
</Card>
```

### Accessibility

- Keyboard toggle with Space and Enter
- Visible focus ring for keyboard navigation
- Proper label association via for/id attributes
- Smooth animation with proper reduced motion support
- ARIA switch role for screen readers

---

## RadioGroup

Radio button group with single-select functionality. Wraps bits-ui.RadioGroup.Root for accessibility.

### When to Use

- Single-select options from a set (choose one)
- Mutually exclusive choices (payment method, shipping option)
- Settings with limited options
- Survey questions with single choice

### Installation

```svelte
<script>
	import { RadioGroup, RadioItem } from 'requify-design-system';
</script>
```

### Props API

| Prop          | Type                         | Default      | Description                                             |
| ------------- | ---------------------------- | ------------ | ------------------------------------------------------- |
| `value`       | `string`                     | -            | Currently selected value (bindable)                     |
| `options`     | `RadioOption[]`              | `[]`         | Array of radio options (alternative to children)        |
| `disabled`    | `boolean`                    | `false`      | Disables entire radio group                             |
| `required`    | `boolean`                    | `false`      | Shows asterisk, form validation hint                    |
| `name`        | `string`                     | -            | HTML name attribute for form grouping                   |
| `children`    | `Snippet`                    | -            | Custom RadioItem children (alternative to options prop) |
| `class`       | `string`                     | -            | Additional CSS classes to apply                         |
| `orientation` | `'horizontal' \| 'vertical'` | `'vertical'` | Layout direction                                        |

#### RadioOption Interface

| Property   | Type      | Description                  |
| ---------- | --------- | ---------------------------- |
| `value`    | `string`  | Unique value for this option |
| `label`    | `string`  | Display label text           |
| `disabled` | `boolean` | If true, option is disabled  |

### Examples

#### Using Options Prop

```svelte
<RadioGroup
	bind:value={selectedPlan}
	options={[
		{ value: 'free', label: 'Free Plan' },
		{ value: 'pro', label: 'Pro Plan' },
		{ value: 'enterprise', label: 'Enterprise' }
	]} />
```

#### Horizontal Orientation

```svelte
<RadioGroup
	bind:value={selectedTheme}
	orientation="horizontal"
	options={[
		{ value: 'light', label: 'Light' },
		{ value: 'dark', label: 'Dark' }
	]} />
```

#### With Disabled Options

```svelte
<RadioGroup
	bind:value={plan}
	options={[
		{ value: 'free', label: 'Free' },
		{ value: 'pro', label: 'Pro (Upgrade)' },
		{ value: 'enterprise', label: 'Enterprise', disabled: true }
	]} />
```

#### With Custom Children

```svelte
<RadioGroup bind:value={selected}>
	<RadioItem value="option1">Option 1</RadioItem>
	<RadioItem value="option2">Option 2</RadioItem>
	<RadioItem value="option3">Option 3</RadioItem>
</RadioGroup>
```

#### With Labels

```svelte
<Label>Shipping Method</Label>
<RadioGroup
	bind:value={shippingMethod}
	options={[
		{ value: 'standard', label: 'Standard (5-7 days)' },
		{ value: 'express', label: 'Express (2-3 days)' },
		{ value: 'overnight', label: 'Overnight (1 day)' }
	]} />
```

Note: RadioGroup has no `id` prop — each individual RadioItem (rendered internally when using `options`) gets its own auto-generated `id`, so label a group with a plain heading/`<Label>` above it rather than `for`/`id` association.

#### Payment Methods

```svelte
<Label>Payment Method</Label>
<RadioGroup
	bind:value={paymentMethod}
	options={[
		{ value: 'card', label: 'Credit Card' },
		{ value: 'paypal', label: 'PayPal' },
		{ value: 'bank', label: 'Bank Transfer' }
	]} />
```

#### With Descriptions

```svelte
<div class="space-y-3">
	<RadioItem value="monthly">
		<div>
			<p class="font-medium">Monthly</p>
			<p class="text-sm text-gray-600">$9.99/month</p>
		</div>
	</RadioItem>
	<RadioItem value="yearly">
		<div>
			<p class="font-medium">Yearly</p>
			<p class="text-sm text-gray-600">$99.99/year (Save 17%)</p>
		</div>
	</RadioItem>
</div>
```

#### With Icon Options

```svelte
<RadioGroup bind:value={iconStyle}>
	<RadioItem value="outline">
		<div class="flex items-center gap-2">
			<div class="h-8 w-8 rounded-full border-2 border-gray-300" />
			<span>Outline</span>
		</div>
	</RadioItem>
	<RadioItem value="filled">
		<div class="flex items-center gap-2">
			<div class="bg-primary-500 h-8 w-8 rounded-full" />
			<span>Filled</span>
		</div>
	</RadioItem>
</RadioGroup>
```

### Accessibility

- Arrow keys to navigate between options
- Space or Enter to select
- Proper ARIA role for radio groups
- Visible focus indicator
- Screen reader announces selected state

---

## RadioItem

Individual radio button component for use within RadioGroup or standalone.

### When to Use

- Custom radio button layouts
- Complex radio options with rich content
- Standalone radio buttons (without RadioGroup)

### Installation

```svelte
<script>
	import { RadioItem } from 'requify-design-system';
</script>
```

### Props API

| Prop             | Type      | Default | Description                                               |
| ---------------- | --------- | ------- | --------------------------------------------------------- |
| `value`          | `string`  | -       | Unique value for this option (required)                   |
| `children`       | `Snippet` | -       | Label content                                             |
| `id`             | `string`  | -       | HTML id for label association (auto-generated if omitted) |
| `labelClickable` | `boolean` | `true`  | If true, clicking the label also selects the radio        |
| `disabled`       | `boolean` | `false` | If true, option is disabled                               |

### Examples

#### Basic Usage

```svelte
<RadioItem value="option1">Option 1</RadioItem>
```

#### With Rich Content

```svelte
<RadioItem value="premium">
	<div class="flex items-center justify-between">
		<div>
			<p class="font-semibold">Premium Plan</p>
			<p class="text-sm text-gray-600">$29/month</p>
		</div>
		<Badge variant="success">Recommended</Badge>
	</div>
</RadioItem>
```

#### Disabled

```svelte
<RadioItem value="soldout" disabled>Sold Out</RadioItem>
```

### Accessibility

- Inherits accessibility from RadioGroup when used as child
- Standalone use requires proper name and label association

---

## Datepicker

Single date selection component with custom styling and keyboard support. Wraps bits-ui.DatePicker with internationalized date handling.

### When to Use

- Single date selection (appointment date, birthday, deadline)
- Date filtering
- Event scheduling

### Installation

```svelte
<script>
	import { Datepicker } from 'requify-design-system';
</script>
```

### Props API

| Prop       | Type         | Default | Description                                                    |
| ---------- | ------------ | ------- | -------------------------------------------------------------- |
| `value`    | `Date`       | -       | Currently selected date (bindable, undefined if none selected) |
| `minValue` | `Date`       | -       | Minimum selectable date (user cannot select earlier dates)     |
| `maxValue` | `Date`       | -       | Maximum selectable date (user cannot select later dates)       |
| `onChange` | `() => void` | -       | Callback when date selection changes                           |
| `class`    | `string`     | -       | Additional CSS classes to apply                                |

### Examples

#### Basic Usage

```svelte
<Datepicker bind:value={selectedDate} />
```

#### With Date Range Limits

```svelte
<Datepicker
	bind:value={appointmentDate}
	minValue={new Date('2024-01-01')}
	maxValue={new Date('2024-12-31')} />
```

#### With onChange Handler

```svelte
<Datepicker bind:value={eventDate} onChange={() => validateDate()} />
```

#### With Label

```svelte
<Label>Birth Date</Label>
<Datepicker bind:value={birthdate} />
```

Note: Datepicker has no `id` prop (or any pass-through HTML attributes) — label it with a plain `<Label>` above rather than `for`/`id` association.

#### Past Dates Only

```svelte
<Datepicker bind:value={historicalDate} maxValue={new Date()} />
```

#### Future Dates Only

```svelte
<Datepicker bind:value={futureDate} minValue={new Date()} />
```

#### With Helper Text

```svelte
<Label>Deadline</Label>
<Datepicker bind:value={deadline} />
<Helper>Select a date at least 7 days from now</Helper>
```

#### In Form

```svelte
<Card>
	<h3>Schedule Appointment</h3>
	<div class="mt-4 space-y-4">
		<div>
			<Label>Date</Label>
			<Datepicker bind:value={date} />
		</div>
		<Button variant={ButtonVariant.PRIMARY} onclick={confirm}>Confirm</Button>
	</div>
</Card>
```

### Accessibility

- Full keyboard date navigation (arrow keys, Page Up/Down)
- ARIA datepicker role with proper labels
- Today indicator (dot) for visual reference
- Focus management on open/close
- Screen reader announces selected date

---

## DateRangePicker

Date range selection component with two date inputs. Wraps bits-ui.DatePicker for range functionality.

### When to Use

- Booking systems (check-in/check-out)
- Date range filtering
- Event duration
- Report date ranges

### Installation

```svelte
<script>
	import { DateRangePicker } from 'requify-design-system';
</script>
```

### Props API

| Prop       | Type                | Default | Description                                                                                                             |
| ---------- | ------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------- |
| `value`    | `DateRange \| Date` | -       | Selected date range (bindable). `DateRange` is `{ start?: Date; end?: Date }`; a single `Date` is treated as start-only |
| `onChange` | `() => void`        | -       | Callback when date range changes                                                                                        |
| `class`    | `string`            | -       | Additional CSS classes to apply                                                                                         |

Note: there are no separate `start`/`end`/`minStart`/`maxEnd` props — bind a single `value` object instead.

### Examples

#### Basic Usage

```svelte
<script>
	let dateRange = $state({ start: undefined, end: undefined });
</script>

<DateRangePicker bind:value={dateRange} />
```

#### With onChange Handler

```svelte
<DateRangePicker bind:value={stayDates} onChange={() => checkAvailability()} />
```

#### Hotel Booking

```svelte
<script>
	let stayDates = $state({ start: undefined, end: undefined });
</script>

<Label>Stay Duration</Label>
<DateRangePicker bind:value={stayDates} />
<Helper>
	{guests} guest(s)
</Helper>
```

### Accessibility

- Full keyboard date navigation for both calendars
- ARIA datepicker roles with proper labels
- Screen reader announces the selected range

---

## Search

Search input with built-in search icon and proper styling. Extends HTML input with search-specific defaults.

### When to Use

- Search fields (products, users, content)
- Filter inputs
- Global search bars
- Any text-based search functionality

### Installation

```svelte
<script>
	import { Search } from 'requify-design-system';
</script>
```

### Props API

| Prop          | Type                   | Default       | Description                               |
| ------------- | ---------------------- | ------------- | ----------------------------------------- |
| `value`       | `string`               | -             | Search input value (bindable)             |
| `size`        | `'sm' \| 'md' \| 'lg'` | `'md'`        | Input size affecting height and text size |
| `class`       | `string`               | -             | Additional CSS classes to apply           |
| `placeholder` | `string`               | `'Search...'` | Placeholder text                          |

### Examples

#### Basic Usage

```svelte
<Search bind:value={searchQuery} />
```

#### All Sizes

```svelte
<Search size="sm" bind:value={quickSearch} />
<Search size="md" bind:value={standardSearch} />
<Search size="lg" bind:value={advancedSearch} />
```

#### Custom Placeholder

```svelte
<Search placeholder="Search products..." bind:value={productSearch} />
```

#### With Label

```svelte
<Label for="global">Global Search</Label>
<Search id="global" bind:value={globalSearch} />
```

#### Full Width

```svelte
<Search class="max-w-md" bind:value={search} />
```

#### In Header

```svelte
<div class="flex items-center gap-4">
	<Logo />
	<Search class="max-w-lg" bind:value={search} />
	<UserMenu />
</div>
```

#### With Submit Button

```svelte
<form onsubmit={handleSearch} class="flex gap-2">
	<Search bind:value={searchQuery} />
	<Button type="submit">Search</Button>
</form>
```

#### With Filters

```svelte
<div class="space-y-3">
	<Search placeholder="Search by name or email..." bind:value={userSearch} />
	<Select bind:value={roleFilter} options={roleOptions} />
</div>
```

### Accessibility

- type="search" for proper search semantics
- Search icon provides visual context
- Keyboard focusable with proper focus ring
- Proper label association (add Label component)
- Placeholder text for screen readers

---

## Related Components

- [Foundation Components](./foundation.md) - Input, Label, Textarea, Badge, Button
- [Feedback Components](./feedback.md) - Helper, Alert (for validation messages)
- [Helper Component](../foundation.md#helper) - Form helper text
