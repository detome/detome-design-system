# Other Components

Additional utility and layout components that don't fit into other categories, including images, separators, toolbars, and form helpers.

## Table of Contents

- [Img](#img)
- [Hr](#hr)
- [Toolbar](#toolbar)
- [ToolbarButton](#toolbarbutton)
- [ToolbarGroup](#toolbargroup)
- [Helper](#helper)
- [Form Helper](#form-helper)

---

## Img

Image component with consistent styling and loading behavior.

### When to Use

- Displaying images
- Avatar images
- Product images
- Content images

### Installation

```svelte
<script>
	import { Img } from 'requify-design-system';
</script>
```

### Props API

| Prop    | Type     | Default | Description                           |
| ------- | -------- | ------- | ------------------------------------- |
| `src`   | `string` | -       | Image source URL (required)           |
| `alt`   | `string` | -       | Alt text for accessibility (required) |
| `class` | `string` | -       | Additional CSS classes to apply       |

Note: `loading`/`width`/`height`/`srcset`/etc. are native `<img>` attributes passed straight through — there is no component-level default for `loading` and no built-in fallback-image behavior.

### Examples

#### Basic Image

```svelte
<Img src="/image.jpg" alt="Description" />
```

#### Lazy Loading

```svelte
<Img src="/large-image.jpg" alt="Large image" loading="lazy" />
```

#### With Custom Styling

```svelte
<Img src="/product.jpg" alt="Product" class="rounded-lg shadow-md" />
```

#### Responsive Image

```svelte
<Img src="/responsive-image.jpg" alt="Responsive content" class="h-auto w-full" />
```

### Accessibility

- Alt text for screen readers
- Lazy loading for performance
- Semantic img element

---

## Hr

Horizontal rule component for visual separation.

### When to Use

- Section breaks
- Visual separators
- Content organization
- Layout divisions

### Installation

```svelte
<script>
	import { Hr } from 'requify-design-system';
</script>
```

### Props API

| Prop    | Type     | Default | Description                     |
| ------- | -------- | ------- | ------------------------------- |
| `class` | `string` | -       | Additional CSS classes to apply |

Note: there is no `variant` prop — use `class` for dashed/dotted styles (e.g. `class="border-dashed"`).

### Examples

#### Basic Separator

```svelte
<Hr />
```

#### With Custom Styling

```svelte
<Hr class="my-8 border-gray-300" />
```

#### With Text

```svelte
<div class="my-8 flex items-center gap-4">
	<Hr class="flex-1" />
	<span class="text-sm text-gray-600">OR</span>
	<Hr class="flex-1" />
</div>
```

### Accessibility

- Semantic hr element
- Visual separator for screen readers

---

## Toolbar

Toolbar container for organizing action buttons and tools. Flexible horizontal layout with automatic wrapping.

### When to Use

- Text editor toolbars
- Action button groups
- Format controls
- Tool panels

### Installation

```svelte
<script>
	import { Toolbar, ToolbarButton, ToolbarGroup } from 'requify-design-system';
</script>
```

### Props API

| Prop       | Type      | Default | Description                              |
| ---------- | --------- | ------- | ---------------------------------------- |
| `children` | `Snippet` | -       | ToolbarButton or ToolbarGroup components |
| `class`    | `string`  | -       | Additional CSS classes to apply          |

### Examples

#### Basic Toolbar

```svelte
<Toolbar>
	<ToolbarButton onclick={handleBold}>
		<Bold class="h-4 w-4" />
	</ToolbarButton>
	<ToolbarButton onclick={handleItalic}>
		<Italic class="h-4 w-4" />
	</ToolbarButton>
</Toolbar>
```

#### With Groups

```svelte
<Toolbar>
	<ToolbarGroup>
		<ToolbarButton>Undo</ToolbarButton>
		<ToolbarButton>Redo</ToolbarButton>
	</ToolbarGroup>
	<ToolbarGroup>
		<ToolbarButton>Cut</ToolbarButton>
		<ToolbarButton>Copy</ToolbarButton>
		<ToolbarButton>Paste</ToolbarButton>
	</ToolbarGroup>
</Toolbar>
```

#### With Custom Styling

```svelte
<Toolbar class="rounded-lg bg-gray-100 p-2">
	<ToolbarButton>Action</ToolbarButton>
</Toolbar>
```

#### Vertical Alignment

```svelte
<Toolbar class="flex-col gap-2">
	<ToolbarButton>Top</ToolbarButton>
	<ToolbarButton>Middle</ToolbarButton>
	<ToolbarButton>Bottom</ToolbarButton>
</Toolbar>
```

#### With Labels

```svelte
<Toolbar>
	<ToolbarButton aria-label="Bold">
		<Bold class="h-4 w-4" />
	</ToolbarButton>
	<ToolbarButton aria-label="Italic">
		<Italic class="h-4 w-4" />
	</ToolbarButton>
</Toolbar>
```

### Accessibility

- Proper ARIA labeling for screen readers
- Keyboard navigable buttons
- Visible focus indicators
- Logical grouping with ToolbarGroup

---

## ToolbarButton

Individual toolbar button with icon support.

### Installation

```svelte
<script>
	import { ToolbarButton } from 'requify-design-system';
</script>
```

### Props API

| Prop       | Type                      | Default | Description                     |
| ---------- | ------------------------- | ------- | ------------------------------- |
| `children` | `Snippet`                 | -       | Button content (icon or text)   |
| `class`    | `string`                  | -       | Additional CSS classes to apply |
| `onclick`  | `(e: MouseEvent) => void` | -       | Click handler                   |

### Examples

```svelte
<ToolbarButton onclick={handleBold}>
	<Bold class="h-4 w-4" />
</ToolbarButton>
```

---

## ToolbarGroup

Grouped toolbar buttons with visual connection.

### Installation

```svelte
<script>
	import { ToolbarGroup } from 'requify-design-system';
</script>
```

### Props API

| Prop       | Type      | Default | Description                     |
| ---------- | --------- | ------- | ------------------------------- |
| `children` | `Snippet` | -       | ToolbarButton components        |
| `class`    | `string`  | -       | Additional CSS classes to apply |

### Examples

```svelte
<ToolbarGroup>
	<ToolbarButton>Undo</ToolbarButton>
	<ToolbarButton>Redo</ToolbarButton>
</ToolbarGroup>
```

---

## Helper

Helper text component for form fields and descriptions. Provides contextual information below form inputs.

### When to Use

- Form field descriptions
- Input hints
- Validation messages
- Character counts
- Format hints

### Installation

```svelte
<script>
	import { Helper } from 'requify-design-system';
</script>
```

### Props API

| Prop       | Type                                          | Default  | Description                     |
| ---------- | --------------------------------------------- | -------- | ------------------------------- |
| `children` | `Snippet`                                     | -        | Helper text content             |
| `class`    | `string`                                      | -        | Additional CSS classes to apply |
| `color`    | `'info' \| 'success' \| 'error' \| 'warning'` | `'info'` | Text color variant              |

### Examples

#### Default Helper Text

```svelte
<Helper>Enter your email address</Helper>
```

#### Error Message

```svelte
<Helper color="error">Email is required</Helper>
```

#### Success Message

```svelte
<Helper color="success">Email is valid</Helper>
```

#### Warning Message

```svelte
<Helper color="warning">Email will be shared</Helper>
```

#### With Character Count

```svelte
<Helper>
	{charsWritten}/500 characters
</Helper>
```

#### With Format Hint

```svelte
<Helper>Format: MM/DD/YYYY</Helper>
```

#### With Link

```svelte
<Helper>
	By signing up, you agree to our
	<A href="/terms">Terms of Service</A>
</Helper>
```

#### With Icon

```svelte
<Helper color="success">
	<Check class="mr-1 inline h-3 w-3" />
	Password is strong
</Helper>
```

### Accessibility

- Should be associated with form field via aria-describedby
- Color variants provide semantic meaning
- Screen reader accessible helper text
- High contrast for all color variants

---

## Form Helper

Helper component designed specifically for form fields. Works seamlessly with Input, Textarea, and other form components.

### When to Use

- Form field descriptions
- Input format hints
- Validation feedback
- Helper text below inputs
- Form guidance

### Installation

```svelte
<script>
	import { Helper } from 'requify-design-system';
</script>
```

### Examples

#### Basic Form Helper

```svelte
<Label for="email">Email</Label>
<Input id="email" />
<Helper>Enter your work email address</Helper>
```

#### With Validation

```svelte
<Label for="password">Password</Label>
<Input id="password" />
<Helper color="error">Password must be at least 8 characters</Helper>
```

#### Format Hint

```svelte
<Label for="phone">Phone</Label>
<Input id="phone" />
<Helper>Format: (555) 123-4567</Helper>
```

#### Character Count

```svelte
<script>
	let message = $state('');
</script>

<Label for="message">Message</Label>
<Textarea id="message" bind:value={message} />
<Helper>{message.length}/500 characters</Helper>
```

#### Multiple Helpers

```svelte
<div class="space-y-2">
	<Helper>Enter your full name</Helper>
	<Helper color="warning">This will be visible on your profile</Helper>
</div>
```

### Accessibility

- Associated with form field via aria-describedby
- Color variants convey meaning (error, success, warning)
- Screen reader announces helper text
- High contrast for readability

---

## Related Components

- [Foundation Components](./foundation.md) - Input, Label, Textarea, Button
- [Form Components](./forms.md) - Form controls
- [Typography Components](./typography.md) - P (for text content)
