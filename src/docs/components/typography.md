# Typography Components

Typography components provide semantic and styled text elements for consistent typography throughout your application.

## Table of Contents

- [Heading](#heading)
- [P](#p)
- [A](#a)
- [Blockquote](#blockquote)

---

## Heading

Semantic heading component with predefined sizes and tracking. Renders appropriate HTML heading element based on tag prop.

### When to Use

- Page titles (h1)
- Section headings (h2-h4)
- Subsection titles (h5-h6)
- Document structure
- Heading hierarchy

### Installation

```svelte
<script>
	import { Heading } from 'requify-design-system';
</script>
```

### Props API

| Prop         | Type                                           | Default | Description                                             |
| ------------ | ---------------------------------------------- | ------- | ------------------------------------------------------- |
| `tag`        | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h1'`  | HTML heading element to render                          |
| `children`   | `Snippet`                                      | -       | Heading content                                         |
| `class`      | `string`                                       | -       | Additional CSS classes to apply                         |
| `customSize` | `string`                                       | -       | Custom Tailwind size class (overrides default tag size) |

### Examples

#### H1 - Page Title

```svelte
<Heading tag="h1">Welcome to Our App</Heading>
```

#### All Heading Levels

```svelte
<Heading tag="h1">H1 - Page Title</Heading>
<Heading tag="h2">H2 - Section Heading</Heading>
<Heading tag="h3">H3 - Subsection</Heading>
<Heading tag="h4">H4 - Minor Heading</Heading>
<Heading tag="h5">H5 - Small Heading</Heading>
<Heading tag="h6">H6 - Smallest Heading</Heading>
```

#### H2 - Section Heading

```svelte
<Heading tag="h2">Getting Started</Heading>
```

#### H3 - Subsection

```svelte
<Heading tag="h3">Installation Guide</Heading>
```

#### With Custom Size

```svelte
<Heading tag="h2" customSize="text-xl">Small Section Header</Heading>
```

#### With Custom Styling

```svelte
<Heading tag="h1" class="mt-8 text-center">Centered Title</Heading>
```

#### With Subtitle

```svelte
<div>
	<Heading tag="h1">Welcome</Heading>
	<P color="muted">Start your journey today</P>
</div>
```

#### In Card

```svelte
<Card>
	<Heading tag="h2" class="mb-4">Feature Overview</Heading>
	<P>Description of the feature goes here</P>
</Card>
```

#### With Icon

```svelte
<div class="flex items-center gap-3">
	<div class="bg-primary-100 flex h-12 w-12 items-center justify-center rounded-lg">
		<Rocket class="text-primary-600 h-6 w-6" />
	</div>
	<Heading tag="h2" class="m-0">Getting Started</Heading>
</div>
```

#### With Gradient Text

```svelte
<Heading
	tag="h1"
	class="from-primary-600 to-secondary-500 bg-gradient-to-r bg-clip-text text-transparent">
	Welcome to Our Platform
</Heading>
```

### Accessibility

- Semantic heading elements (h1-h6)
- Proper heading hierarchy for screen readers
- High contrast text colors
- Appropriate font weights and tracking

---

## P

Paragraph component with configurable size, weight, and color. Semantic p element with flexible typography variants.

### When to Use

- Body text
- Descriptions
- Paragraphs
- Long-form content
- Caption text

### Installation

```svelte
<script>
	import { P } from 'requify-design-system';
</script>
```

### Props API

| Prop       | Type                                                                                                                                                    | Default     | Description                     |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------- |
| `children` | `Snippet`                                                                                                                                               | -           | Paragraph content               |
| `class`    | `string`                                                                                                                                                | -           | Additional CSS classes to apply |
| `size`     | `'xs' \| 'sm' \| 'base' \| 'lg' \| 'xl'`                                                                                                                | `'base'`    | Text size                       |
| `weight`   | `'normal' \| 'medium' \| 'semibold' \| 'bold'`                                                                                                          | `'normal'`  | Font weight                     |
| `color`    | `'default' \| 'muted' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'info' \| 'blue' \| 'green' \| 'red' \| 'yellow' \| 'purple'` | `'default'` | Text color variant              |

### Examples

#### Base Paragraph

```svelte
<P>This is a standard paragraph with base size and weight.</P>
```

#### All Sizes

```svelte
<P size="xs">This is extra small text for captions.</P>
<P size="sm">This is smaller text for secondary content.</P>
<P size="base">This is base text for paragraphs.</P>
<P size="lg">This is larger text for emphasis.</P>
<P size="xl">This is extra large text for important content.</P>
```

#### Bold Paragraph

```svelte
<P weight="bold">This is bold text for emphasis.</P>
```

#### All Weights

```svelte
<P weight="normal">Normal weight</P>
<P weight="medium">Medium weight</P>
<P weight="semibold">Semibold weight</P>
<P weight="bold">Bold weight</P>
```

#### Muted Color

```svelte
<P color="muted">This is secondary/muted text.</P>
```

#### All Colors

```svelte
<P color="default">Default text color</P>
<P color="muted">Muted text color</P>
<P color="primary">Primary text color</P>
<P color="secondary">Secondary text color</P>
```

#### Extra Small With Medium Weight

```svelte
<P size="xs" weight="medium">Fine print text.</P>
```

#### With Custom Styling

```svelte
<P class="mx-auto max-w-md text-center">Centered paragraph with max width.</P>
```

#### In Card

```svelte
<Card>
	<Heading tag="h3">Card Title</Heading>
	<P class="mt-2">Description of the card content goes here with proper spacing.</P>
</Card>
```

#### Multiple Paragraphs

```svelte
<div class="space-y-4">
	<P>First paragraph of content. This can be longer text that wraps across multiple lines.</P>
	<P color="muted">Second paragraph with muted color for secondary information.</P>
</div>
```

#### With Inline Elements

```svelte
<P>
	This is a paragraph with <strong>bold</strong>
	and
	<em>italic</em>
	text, as well as
	<a href="#">links</a>
	.
</P>
```

#### Lead Paragraph

```svelte
<P size="lg" weight="medium" class="mb-6">
	This is a lead paragraph that introduces the content with larger text and medium weight for
	emphasis.
</P>
```

### Accessibility

- Semantic paragraph element
- High contrast colors for readability
- Proper line height for legibility
- Screen reader friendly text

---

## A

Link component with default styling and hover effects. Semantic anchor element.

### When to Use

- Navigation links
- External links
- Inline links within text
- Action links

### Installation

```svelte
<script>
	import { A } from 'requify-design-system';
</script>
```

### Props API

| Prop       | Type                         | Default     | Description                                                                                                                                                               |
| ---------- | ---------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children` | `Snippet`                    | -           | Link content                                                                                                                                                              |
| `class`    | `string`                     | -           | Additional CSS classes to apply                                                                                                                                           |
| `href`     | `string`                     | -           | Link URL (required)                                                                                                                                                       |
| `color`    | `TextColor \| TextColorType` | `'primary'` | Link color variant: 'default' \| 'primary' \| 'secondary' \| 'muted' \| 'success' \| 'warning' \| 'error' \| 'info' \| 'blue' \| 'green' \| 'red' \| 'yellow' \| 'purple' |
| `target`   | `string`                     | -           | Target attribute (e.g. '_blank')                                                                                                                                          |
| `rel`      | `string`                     | -           | Rel attribute for SEO/security                                                                                                                                            |

### Examples

#### Basic Link

```svelte
<A href="/about">About Us</A>
```

#### External Link

```svelte
<A href="https://example.com" target="_blank" rel="noopener">External Link</A>
```

#### Color Variant

```svelte
<A href="/pricing" color="secondary">Pricing</A>
```

#### With Custom Styling

```svelte
<A href="/details" class="font-semibold">Read more →</A>
```

#### In Paragraph

```svelte
<P>
	This is a paragraph with a <A href="/learn-more">link</A> to more information.
</P>
```

#### Button-like Link

```svelte
<A
	href="/contact"
	class="bg-primary-600 hover:bg-primary-700 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-white">
	Contact Us
	<ArrowRight class="h-4 w-4" />
</A>
```

#### With Icon

```svelte
<A href="/github" class="flex items-center gap-2">
	<Github class="h-4 w-4" />
	GitHub
</A>
```

#### Underline Style

```svelte
<A href="/learn" class="underline decoration-2 underline-offset-2">Learn More</A>
```

#### No Underline

```svelte
<A href="/details" class="no-underline">Details</A>
```

#### In List

```svelte
<div class="space-y-2">
	<A href="/page1">Page 1</A>
	<A href="/page2">Page 2</A>
	<A href="/page3">Page 3</A>
</div>
```

#### Breadcrumb Link

```svelte
<div class="flex items-center gap-2 text-sm">
	<A href="/">Home</A>
	<span>/</span>
	<A href="/products">Products</A>
	<span>/</span>
	<span class="text-gray-600">Current</span>
</div>
```

### Accessibility

- Semantic anchor element
- Proper rel attributes for external links
- Screen reader announces links
- Hover states for visual feedback
- Focus styles for keyboard navigation

---

## Blockquote

Blockquote component for quoted text. Provides proper styling and semantic markup.

### When to Use

- Quotes or testimonials
- Citations
- Callouts
- Highlighted text sections
- Attribution of content

### Installation

```svelte
<script>
	import { Blockquote } from 'requify-design-system';
</script>
```

### Props API

| Prop       | Type      | Default | Description                                             |
| ---------- | --------- | ------- | ------------------------------------------------------- |
| `children` | `Snippet` | -       | Quote content                                           |
| `border`   | `boolean` | `false` | If true, adds a left border                             |
| `bg`       | `boolean` | `false` | If true, adds background and padding                    |
| `italic`   | `boolean` | `true`  | If true, text is italicized                             |
| `cite`     | `string`  | -       | Native `<blockquote>` `cite` attribute (passed through) |
| `class`    | `string`  | -       | Additional CSS classes to apply                         |

### Examples

#### Basic Quote

```svelte
<Blockquote>This is a quoted text block for testimonials or citations.</Blockquote>
```

#### With Citation

```svelte
<Blockquote>
	<P>"Design is not just what it looks like and feels like. Design is how it works."</P>
	<cite class="mt-2 block text-sm text-gray-600">— Steve Jobs</cite>
</Blockquote>
```

#### Testimonial

```svelte
<Card>
	<Blockquote class="m-0">
		<P size="lg" weight="medium">
			"This product has completely transformed how we work. It's intuitive, fast, and exactly what
			we needed."
		</P>
		<div class="mt-4 flex items-center gap-3">
			<Img src="/avatar.jpg" alt="John Doe" class="h-10 w-10 rounded-full object-cover" />
			<div>
				<P weight="semibold">John Doe</P>
				<P size="sm" color="muted">CEO, Tech Corp</P>
			</div>
		</div>
	</Blockquote>
</Card>
```

#### With Custom Styling

```svelte
<Blockquote class="border-primary-500 border-l-4 pl-4">
	<P>"This is a styled blockquote with left border."</P>
</Blockquote>
```

#### Warning Quote

```svelte
<Blockquote class="bg-warning-50 border-warning-200 rounded-lg p-4">
	<P>"Important information that users should pay attention to."</P>
</Blockquote>
```

#### In Article

```svelte
<article>
	<Heading tag="h2">Article Title</Heading>
	<P>Article introduction text goes here.</P>
	<Blockquote class="my-6">
		<P>"Key insight or quote from the article."</P>
		<cite>— Author</cite>
	</Blockquote>
	<P>Article continues with more content...</P>
</article>
```

### Accessibility

- Semantic blockquote element
- Proper cite element for attribution
- Screen reader announces as quote
- High contrast colors for readability

---

## Related Components

- [Foundation Components](./foundation.md) - Badge, Button (for use with typography)
- [Navigation Components](./navigation.md) - Breadcrumb (for use with headings/links)
- [Feedback Components](./feedback.md) - Alert (for use with text content)
