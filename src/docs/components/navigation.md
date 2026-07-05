# Navigation Components

Navigation components provide various patterns for organizing and navigating through application content, including menus, breadcrumbs, tabs, and sidebars.

## Table of Contents

- [Sidebar](#sidebar)
- [Tabs](#tabs)
- [TabsList](#tabslist)
- [TabsTrigger](#tabstrigger)
- [TabsContent](#tabscontent)
- [Breadcrumb](#breadcrumb)
- [BreadcrumbItem](#breadcrumbitem)
- [Pagination](#pagination)
- [Accordion](#accordion)
- [AccordionItem](#accordionitem)
- [Dropdown](#dropdown)
- [DropdownItem](#dropdownitem)
- [DropdownDivider](#dropdowndivider)
- [DropdownHeader](#dropdownheader)
- [DropdownLink](#dropdownlink)

---

## Sidebar

Main sidebar navigation component. Provides active URL context for child items.

### When to Use

- Main application navigation
- Side panel navigation
- Documentation table of contents
- Settings navigation
- Multi-level navigation menus

### Installation

```svelte
<script>
	import { Sidebar, SidebarGroup, SidebarItem, SidebarDropdown } from 'requify-design-system';
</script>
```

### Props API

| Prop        | Type      | Default | Description                                                   |
| ----------- | --------- | ------- | ------------------------------------------------------------- |
| `activeUrl` | `string`  | `''`    | URL of currently active page (passed to children via context) |
| `children`  | `Snippet` | -       | SidebarGroup, SidebarItem, SidebarDropdown components         |
| `class`     | `string`  | -       | Additional CSS classes to apply                               |

### Examples

#### Basic Usage

```svelte
<Sidebar>
	<SidebarGroup>
		<SidebarItem label="Dashboard" href="/dashboard">
			{#snippet icon()}
				<Home class="h-5 w-5" />
			{/snippet}
		</SidebarItem>
		<SidebarItem label="Settings" href="/settings">
			{#snippet icon()}
				<Settings class="h-5 w-5" />
			{/snippet}
		</SidebarItem>
	</SidebarGroup>
</Sidebar>
```

#### With Active URL

```svelte
<Sidebar activeUrl="/dashboard">
	<SidebarGroup>
		<SidebarItem label="Dashboard" href="/dashboard" />
		<SidebarItem label="Reports" href="/reports" />
	</SidebarGroup>
</Sidebar>
```

#### With Multiple Groups

```svelte
<Sidebar>
	<SidebarGroup>
		<SidebarItem label="Home" href="/" />
		<SidebarItem label="Dashboard" href="/dashboard" />
	</SidebarGroup>
	<SidebarGroup rounded>
		<SidebarItem label="Profile" href="/settings/profile" />
		<SidebarItem label="Account" href="/settings/account" />
	</SidebarGroup>
</Sidebar>
```

#### With Dropdown

```svelte
<Sidebar>
	<SidebarGroup>
		<SidebarItem label="Home" href="/home" />
		<SidebarDropdown label="More">
			<SidebarItem label="Settings" href="/settings" />
			<SidebarItem label="Help" href="/help" />
		</SidebarDropdown>
	</SidebarGroup>
</Sidebar>
```

#### Custom Styling

```svelte
<Sidebar class="sidebar-custom">
	<SidebarGroup>
		<SidebarItem label="Home" href="/home" />
	</SidebarGroup>
</Sidebar>
```

### Accessibility

- Semantic `<aside>` element
- Provides active URL context to children
- Keyboard navigable items
- Responsive behavior (collapsible on mobile)

---

## SidebarGroup

Group container for sidebar items with optional rounded background styling.

### Installation

```svelte
<script>
	import { SidebarGroup } from 'requify-design-system';
</script>
```

### Props API

| Prop       | Type      | Default | Description                                   |
| ---------- | --------- | ------- | --------------------------------------------- |
| `rounded`  | `boolean` | `false` | Wraps items in a rounded background container |
| `children` | `Snippet` | -       | SidebarItem or SidebarDropdown components     |
| `class`    | `string`  | -       | Additional CSS classes to apply               |

### Examples

```svelte
<Sidebar>
	<SidebarGroup rounded>
		<SidebarItem label="Dashboard" href="/dashboard" />
	</SidebarGroup>
</Sidebar>
```

---

## SidebarItem

Individual navigation item in sidebar. Supports icons and active state detection.

### Installation

```svelte
<script>
	import { SidebarItem } from 'requify-design-system';
</script>
```

### Props API

| Prop       | Type      | Default | Description                                      |
| ---------- | --------- | ------- | ------------------------------------------------ |
| `label`    | `string`  | -       | Text label for the item (required)               |
| `href`     | `string`  | -       | Link URL (required)                              |
| `icon`     | `Snippet` | -       | Leading icon slot                                |
| `children` | `Snippet` | -       | Extra trailing content displayed after the label |
| `nested`   | `boolean` | `false` | Adds indentation for nested items                |
| `class`    | `string`  | -       | Additional CSS classes to apply                  |

### Examples

```svelte
<SidebarItem label="Dashboard" href="/dashboard">
	{#snippet icon()}
		<Dashboard class="h-5 w-5" />
	{/snippet}
</SidebarItem>
```

---

## SidebarDropdown

Collapsible dropdown section within sidebar for nested navigation items.

### Installation

```svelte
<script>
	import { SidebarDropdown } from 'requify-design-system';
</script>
```

### Props API

| Prop          | Type      | Default | Description            |
| ------------- | --------- | ------- | ---------------------- |
| `label`       | `string`  | -       | Dropdown label         |
| `icon`        | `Snippet` | -       | Leading icon slot      |
| `defaultOpen` | `boolean` | `false` | Whether open initially |
| `children`    | `Snippet` | -       | SidebarItem components |
| `class`       | `string`  | -       | Additional CSS classes |

### Examples

```svelte
<SidebarDropdown label="Settings">
	<SidebarItem label="Profile" href="/settings/profile" />
	<SidebarItem label="Account" href="/settings/account" />
</SidebarDropdown>
```

---

## Tabs

Tabbed interface with keyboard navigation. Wraps bits-ui.Tabs.Root.

### When to Use

- Organizing content into logical sections
- Alternate views of same content
- Settings panels
- Document sections

### Installation

```svelte
<script>
	import { Tabs, TabsList, TabsTrigger, TabsContent } from 'requify-design-system';
</script>
```

### Props API

| Prop            | Type                      | Default | Description                         |
| --------------- | ------------------------- | ------- | ----------------------------------- |
| `value`         | `string`                  | -       | Active tab identifier (bindable)    |
| `onValueChange` | `(value: string) => void` | -       | Callback when tab selection changes |
| `children`      | `Snippet`                 | -       | TabsList and TabsContent components |
| `class`         | `string`                  | -       | Additional CSS classes to apply     |

### Examples

#### Basic Usage

```svelte
<Tabs value="overview">
	<TabsList>
		<TabsTrigger value="overview">Overview</TabsTrigger>
		<TabsTrigger value="settings">Settings</TabsTrigger>
	</TabsList>
	<TabsContent value="overview">
		<h3>Overview</h3>
		<p>Content here</p>
	</TabsContent>
	<TabsContent value="settings">
		<h3>Settings</h3>
		<p>Configuration options</p>
	</TabsContent>
</Tabs>
```

#### Controlled Value

```svelte
<script>
	let activeTab = $state('profile');
</script>

<Tabs bind:value={activeTab}>
	<TabsList>
		<TabsTrigger value="profile">Profile</TabsTrigger>
		<TabsTrigger value="security">Security</TabsTrigger>
	</TabsList>
	<TabsContent value="profile">
		<!-- Profile content -->
	</TabsContent>
	<TabsContent value="security">
		<!-- Security content -->
	</TabsContent>
</Tabs>
```

#### With Icons

```svelte
<Tabs>
	<TabsList>
		<TabsTrigger value="home">
			<Home class="h-4 w-4" />
		</TabsTrigger>
		<TabsTrigger value="messages">
			<Mail class="h-4 w-4" />
		</TabsTrigger>
	</TabsList>
	<TabsContent value="home">
		<!-- Home content -->
	</TabsContent>
	<TabsContent value="messages">
		<!-- Messages content -->
	</TabsContent>
</Tabs>
```

#### With onChange Handler

```svelte
<Tabs value={activeTab} onValueChange={(val) => console.log('Tab changed:', val)}>
	<TabsList>
		<TabsTrigger value="tab1">Tab 1</TabsTrigger>
		<TabsTrigger value="tab2">Tab 2</TabsTrigger>
	</TabsList>
	<TabsContent value="tab1">Content 1</TabsContent>
	<TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

#### Settings Panel

```svelte
<Tabs>
	<TabsList>
		<TabsTrigger value="general">General</TabsTrigger>
		<TabsTrigger value="notifications">Notifications</TabsTrigger>
		<TabsTrigger value="privacy">Privacy</TabsTrigger>
	</TabsList>
	<TabsContent value="general">
		<div class="space-y-4">
			<Input placeholder="Name" />
			<Switch>Dark mode</Switch>
		</div>
	</TabsContent>
	<TabsContent value="notifications">
		<!-- Notification settings -->
	</TabsContent>
	<TabsContent value="privacy">
		<!-- Privacy settings -->
	</TabsContent>
</Tabs>
```

#### With Badges

```svelte
<Tabs>
	<TabsList>
		<TabsTrigger value="all">
			All
			<Badge>12</Badge>
		</TabsTrigger>
		<TabsTrigger value="unread">
			Unread
			<Badge variant="error">5</Badge>
		</TabsTrigger>
	</TabsList>
</Tabs>
```

### Accessibility

- Left/Right arrow keys to navigate between tabs
- Tab/Shift+Tab to focus list
- Enter or Space to activate tab
- ARIA tabs role with proper state
- Focus management maintains context

---

## TabsList

Container for tab trigger buttons. Provides horizontal scrolling when needed.

### Installation

```svelte
<script>
	import { TabsList } from 'requify-design-system';
</script>
```

### Props API

| Prop       | Type      | Default | Description                     |
| ---------- | --------- | ------- | ------------------------------- |
| `children` | `Snippet` | -       | TabsTrigger components          |
| `class`    | `string`  | -       | Additional CSS classes to apply |

### Examples

```svelte
<Tabs>
	<TabsList>
		<TabsTrigger value="tab1">Tab 1</TabsTrigger>
		<TabsTrigger value="tab2">Tab 2</TabsTrigger>
	</TabsList>
	<TabsContent value="tab1">Content</TabsContent>
</Tabs>
```

---

## TabsTrigger

Individual tab button. Clicking activates the corresponding content panel.

### Installation

```svelte
<script>
	import { TabsTrigger } from 'requify-design-system';
</script>
```

### Props API

| Prop       | Type      | Default | Description                               |
| ---------- | --------- | ------- | ----------------------------------------- |
| `value`    | `string`  | -       | Unique identifier for this tab (required) |
| `disabled` | `boolean` | `false` | Disables this tab                         |
| `children` | `Snippet` | -       | Tab button content                        |
| `class`    | `string`  | -       | Additional CSS classes to apply           |

### Examples

```svelte
<TabsTrigger value="profile">Profile</TabsTrigger>
<TabsTrigger value="settings">Settings</TabsTrigger>
```

---

## TabsContent

Content panel for a tab. Shows when its corresponding trigger is active.

### Installation

```svelte
<script>
	import { TabsContent } from 'requify-design-system';
</script>
```

### Props API

| Prop       | Type      | Default | Description                                             |
| ---------- | --------- | ------- | ------------------------------------------------------- |
| `value`    | `string`  | -       | Unique identifier matching TabsTrigger value (required) |
| `children` | `Snippet` | -       | Content to display when active                          |
| `class`    | `string`  | -       | Additional CSS classes to apply                         |

### Examples

```svelte
<TabsContent value="profile">
	<h3>Profile Settings</h3>
	<p>Configure your profile preferences</p>
</TabsContent>
```

---

## Breadcrumb

Hierarchical navigation trail for showing page hierarchy. Container for BreadcrumbItem components.

### When to Use

- Showing page hierarchy (Home > Products > Laptops)
- Navigation breadcrumbs
- File path displays
- Category navigation

### Installation

```svelte
<script>
	import { Breadcrumb, BreadcrumbItem } from 'requify-design-system';
</script>
```

### Props API

| Prop       | Type      | Default | Description                     |
| ---------- | --------- | ------- | ------------------------------- |
| `children` | `Snippet` | -       | BreadcrumbItem components       |
| `class`    | `string`  | -       | Additional CSS classes to apply |

### Examples

#### Basic Usage

```svelte
<Breadcrumb>
	<BreadcrumbItem href="/">Home</BreadcrumbItem>
	<BreadcrumbItem href="/products">Products</BreadcrumbItem>
	<BreadcrumbItem href="/products/laptops">Laptops</BreadcrumbItem>
	<BreadcrumbItem>MacBook Pro</BreadcrumbItem>
</Breadcrumb>
```

#### With Icons

```svelte
<Breadcrumb>
	<BreadcrumbItem href="/">
		<Home class="h-4 w-4" />
	</BreadcrumbItem>
	<BreadcrumbItem href="/settings">Settings</BreadcrumbItem>
</Breadcrumb>
```

#### In Page Header

```svelte
<Card>
	<h1 class="text-2xl font-bold">MacBook Pro</h1>
	<Breadcrumb class="mt-2">
		<BreadcrumbItem href="/">Home</BreadcrumbItem>
		<BreadcrumbItem href="/products">Products</BreadcrumbItem>
		<BreadcrumbItem>MacBook Pro</BreadcrumbItem>
	</Breadcrumb>
</Card>
```

#### Dynamic Breadcrumbs

```svelte
<script>
	const breadcrumbs = $derived([
		{ label: 'Home', href: '/' },
		{ label: 'Category', href: '/category' },
		{ label: currentProduct.name }
	]);
</script>

<Breadcrumb>
	{#each breadcrumbs as crumb, i}
		{#if i < breadcrumbs.length - 1}
			<BreadcrumbItem href={crumb.href}>{crumb.label}</BreadcrumbItem>
		{:else}
			<BreadcrumbItem>{crumb.label}</BreadcrumbItem>
		{/if}
	{/each}
</Breadcrumb>
```

### Accessibility

- aria-label="Breadcrumb" for screen readers
- Semantic `<nav>` and `<ol>` structure
- Last item is current page (no link)
- Keyboard navigable

---

## BreadcrumbItem

Individual breadcrumb item. Last item is typically the current page without a link.

### Installation

```svelte
<script>
	import { BreadcrumbItem } from 'requify-design-system';
</script>
```

### Props API

| Prop       | Type      | Default | Description                                                |
| ---------- | --------- | ------- | ---------------------------------------------------------- |
| `href`     | `string`  | -       | Link URL (omit for current page)                           |
| `home`     | `boolean` | `false` | If true, suppresses the separator chevron before this item |
| `children` | `Snippet` | -       | Item text or content                                       |
| `class`    | `string`  | -       | Additional CSS classes to apply                            |

### Examples

```svelte
<BreadcrumbItem home href="/home">Home</BreadcrumbItem>
<BreadcrumbItem>Current Page</BreadcrumbItem>
```

---

## Pagination

Pagination controls for data sets with previous/next and page numbers.

### When to Use

- Paginated data tables
- Search results
- Blog post pagination
- Image galleries

### Installation

```svelte
<script>
	import { Pagination } from 'requify-design-system';
</script>
```

### Props API

| Prop          | Type                   | Default | Description                                                    |
| ------------- | ---------------------- | ------- | -------------------------------------------------------------- |
| `pages`       | `PageItem[]`           | -       | Array of page items with name, href, and optional active state |
| `previous`    | `() => void`           | -       | Callback when previous button is clicked                       |
| `next`        | `() => void`           | -       | Callback when next button is clicked                           |
| `size`        | `'sm' \| 'md' \| 'lg'` | `'md'`  | Button size affecting height and text                          |
| `class`       | `string`               | -       | Additional CSS classes to apply                                |
| `prevContent` | `Snippet`              | -       | Custom content for previous button                             |
| `nextContent` | `Snippet`              | -       | Custom content for next button                                 |

#### PageItem Interface

| Property | Type      | Description                       |
| -------- | --------- | --------------------------------- |
| `name`   | `string`  | Page number/text to display       |
| `href`   | `string`  | Link URL for this page            |
| `active` | `boolean` | If true, this is the current page |

### Examples

#### Basic Usage

```svelte
<script>
	let pages = [
		{ name: '1', href: '/page/1', active: true },
		{ name: '2', href: '/page/2', active: false },
		{ name: '3', href: '/page/3', active: false }
	];

	function goToPrevious() {
		// Handle previous
	}

	function goToNext() {
		// Handle next
	}
</script>

<Pagination {pages} previous={goToPrevious} next={goToNext} />
```

#### Small Size

```svelte
<Pagination size="sm" {pages} previous={prev} {next} />
```

#### Large Size

```svelte
<Pagination size="lg" {pages} previous={prev} {next} />
```

#### With Custom Prev/Next Content

```svelte
<Pagination {pages} previous={goBack} next={goForward}>
	{#snippet prevContent()}
		<span>Previous</span>
	{/snippet}
	{#snippet nextContent()}
		<span>Next</span>
	{/snippet}
</Pagination>
```

#### Dynamic Pagination

```svelte
<script>
	const currentPage = $state(1);
	const totalPages = $state(10);

	const pages = $derived(
		Array.from({ length: totalPages }, (_, i) => ({
			name: String(i + 1),
			href: `/page/${i + 1}`,
			active: i + 1 === currentPage
		}))
	);

	function goToPage(n: number) {
		currentPage = n;
	}
</script>

<Pagination
	{pages}
	previous={() => currentPage > 1 && goToPage(currentPage - 1)}
	next={() => currentPage < totalPages && goToPage(currentPage + 1)} />
```

#### With First/Last

```svelte
<Pagination
	pages={[
		{ name: '1', href: '/page/1' },
		{ name: '2', href: '/page/2', active: true },
		{ name: '3', href: '/page/3' },
		{ name: '...', href: '' },
		{ name: '10', href: '/page/10' }
	]}
	previous={prev}
	{next} />
```

#### In Footer

```svelte
<Card>
	<Table>
		<!-- Table content -->
	</Table>
	<div class="mt-4 flex justify-center">
		<Pagination {pages} previous={prev} {next} />
	</div>
</Card>
```

### Accessibility

- aria-label for navigation
- aria-current="page" for active page
- Keyboard navigable links
- Visible active state
- Semantic `<nav>` element

---

## Accordion

Collapsible content panels with keyboard navigation. Supports single or multiple panels open. Wraps bits-ui.Accordion.Root.

### When to Use

- FAQ sections
- Nested content organization
- Progressive disclosure
- Settings sections

### Installation

```svelte
<script>
	import { Accordion, AccordionItem } from 'requify-design-system';
</script>
```

### Props API

| Prop       | Type                 | Default | Description                                                                                 |
| ---------- | -------------------- | ------- | ------------------------------------------------------------------------------------------- |
| `value`    | `string \| string[]` | -       | Open panel identifier(s). Bindable. `string` when `multiple` is false, `string[]` when true |
| `multiple` | `boolean`            | `false` | If true, allows multiple panels open. If false, single panel                                |
| `disabled` | `boolean`            | `false` | Disables all accordion interactions                                                         |
| `children` | `Snippet`            | -       | AccordionItem components                                                                    |
| `class`    | `string`             | -       | Additional CSS classes to apply                                                             |

### Examples

#### Single Open Panel

```svelte
<Accordion value="item1">
	<AccordionItem value="item1" title="Item 1">
		<p>Content for item 1</p>
	</AccordionItem>
	<AccordionItem value="item2" title="Item 2">
		<p>Content for item 2</p>
	</AccordionItem>
</Accordion>
```

#### Multiple Open Panels

```svelte
<Accordion multiple value={['item1', 'item3']}>
	<AccordionItem value="item1" title="Item 1">
		<p>Content</p>
	</AccordionItem>
	<AccordionItem value="item2" title="Item 2">
		<p>Content</p>
	</AccordionItem>
	<AccordionItem value="item3" title="Item 3">
		<p>Content</p>
	</AccordionItem>
</Accordion>
```

#### Controlled Value

```svelte
<script>
	let openItems = $state([]);
</script>

<Accordion bind:value={openItems} multiple>
	<AccordionItem value="section1" title="Section 1">
		<p>Content</p>
	</AccordionItem>
	<AccordionItem value="section2" title="Section 2">
		<p>Content</p>
	</AccordionItem>
</Accordion>
```

#### FAQ Section

```svelte
<h2 class="mb-4 text-xl font-bold">Frequently Asked Questions</h2>

<Accordion>
	<AccordionItem value="faq1" title="How do I get started?">
		<p>To get started, create an account and follow the onboarding process.</p>
	</AccordionItem>
	<AccordionItem value="faq2" title="Is there a free trial?">
		<p>Yes! We offer a 14-day free trial with full access to all features.</p>
	</AccordionItem>
	<AccordionItem value="faq3" title="How do I cancel?">
		<p>You can cancel anytime from your account settings with no penalties.</p>
	</AccordionItem>
</Accordion>
```

#### With Rich Content

```svelte
<Accordion>
	<AccordionItem value="settings1" title="General Settings">
		<div class="space-y-4">
			<Input placeholder="App name" />
			<Switch>Dark mode</Switch>
			<Select options={languageOptions} />
		</div>
	</AccordionItem>
</Accordion>
```

#### Disabled Accordion

```svelte
<Accordion disabled>
	<AccordionItem value="item1" title="Item 1">
		<p>This accordion is disabled</p>
	</AccordionItem>
</Accordion>
```

### Accessibility

- Space or Enter to toggle
- Arrow keys between items
- ARIA expanded states
- Smooth slide transition
- Screen reader announces expanded/collapsed

---

## AccordionItem

Individual accordion panel with header and collapsible content.

### Installation

```svelte
<script>
	import { AccordionItem } from 'requify-design-system';
</script>
```

### Props API

| Prop       | Type      | Default | Description                                    |
| ---------- | --------- | ------- | ---------------------------------------------- |
| `value`    | `string`  | -       | Unique identifier for this panel (required)    |
| `disabled` | `boolean` | `false` | Disables panel expansion                       |
| `title`    | `string`  | -       | Panel header title (alternative to `header`)   |
| `header`   | `Snippet` | -       | Custom header content (alternative to `title`) |
| `children` | `Snippet` | -       | Panel content                                  |
| `class`    | `string`  | -       | Additional CSS classes to apply                |

### Examples

```svelte
<AccordionItem value="faq1" title="Question?">
	<p>Answer goes here</p>
</AccordionItem>
```

---

## Dropdown

Dropdown menu with keyboard navigation. Wraps bits-ui.DropdownMenu.Root.

### When to Use

- Action menus (edit, delete, share)
- User account menus
- Filter options
- More actions menu

### Installation

```svelte
<script>
	import {
		Dropdown,
		DropdownItem,
		DropdownDivider,
		DropdownHeader,
		DropdownLink
	} from 'requify-design-system';
</script>
```

### Props API

| Prop                     | Type                                     | Default    | Description                                                                                                            |
| ------------------------ | ---------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------- |
| `open`                   | `boolean`                                | `false`    | Dropdown open state (bindable)                                                                                         |
| `trigger`                | `Snippet<[{ props }]>`                   | -          | Trigger content (required). Spread the given `props` onto your own trigger element for correct keyboard/ARIA behavior. |
| `children`               | `Snippet`                                | -          | Dropdown menu items (DropdownItem, DropdownDivider, DropdownHeader, DropdownLink)                                      |
| `align`                  | `'start' \| 'center' \| 'end'`           | `'start'`  | Horizontal alignment of dropdown                                                                                       |
| `side`                   | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` | Which side of trigger to show on                                                                                       |
| `class`                  | `string`                                 | -          | Additional CSS classes to apply                                                                                        |
| `updatePositionStrategy` | `'optimized' \| 'always'`                | `'always'` | How to update position                                                                                                 |
| `hideWhenDetached`       | `boolean`                                | `false`    | Hide when dropdown detaches from DOM                                                                                   |

### Examples

#### Basic Usage

```svelte
<Dropdown>
	{#snippet trigger({ props })}
		<Button {...props}>Open Menu</Button>
	{/snippet}
	<DropdownItem onclick={handleAction1}>Action 1</DropdownItem>
	<DropdownItem onclick={handleAction2}>Action 2</DropdownItem>
	<DropdownDivider />
	<DropdownHeader>Section</DropdownHeader>
	<DropdownItem onclick={handleAction3}>Action 3</DropdownItem>
</Dropdown>
```

#### With Custom Alignment

```svelte
<Dropdown align="end">
	{#snippet trigger({ props })}
		<Button variant="outline" {...props}>Options</Button>
	{/snippet}
	<DropdownItem>Option 1</DropdownItem>
	<DropdownItem>Option 2</DropdownItem>
</Dropdown>
```

#### Right-aligned Dropdown

```svelte
<Dropdown side="right">
	{#snippet trigger({ props })}
		<Button {...props}>Profile</Button>
	{/snippet}
	<DropdownItem>Settings</DropdownItem>
	<DropdownItem>Logout</DropdownItem>
</Dropdown>
```

#### User Menu

```svelte
<Dropdown>
	{#snippet trigger({ props })}
		<Button variant="ghost" icon {...props}>
			{#snippet icon()}
				<User class="h-4 w-4" />
			{/snippet}
			John Doe
			<ChevronDown class="h-4 w-4" />
		</Button>
	{/snippet}
	<DropdownItem onclick={goToProfile}>Profile</DropdownItem>
	<DropdownItem onclick={goToSettings}>Settings</DropdownItem>
	<DropdownDivider />
	<DropdownItem onclick={logout} class="text-error-600">Logout</DropdownItem>
</Dropdown>
```

#### With Links

```svelte
<Dropdown>
	{#snippet trigger({ props })}
		<Button {...props}>Resources</Button>
	{/snippet}
	<DropdownLink href="/docs">Documentation</DropdownLink>
	<DropdownLink href="/blog">Blog</DropdownLink>
	<DropdownLink href="/help">Help Center</DropdownLink>
</Dropdown>
```

#### Destructive Actions

```svelte
<Dropdown>
	{#snippet trigger({ props })}
		<Button variant="outline" {...props}>Actions</Button>
	{/snippet}
	<DropdownItem onclick={edit}>Edit</DropdownItem>
	<DropdownItem onclick={duplicate}>Duplicate</DropdownItem>
	<DropdownDivider />
	<DropdownItem onclick={deleteItem} class="text-error-600">Delete</DropdownItem>
</Dropdown>
```

### Accessibility

- Arrow keys to navigate items
- Space or Enter to select
- Escape to close
- Focus trap when open
- ARIA menu role

---

## DropdownItem

Individual dropdown menu item.

### Installation

```svelte
<script>
	import { DropdownItem } from 'requify-design-system';
</script>
```

### Props API

| Prop       | Type                      | Default | Description            |
| ---------- | ------------------------- | ------- | ---------------------- |
| `children` | `Snippet`                 | -       | Item text or content   |
| `onclick`  | `(e: MouseEvent) => void` | -       | Click handler          |
| `class`    | `string`                  | -       | Additional CSS classes |

### Examples

```svelte
<DropdownItem onclick={handleEdit}>Edit</DropdownItem>
<DropdownItem onclick={handleDelete} class="text-error-600">Delete</DropdownItem>
```

---

## DropdownDivider

Visual separator for dropdown menus.

### Installation

```svelte
<script>
	import { DropdownDivider } from 'requify-design-system';
</script>
```

### Props API

| Prop    | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | -       | Additional CSS classes |

### Examples

```svelte
<DropdownItem>Action 1</DropdownItem>
<DropdownDivider />
<DropdownItem>Action 2</DropdownItem>
```

---

## DropdownHeader

Section header for dropdown menus.

### Installation

```svelte
<script>
	import { DropdownHeader } from 'requify-design-system';
</script>
```

### Props API

| Prop       | Type      | Default | Description            |
| ---------- | --------- | ------- | ---------------------- |
| `children` | `Snippet` | -       | Header text or content |
| `class`    | `string`  | -       | Additional CSS classes |

### Examples

```svelte
<DropdownHeader>Actions</DropdownHeader>
<DropdownItem>Edit</DropdownItem>
<DropdownItem>Delete</DropdownItem>
```

---

## DropdownLink

Link variant of dropdown item.

### Installation

```svelte
<script>
	import { DropdownLink } from 'requify-design-system';
</script>
```

### Props API

| Prop       | Type      | Default | Description            |
| ---------- | --------- | ------- | ---------------------- |
| `href`     | `string`  | -       | Link URL               |
| `children` | `Snippet` | -       | Link text or content   |
| `class`    | `string`  | -       | Additional CSS classes |

### Examples

```svelte
<DropdownLink href="/settings">Settings</DropdownLink>
<DropdownLink href="/profile">Profile</DropdownLink>
```

---

## Related Components

- [Foundation Components](./foundation.md) - Button, Badge (for badges in navigation)
- [Data Display Components](./data-display.md) - Table (for pagination)
- [Feedback Components](./feedback.md) - Popover (for alternative to dropdowns)
