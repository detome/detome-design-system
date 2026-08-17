<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';
	import type { HTMLQuoteAttributes } from 'svelte/elements';

	/**
	 * Blockquote component for quoted text and testimonials.
	 * Semantic blockquote with optional border, background, and italic styling.
	 *
	 * @example Basic italic quote
	 * ```svelte
	 * <Blockquote>
	 *   "The only way to do great work is to love what you do."
	 * </Blockquote>
	 * ```
	 *
	 * @example With border
	 * ```svelte
	 * <Blockquote border>
	 *   "Design is intelligence made visible."
	 * </Blockquote>
	 * ```
	 *
	 * @example With background
	 * ```svelte
	 * <Blockquote bg>
	 *   "Simplicity is the ultimate sophistication."
	 * </Blockquote>
	 * ```
	 *
	 * @example With border and background
	 * ```svelte
	 * <Blockquote border bg>
	 *   "Good design is obvious. Great design is transparent."
	 * </Blockquote>
	 * ```
	 *
	 * @example Non-italic with border
	 * ```svelte
	 * <Blockquote border italic={false}>
	 *   Important note that's not italicized.
	 * </Blockquote>
	 * ```
	 *
	 * @example With citation
	 * ```svelte
	 * <Blockquote border bg>
	 *   <p>"Quote text goes here"</p>
	 *   <footer class="mt-2 text-sm text-gray-600">
	 *     — <cite>Author Name</cite>
	 *   </footer>
	 * </Blockquote>
	 * ```
	 *
	 * @example Custom styling
	 * ```svelte
	 * <Blockquote border class="border-l-primary-500">
	 *   "Custom colored border quote."
	 * </Blockquote>
	 * ```
	 *
	 * @param {Snippet} children - Quote content
	 * @param {boolean} border - If true, adds left border. Default: false	 * @param {boolean} bg - If true, adds background and padding. Default: false
	 * @param {boolean} italic - If true, text is italicized. Default: true
	 * @param {string} class - Additional CSS classes to apply
	 *
	 * @see {@link P} - For paragraph text
	 * @see {@link Heading} - For heading elements
	 *
	 * @accessibility
	 * - Semantic blockquote element
	 * - Screen reader identifies as quoted content
	 * - High contrast for readability
	 * - Proper semantic structure for citations
	 */
	interface Props extends HTMLQuoteAttributes {
		children?: Snippet;
		border?: boolean;
		bg?: boolean;
		italic?: boolean;
		class?: string;
	}

	let {
		children,
		border = false,
		bg = false,
		italic = true,
		class: className,
		...restProps
	}: Props = $props();

	const baseStyles = 'text-fg-default';
	const borderStyles = $derived(border ? 'border-l-2 border-border-strong pl-4' : '');
	const bgStyles = $derived(bg ? 'bg-surface-raised p-4' : '');
	const italicStyles = $derived(italic ? 'italic' : '');
</script>

<blockquote class={cn(baseStyles, borderStyles, bgStyles, italicStyles, className)} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</blockquote>
