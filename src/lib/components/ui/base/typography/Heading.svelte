<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { HeadingTag } from '../enums';
	import type { HeadingTagType } from '../enums';
	import type { Snippet } from 'svelte';

	/**
	 * Semantic heading component with predefined sizes and tracking.
	 * Renders appropriate HTML heading element based on tag prop.
	 *
	 * @example H1 - Page title
	 * ```svelte
	 * <Heading tag="h1">Welcome to Our App</Heading>
	 * ```
	 *
	 * @example H2 - Section heading
	 * ```svelte
	 * <Heading tag="h2">Getting Started</Heading>
	 * ```
	 *
	 * @example H3 - Subsection
	 * ```svelte
	 * <Heading tag="h3">Installation Guide</Heading>
	 * ```
	 *
	 * @example With custom size
	 * ```svelte
	 * <Heading tag="h2" customSize="text-xl">Small Section Header</Heading>
	 * ```
	 *
	 * @example H4 - Minor heading
	 * ```svelte
	 * <Heading tag="h4">Quick Tips</Heading>
	 * ```
	 *
	 * @example H5 - Small heading
	 * ```svelte
	 * <Heading tag="h5">Note</Heading>
	 * ```
	 *
	 * @example H6 - Smallest heading
	 * ```svelte
	 * <Heading tag="h6">Caption</Heading>
	 * ```
	 *
	 * @example With custom styling
	 * ```svelte
	 * <Heading tag="h1" class="text-center mt-8">Centered Title</Heading>
	 * ```
	 *
	 * @param {HeadingTag | HeadingTagType} tag - HTML heading element to render. Default: HeadingTag.H1
	 *   Options: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
	 * @param {Snippet} children - Heading content
	 * @param {string} class - Additional CSS classes to apply
	 * @param {string} customSize - Custom Tailwind size class (overrides default tag size)
	 *
	 * @see {@link P} - For paragraph text
	 * @see {@link Blockquote} - For quoted text
	 *
	 * @accessibility
	 * - Semantic heading elements (h1-h6)
	 * - Proper heading hierarchy for screen readers
	 * - High contrast text colors
	 * - Appropriate font weights and tracking
	 */
	interface Props {
		tag?: HeadingTag | HeadingTagType;
		children?: Snippet;
		class?: string;
		customSize?: string;
	}

	let {
		tag = HeadingTag.H1,
		children,
		class: className,
		customSize,
		...restProps
	}: Props = $props();

	const sizeStyles = {
		h1: 'text-3xl font-bold tracking-tight lg:text-4xl',
		h2: 'text-2xl font-semibold tracking-tight lg:text-3xl',
		h3: 'text-xl font-semibold tracking-tight lg:text-2xl',
		h4: 'text-lg font-semibold',
		h5: 'text-base font-semibold',
		h6: 'text-sm font-semibold'
	};

	const baseStyles = 'text-fg-default font-[family-name:var(--font-display)]';
</script>

<svelte:element
	this={tag}
	class={cn(baseStyles, customSize || sizeStyles[tag] || sizeStyles.h1, className)}
	{...restProps}>
	{#if children}{@render children()}{/if}
</svelte:element>
