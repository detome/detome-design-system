# Brand, Domain & Accessibility Components

Brand assets (Detome logos and icons), Detome-specific domain primitives (identifiers, trace badges, approval stamps, empty states), and accessibility helpers.

## Table of Contents

- [DetomeLogo](#detomelogo)
- [DetomeLogoLight / DetomeLogoDark](#detomelogolight--detomelogodark)
- [DetomeIcon](#detomeicon)
- [DetomeIconLight / DetomeIconDark](#detomeiconlight--detomeicondark)
- [Identifier](#identifier)
- [SuspectIndicator](#suspectindicator)
- [TraceBadge](#tracebadge)
- [ApprovalStamp](#approvalstamp)
- [EmptyState](#emptystate)
- [SkipLink](#skiplink)

---

## DetomeLogo

Auto-switching Detome wordmark logo. Renders the light variant by default and the dark variant when a `.dark` class is present on a parent element (typically `<html>`). Both variants are rendered and toggled via `hidden`/`dark:block`, so there is no flash on theme switch, no hydration mismatch, and it works in SSR.

### When to Use

- Application headers and navbars
- Login and marketing pages
- Anywhere the wordmark should adapt to light/dark theme automatically

### Installation

```svelte
<script>
	import { DetomeLogo } from '@detome/detome-design-system';
</script>
```

### Props API

| Prop    | Type                                     | Default    | Description                                                                                                                            |
| ------- | ---------------------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `size`  | `'sm' \| 'md' \| 'lg' \| 'xl' \| string` | `'md'`     | Height-based size: 'sm' (16px), 'md' (24px), 'lg' (32px), 'xl' (48px). Any other string is applied as a Tailwind class (e.g. `'h-20'`) |
| `alt`   | `string`                                 | `'detome'` | Alt text. Pass `alt=""` when paired with visible text                                                                                  |
| `class` | `string`                                 | -          | Additional CSS classes applied to both variants                                                                                        |

### Examples

#### Default

```svelte
<DetomeLogo />
```

#### Sized

```svelte
<DetomeLogo size="xl" />
```

#### Custom Height via class

```svelte
<DetomeLogo class="h-16" />
```

#### Decorative (paired with visible text)

```svelte
<DetomeLogo alt="" />
```

### Accessibility

- Rendered as an `<img>` with `alt="detome"` by default
- Only the visible variant is exposed to assistive tech (the hidden one uses `display:none`)
- Light and dark wordmarks share an identical aspect ratio, so theme switching causes no layout shift

---

## DetomeLogoLight / DetomeLogoDark

Explicit wordmark variants for light and dark backgrounds respectively. Use these when the surrounding surface color is known and does not follow the `.dark` class. Same props as [DetomeLogo](#detomelogo).

### When to Use

- Fixed-color surfaces (e.g. a dark sidebar in an otherwise light app)
- Email templates or export assets where auto-switching is not possible

### Examples

```svelte
<DetomeLogoLight size="lg" />
<DetomeLogoDark size="lg" />
```

---

## DetomeIcon

Auto-switching Detome brand mark (the "d" icon). Uses the same CSS-stacking dark-mode mechanism as DetomeLogo: no flash, no hydration mismatch, SSR-safe. Same props as [DetomeLogo](#detomelogo).

### When to Use

- Favicons and app tiles in-page
- Compact branding next to product names
- Loading screens

### Examples

```svelte
<DetomeIcon />
<DetomeIcon size="xl" alt="" />
```

---

## DetomeIconLight / DetomeIconDark

Explicit brand-mark variants for light and dark backgrounds. Same props as [DetomeLogo](#detomelogo).

### Examples

```svelte
<DetomeIconLight />
<DetomeIconDark />
```

---

## Identifier

Monospace pill for displaying identifiers (record IDs, tokens, slugs) with optional click-to-copy.

### When to Use

- Displaying database IDs or external references
- Showing API tokens or short codes
- Anywhere users need to copy an opaque value

### Installation

```svelte
<script>
	import { Identifier } from '@detome/detome-design-system';
</script>
```

### Props API

| Prop       | Type      | Default | Description                                                       |
| ---------- | --------- | ------- | ----------------------------------------------------------------- |
| `value`    | `string`  | -       | The identifier to display (required)                              |
| `label`    | `string`  | -       | Used in the copy button's aria-label, e.g. `Copy Invoice: INV-01` |
| `copyable` | `boolean` | `true`  | Renders a button that copies `value` to the clipboard             |
| `class`    | `string`  | -       | Additional CSS classes to apply                                   |

Note: when `copyable` is `false`, the identifier renders as a plain `<span>`.

### Examples

#### Copyable (default)

```svelte
<Identifier value="INV-2026-0042" label="Invoice" />
```

#### Not Copyable

```svelte
<Identifier value="usr_8f3k2" copyable={false} />
```

### Accessibility

- Copy button has `aria-label` (includes the label and value) and `title="Click to copy"`
- Shows a check icon for 1.5 seconds after copying as visual confirmation

---

## SuspectIndicator

Warning-styled status pill with an alert-triangle icon for flagging suspect links or items.

### When to Use

- Flagging untrusted or suspect links in review workflows
- Marking items that need attention

### Installation

```svelte
<script>
	import { SuspectIndicator } from '@detome/detome-design-system';
</script>
```

### Props API

| Prop    | Type     | Default          | Description                     |
| ------- | -------- | ---------------- | ------------------------------- |
| `label` | `string` | `'Suspect link'` | Text shown inside the pill      |
| `class` | `string` | -                | Additional CSS classes to apply |

### Examples

```svelte
<SuspectIndicator />
<SuspectIndicator label="Needs review" />
```

### Accessibility

- `role="status"` with `aria-label`
- Icon is `aria-hidden` (the label carries the meaning)

---

## TraceBadge

Rounded pill badge for trace and graph annotations with directional variants.

### When to Use

- Annotating upstream/downstream relationships in lineage graphs
- Grouping related nodes with a count

### Installation

```svelte
<script>
	import { TraceBadge } from '@detome/detome-design-system';
</script>
```

### Props API

| Prop      | Type                                                   | Default     | Description                             |
| --------- | ------------------------------------------------------ | ----------- | --------------------------------------- |
| `label`   | `string`                                               | -           | Badge text (required)                   |
| `count`   | `number`                                               | -           | Rendered as `(count)` suffix when given |
| `variant` | `'default' \| 'upstream' \| 'downstream' \| 'suspect'` | `'default'` | Color variant                           |
| `icon`    | `Snippet`                                              | -           | Leading icon snippet                    |
| `class`   | `string`                                               | -           | Additional CSS classes to apply         |

### Examples

#### Basic

```svelte
<TraceBadge label="Upstream sources" variant="upstream" count={4} />
```

#### With Icon

```svelte
<TraceBadge label="Suspect" variant="suspect">
	{#snippet icon()}
		<ShieldAlert size={12} aria-hidden="true" />
	{/snippet}
</TraceBadge>
```

---

## ApprovalStamp

Inline "Approved by {name}" stamp with a shield icon, optional avatar, role, and timestamp.

### When to Use

- Showing who approved a record and when
- Audit trails and review history

### Installation

```svelte
<script>
	import { ApprovalStamp } from '@detome/detome-design-system';
</script>
```

### Props API

| Prop        | Type     | Default | Description                                          |
| ----------- | -------- | ------- | ---------------------------------------------------- |
| `name`      | `string` | -       | Approver name (required)                             |
| `role`      | `string` | -       | Role or job title shown under the name               |
| `timestamp` | `string` | -       | Rendered inside a `<time>` element                   |
| `avatarUrl` | `string` | -       | Avatar image; falls back to an initial-letter avatar |
| `class`     | `string` | -       | Additional CSS classes to apply                      |

### Examples

#### Basic

```svelte
<ApprovalStamp name="Jane Cooper" />
```

#### Full

```svelte
<ApprovalStamp
	name="Jane Cooper"
	role="Finance Lead"
	timestamp="2026-09-01 14:32"
	avatarUrl="/avatars/jane.png" />
```

### Accessibility

- Avatar images include descriptive alt text
- Timestamp rendered semantically with `<time>`

---

## EmptyState

Centered empty-state placeholder with icon, title, description, and optional action.

### When to Use

- Empty lists, tables, or search results
- First-run onboarding prompts

### Installation

```svelte
<script>
	import { EmptyState, Button, ButtonVariant } from '@detome/detome-design-system';
</script>
```

### Props API

| Prop          | Type      | Default    | Description                            |
| ------------- | --------- | ---------- | -------------------------------------- |
| `title`       | `string`  | -          | Heading text (required)                |
| `description` | `string`  | -          | Muted text under the title             |
| `icon`        | `Snippet` | Inbox icon | Custom icon snippet (replaces default) |
| `action`      | `Snippet` | -          | Call-to-action content, e.g. a Button  |
| `class`       | `string`  | -          | Additional CSS classes to apply        |

### Examples

#### Basic

```svelte
<EmptyState title="No invoices yet" description="Invoices will appear here once created." />
```

#### With Action and Custom Icon

```svelte
<EmptyState title="No results" description="Try adjusting your search or filters.">
	{#snippet icon()}
		<SearchX size={32} aria-hidden="true" />
	{/snippet}
	{#snippet action()}
		<Button variant={ButtonVariant.OUTLINE} onclick={clearFilters}>Clear filters</Button>
	{/snippet}
</EmptyState>
```

### Accessibility

- Semantic `<h3>` heading for the title
- Decorative icons are `aria-hidden`

---

## SkipLink

Visually hidden "Skip to main content" link that becomes visible on keyboard focus and jumps past navigation to the target `href`. Place it as the first focusable element on the page.

### When to Use

- Every page with repeated navigation headers or sidebars
- Improving keyboard and screen reader navigation (WCAG 2.4.1 Bypass Blocks)

### Installation

```svelte
<script>
	import { SkipLink } from '@detome/detome-design-system';
</script>
```

### Props API

| Prop    | Type     | Default           | Description                     |
| ------- | -------- | ----------------- | ------------------------------- |
| `href`  | `string` | `'#main-content'` | Target element to skip to       |
| `class` | `string` | -                 | Additional CSS classes to apply |

### Examples

```svelte
<SkipLink /><main id="main-content">...</main>
```

```svelte
<SkipLink href="#app" /><div id="app">...</div>
```

### Accessibility

- Hidden until focused (`sr-only` / `focus:not-sr-only`)
- Fixed position at the top-left corner when visible, with a strong focus ring
- Keyboard users can Tab past the entire navigation with one keystroke

---

## Related Components

- [Foundation Components](./foundation.md) - Button (for EmptyState actions), Badge, Spinner
- [Feedback Components](./feedback.md) - Alert, Toast (for status messaging)
- [Navigation Components](./navigation.md) - Sidebar (pair with SkipLink)
- [Usage Guides](../usage-guides.md) - Accessibility best practices
