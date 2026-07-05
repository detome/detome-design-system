# Usage Guides

Comprehensive guides for using the Detome Design System effectively.

## Table of Contents

- [Theming](#theming)
- [Dark Mode](#dark-mode)
- [Composition Patterns](#composition-patterns)
- [Best Practices](#best-practices)
- [Migration Guide](#migration-guide)
- [Performance Optimization](#performance-optimization)

---

## Theming

### Overview

The Detome Design System uses CSS custom properties (variables) for colors, allowing you to fully customize the theme without modifying component code.

### Color Variables

All components reference these color variables:

```css
@import 'tailwindcss';

/* Import design system styles - REQUIRED for components to work properly */
@source '../node_modules/@requify/requify-design-system/**/*.{svelte,js}';

:root {
	/* Primary brand color - main action buttons, links, key elements */
	--color-primary-50: #f0f4ff;
	--color-primary-100: #e0e7ff;
	--color-primary-200: #c7d2fe;
	--color-primary-300: #a4b4fc;
	--color-primary-400: #819ef8;
	--color-primary-500: #6366f1;
	--color-primary-600: #4f46e5;
	--color-primary-700: #4338ca;
	--color-primary-800: #3730a3;
	--color-primary-900: #312e81;

	/* Secondary/accent color - secondary actions, highlights */
	--color-secondary-500: #d97706;
	--color-secondary-600: #b45309;

	/* Semantic colors - feedback, validation, status */
	--color-success-500: #22c55e;
	--color-success-600: #16a34a;

	--color-error-500: #ef4444;
	--color-error-600: #dc2626;

	--color-warning-500: #f59e0b;
	--color-warning-600: #d97706;

	--color-info-500: #3b82f6;
	--color-info-600: #2563eb;

	/* Neutral grays - borders, backgrounds, text */
	--color-gray-50: #f9fafb;
	--color-gray-100: #f3f4f6;
	--color-gray-200: #e5e7eb;
	--color-gray-300: #d1d5db;
	--color-gray-400: #9ca3af;
	--color-gray-500: #6b7280;
	--color-gray-600: #4b5563;
	--color-gray-700: #374151;
	--color-gray-800: #1f2937;
	--color-gray-900: #111827;
}
```

### Customizing Your Theme

Add this to your global CSS file (e.g., `app.css` or `global.css`):

```css
@import 'tailwindcss';

/* Import design system styles - REQUIRED for components to work properly */
@source '../node_modules/@requify/requify-design-system/**/*.{svelte,js}';

/* Override primary brand color to match your brand */
:root {
	--color-primary-500: #3b82f6;
	--color-primary-600: #2563eb;

	/* Override secondary/accent color */
	--color-secondary-500: #8b5cf6;
	--color-secondary-600: #7c3aed;

	/* Override success color */
	--color-success-500: #10b981;
	--color-success-600: #059669;

	/* Override error color */
	--color-error-500: #f43f5e;
	--color-error-600: #e11d48;

	/* Override warning color */
	--color-warning-500: #f97316;
	--color-warning-600: #ea580c;
}
```

### Multiple Themes

You can create multiple themes using CSS variables and data attributes:

```css
/* Light theme (default) */
:root {
	--color-primary-500: #6366f1;
	--color-gray-800: #1f2937;
	--color-gray-900: #111827;
}

/* Dark theme */
[data-theme='dark'] {
	--color-primary-500: #818cf8;
	--color-gray-800: #374151;
	--color-gray-900: #1f2937;
}

/* Custom brand theme */
[data-theme='brand-x'] {
	--color-primary-500: #0ea5e9;
	--color-primary-600: #0284c7;
}
```

### Theme Switching Example

```svelte
<script lang="ts">
	import { setContext } from 'svelte';

	let theme = $state<'light' | 'dark' | 'brand'>('light');

	function setTheme(newTheme: typeof theme) {
		theme = newTheme;
		document.documentElement.setAttribute('data-theme', newTheme);
	}
</script>

<button onclick={() => setTheme('dark')}>Dark Theme</button>
<button onclick={() => setTheme('brand')}>Brand Theme</button>
```

---

## Dark Mode

### Automatic Dark Mode

All components automatically support dark mode when the `dark` class is present on a parent element or `html` tag.

### Enabling Dark Mode

**Option 1: System preference**

```css
/* Automatically use system preference */
@media (prefers-color-scheme: dark) {
	:root {
		--color-primary-500: #818cf8;
		--color-gray-800: #f3f4f6;
		--color-gray-900: #ffffff;
		/* Override other colors for dark mode */
	}
}
```

**Option 2: Manual toggle**

```svelte
<script lang="ts">
	import { onMount } from 'svelte';

	let isDarkMode = $state(false);

	function toggleDarkMode() {
		isDarkMode = !isDarkMode;
		document.documentElement.classList.toggle('dark', isDarkMode);
	}

	// Check system preference on mount
	onMount(() => {
		isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
		document.documentElement.classList.toggle('dark', isDarkMode);
	});
</script>

<button onclick={toggleDarkMode}>
	{isDarkMode ? '☀️ Light' : '🌙 Dark'}
</button>
```

### Custom Dark Mode Colors

Override specific colors for dark mode:

```css
/* Light mode (default) */
:root {
	--color-gray-900: #111827;
	--color-gray-800: #1f2937;
	--color-gray-700: #374151;
}

/* Dark mode overrides */
html.dark {
	--color-gray-900: #f9fafb;
	--color-gray-800: #f3f4f6;
	--color-gray-700: #e5e7eb;

	/* Adjust primary color for dark mode */
	--color-primary-500: #818cf8;
	--color-primary-600: #6366f1;
}
```

---

## Composition Patterns

### Button Grouping

Group related buttons together:

```svelte
<script lang="ts">
	import { Button, ButtonGroup } from '@requify/requify-design-system';
	import { ButtonVariant } from '@requify/requify-design-system';
</script>

<ButtonGroup>
	<Button variant={ButtonVariant.OUTLINE}>Cancel</Button>
	<Button variant={ButtonVariant.PRIMARY}>Confirm</Button>
</ButtonGroup>
```

### Form Composition

Build complex forms with proper structure:

```svelte
<script lang="ts">
	import { Card, Input, Label, Button, Helper } from '@requify/requify-design-system';
	import { ButtonVariant } from '@requify/requify-design-system';

	let name = $state('');
	let email = $state('');
	let password = $state('');
</script>

<Card variant="default">
	<form onsubmit={handleSubmit}>
		<!-- Name field -->
		<div class="mb-4">
			<Label for="name" required>Name</Label>
			<Input id="name" bind:value={name} placeholder="John Doe" />
			<Helper text="Your full name as it appears on official documents" />
		</div>

		<!-- Email field -->
		<div class="mb-4">
			<Label for="email" required>Email</Label>
			<Input
				id="email"
				type="email"
				bind:value={email}
				placeholder="john@example.com"
				error={emailError} />
			{#if emailError}
				<Helper text={emailError} error />
			{/if}
		</div>

		<!-- Password field with icon -->
		<div class="mb-6">
			<Label for="password" required>Password</Label>
			<Input id="password" type="password" bind:value={password} placeholder="••••••••••">
				{#snippet left()}
					<Lock class="h-4 w-4" />
				{/snippet}
			</Input>
		</div>

		<!-- Action buttons -->
		<div class="flex justify-end gap-3">
			<Button variant={ButtonVariant.OUTLINE} onclick={() => (window.location.href = '/login')}>
				Back to Login
			</Button>
			<Button variant={ButtonVariant.PRIMARY} type="submit">Create Account</Button>
		</div>
	</form>
</Card>
```

### Modal with Form

```svelte
<script lang="ts">
	import { Modal, Input, Label, Button } from '@requify/requify-design-system';
	import { ModalSize, ButtonVariant } from '@requify/requify-design-system';

	let isOpen = $state(false);
	let title = $state('');
	let description = $state('');
</script>

<Modal bind:open={isOpen} size={ModalSize.LG} title="Create Post">
	<div class="space-y-4">
		<div>
			<Label for="post-title" required>Title</Label>
			<Input id="post-title" bind:value={title} placeholder="Enter post title" />
		</div>

		<div>
			<Label for="post-description" required>Description</Label>
			<Textarea id="post-description" bind:value={description} placeholder="What's on your mind?" />
		</div>
	</div>

	{#snippet footer()}
		<div class="flex justify-end gap-3">
			<Button variant={ButtonVariant.OUTLINE} onclick={() => (isOpen = false)}>Cancel</Button>
			<Button variant={ButtonVariant.PRIMARY} onclick={handleCreate}>Create Post</Button>
		</div>
	{/snippet}
</Modal>
```

### Sidebar with Navigation

```svelte
<script lang="ts">
	import {
		Sidebar,
		SidebarGroup,
		SidebarItem,
		SidebarDropdown
	} from '@requify/requify-design-system';
</script>

<Sidebar activeUrl="/dashboard">
	<SidebarGroup title="Main Navigation">
		<SidebarItem href="/dashboard">
			{#snippet icon()}
				<Home class="h-5 w-5" />
			{/snippet}
			Dashboard
		</SidebarItem>
		<SidebarItem href="/analytics">
			{#snippet icon()}
				<BarChart class="h-5 w-5" />
			{/snippet}
			Analytics
		</SidebarItem>
		<SidebarItem href="/settings">
			{#snippet icon()}
				<Settings class="h-5 w-5" />
			{/snippet}
			Settings
		</SidebarItem>
	</SidebarGroup>

	<SidebarGroup title="Projects">
		<SidebarItem href="/projects/website">
			{#snippet icon()}
				<Globe class="h-5 w-5" />
			{/snippet}
			Website
		</SidebarItem>
		<SidebarItem href="/projects/mobile-app">
			{#snippet icon()}
				<Smartphone class="h-5 w-5" />
			{/snippet}
			Mobile App
		</SidebarItem>
	</SidebarGroup>

	<SidebarDropdown title="More">
		<SidebarItem href="/documentation">Documentation</SidebarItem>
		<SidebarItem href="/support">Support</SidebarItem>
		<SidebarItem href="/help">Help Center</SidebarItem>
	</SidebarDropdown>
</Sidebar>
```

### Tabs with Complex Content

```svelte
<script lang="ts">
	import { Tabs, TabsList, TabsTrigger, TabsContent } from '@requify/requify-design-system';
	import { Button } from '@requify/requify-design-system';
	import { ButtonVariant } from '@requify/requify-design-system';

	let activeTab = $state('overview');
</script>

<Tabs bind:value={activeTab}>
	<TabsList>
		<TabsTrigger value="overview">Overview</TabsTrigger>
		<TabsTrigger value="settings">Settings</TabsTrigger>
		<TabsTrigger value="advanced">Advanced</TabsTrigger>
	</TabsList>

	<TabsContent value="overview">
		<div class="space-y-4">
			<h3>Overview Tab</h3>
			<p>This is the overview content.</p>
			<Button variant={ButtonVariant.PRIMARY}>Get Started</Button>
		</div>
	</TabsContent>

	<TabsContent value="settings">
		<div class="space-y-4">
			<h3>Settings Tab</h3>
			<p>Configure your preferences here.</p>
			<ul class="list-disc space-y-2 pl-5">
				<li>Option 1</li>
				<li>Option 2</li>
				<li>Option 3</li>
			</ul>
		</div>
	</TabsContent>

	<TabsContent value="advanced">
		<div class="space-y-4">
			<h3>Advanced Tab</h3>
			<p>Advanced configuration options.</p>
			<Button variant={ButtonVariant.DANGER}>Reset All</Button>
		</div>
	</TabsContent>
</Tabs>
```

### Table with Actions

```svelte
<script lang="ts">
	import {
		Table,
		TableHead,
		TableHeadCell,
		TableBody,
		TableBodyRow,
		TableBodyCell
	} from '@requify/requify-design-system';
	import { Button, Badge } from '@requify/requify-design-system';
	import { ButtonVariant, BadgeVariant } from '@requify/requify-design-system';

	type User = {
		id: number;
		name: string;
		email: string;
		status: 'active' | 'inactive';
	};

	let users = $state<User[]>([
		{ id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
		{ id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active' },
		{ id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'inactive' }
	]);
</script>

<Table>
	<TableHead>
		<TableBodyRow>
			<TableHeadCell>Name</TableHeadCell>
			<TableHeadCell>Email</TableHeadCell>
			<TableHeadCell>Status</TableHeadCell>
			<TableHeadCell>Actions</TableHeadCell>
		</TableBodyRow>
	</TableHead>
	<TableBody>
		{#each users as user}
			<TableBodyRow>
				<TableBodyCell>{user.name}</TableBodyCell>
				<TableBodyCell>{user.email}</TableBodyCell>
				<TableBodyCell>
					<Badge variant={user.status === 'active' ? BadgeVariant.SUCCESS : BadgeVariant.DEFAULT}>
						{user.status}
					</Badge>
				</TableBodyCell>
				<TableBodyCell>
					<div class="flex gap-2">
						<Button variant={ButtonVariant.GHOST} size="sm">Edit</Button>
						<Button variant={ButtonVariant.DANGER} size="sm">Delete</Button>
					</div>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
```

---

## Best Practices

### 1. Use TypeScript and Enums

Always import and use enums for type safety:

```typescript
// Good - Type-safe
import { Button, ButtonVariant } from '@requify/requify-design-system';
<Button variant={ButtonVariant.PRIMARY}>Click</Button>

// Avoid - String literals (no type safety)
import { Button } from '@requify/requify-design-system';
<Button variant="primary">Click</Button>  // ❌ No autocomplete or type checking
```

### 2. Leverage Snippets for Flexibility

Use snippets for icons, headers, and custom content:

```svelte
<script lang="ts">
	import { Button } from '@requify/requify-design-system';
	import { Search, Save } from '@lucide/svelte';
</script>

<!-- Search button with icon -->
<Button variant={ButtonVariant.PRIMARY}>
	{#snippet icon()}
		<Search class="h-4 w-4" />
	{/snippet}
	Search
</Button>

<!-- Save button with icon -->
<Button variant={ButtonVariant.SUCCESS}>
	{#snippet icon()}
		<Save class="h-4 w-4" />
	{/snippet}
	Save Changes
</Button>
```

### 3. Proper Form Structure

Always pair inputs with labels and use proper IDs:

```svelte
<!-- Good - Proper association -->
<Label for="email">Email Address</Label>
<Input id="email" bind:value={email} type="email" />

<!-- Bad - No association -->
<Input bind:value={email} type="email" placeholder="Email" />
```

### 4. Handle Loading States

Use loading state to prevent duplicate submissions:

```svelte
<script lang="ts">
	import { Button } from '@requify/requify-design-system';
	import { ButtonVariant } from '@requify/requify-design-system';

	let isSubmitting = $state(false);

	async function handleSubmit() {
		isSubmitting = true;
		try {
			await submitForm();
		} finally {
			isSubmitting = false;
		}
	}
</script>

<Button variant={ButtonVariant.PRIMARY} loading={isSubmitting} onclick={handleSubmit}>
	{#snippet icon()}
		<Save class="h-4 w-4" />
	{/snippet}
	{isSubmitting ? 'Saving...' : 'Save'}
</Button>
```

### 5. Error Validation

Display errors clearly with proper visual feedback:

```svelte
<script lang="ts">
	import { Input, Label, Helper } from '@requify/requify-design-system';

	let email = $state('');
	let emailError = $derived(
		email && !email.includes('@') ? 'Please enter a valid email address' : ''
	);
</script>

<Label for="email">Email Address</Label>
<Input id="email" bind:value={email} error={emailError} />
{#if emailError}
	<Helper text={emailError} error />
{/if}
```

### 6. Consistent Size Usage

Use consistent sizes within groups for better UX:

```svelte
<script lang="ts">
	import { Input, Button, Select } from '@requify/requify-design-system';
	import { ComponentSize } from '@requify/requify-design-system';
</script>

<!-- All same size for consistency -->
<div class="space-y-4">
	<Input size={ComponentSize.MD} />
	<Select size={ComponentSize.MD} />
	<Button size={ComponentSize.MD}>Submit</Button>
</div>
```

### 7. Accessibility First

Always ensure keyboard accessibility:

```svelte
<!-- Add keyboard shortcuts -->
<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		const handleShortcut = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				openModal();
			}
		};
		window.addEventListener('keydown', handleShortcut);
		return () => window.removeEventListener('keydown', handleShortcut);
	});
</script>

<!-- Good - Keyboard accessible -->
<Button onclick={handleAction}>Click or press Enter</Button>

<p class="text-sm text-gray-500">Press ⌘K to open</p>
```

### 8. Responsive Design

Use size variants for different screen sizes:

```svelte
<script lang="ts">
	import { Button } from '@requify/requify-design-system';
	import { ButtonVariant, ComponentSize } from '@requify/requify-design-system';
</script>

<!-- Responsive button sizes -->
<Button variant={ButtonVariant.PRIMARY} size={ComponentSize.SM} class="md:size-MD lg:size-LG">
	Responsive Button
</Button>
```

---

## Migration Guide

### From Tailwind Classes

If you're migrating from custom Tailwind classes:

```svelte
<!-- Before -->
<button class="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Click me</button>

<!-- After -->
<Button variant={ButtonVariant.PRIMARY}>Click me</Button>
```

### From Other UI Libraries

**Common patterns:**

| Other Library         | Detome Design System              |
| --------------------- | --------------------------------- |
| `variant="contained"` | `variant={ButtonVariant.PRIMARY}` |
| `size="small"`        | `size={ComponentSize.SM}`         |
| `icon={<Icon />}`     | `icon` snippet                    |
| `isLoading`           | `loading`                         |
| `fullWidth`           | `fullWidth`                       |

### Breaking Changes

When upgrading, check for breaking changes in CHANGELOG.md.

---

## Performance Optimization

### 1. Lazy Load Components

```svelte
<script lang="ts">
	// Lazy load heavy components
	const Modal = lazy(() => import('@requify/requify-design-system').then((m) => m.Modal));
	const DateRangePicker = lazy(() =>
		import('@requify/requify-design-system').then((m) => m.DateRangePicker)
	);
</script>

<Modal>...</Modal>
```

### 2. Debounce Search

```svelte
<script lang="ts">
	import { Search } from '@requify/requify-design-system';

	let searchQuery = $state('');

	let debouncedSearch = $derived(
		debounce((query: string) => {
			performSearch(query);
		}, 300)
	);

	$effect(() => {
		debouncedSearch(searchQuery);
	});
</script>

<Search bind:value={searchQuery} />
```

### 3. Optimize Lists

```svelte
<script lang="ts">
	import { Listgroup, ListgroupItem } from '@requify/requify-design-system';

	// Use $derived for computed values
	let items = $state([dataset]); // Large dataset
</script>

<Listgroup>
	{#each items as item, i (item.id)}
		<ListgroupItem>{item.name}</ListgroupItem>
	{/each}
</Listgroup>
```

### 4. Avoid Re-renders

Use proper state management:

```svelte
<script lang="ts">
	// Good - Minimal re-renders
	let activeTab = $state('tab1');

	// Avoid - Excessive re-renders
	// let activeTab = 'tab1';
</script>

<Tabs bind:value={activeTab}>
	<!-- Content -->
</Tabs>
```

---

## Troubleshooting

### Component Not Rendering

1. Check import paths
2. Verify component is exported from `@requify/requify-design-system`
3. Check browser console for errors

### Styles Not Applying

1. Ensure Tailwind CSS is configured
2. **Add `@source '../node_modules/@requify/requify-design-system/**/\*.{svelte,js}'` to your CSS file\*\* - this is required for components to work
3. Check CSS custom properties are defined
4. Verify component class names match Tailwind config

### TypeScript Errors

1. Run `pnpm run check` to see detailed errors
2. Check component props interface
3. Verify enum imports

### Accessibility Issues

1. Check ARIA attributes with browser dev tools
2. Test keyboard navigation
3. Verify screen reader announces content

---

## Getting Help

- **Documentation**: https://github.com/requify/requify-design-system
- **Issues**: https://github.com/requify/requify-design-system/issues
- **Context7**: Add documentation for AI assistance
