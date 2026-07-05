<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { ChevronRight } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	/**
	 * Individual breadcrumb item with separator and link support.
	 * First item has no separator, last item renders as text.
	 *
	 * @example Link item
	 * ```svelte
	 * <BreadcrumbItem href="/products">Products</BreadcrumbItem>
	 * ```
	 *
	 * @example Current page (no link)
	 * ```svelte
	 * <BreadcrumbItem>Product Details</BreadcrumbItem>
	 * ```
	 *
	 * @example Home page
	 * ```svelte
	 * <BreadcrumbItem home href="/">Home</BreadcrumbItem>
	 * ```
	 *
	 * @example With icon
	 * ```svelte
	 * <BreadcrumbItem href="/">
	 *   <Home class="h-4 w-4" />
	 *   Home
	 * </BreadcrumbItem>
	 * ```
	 *
	 * @param {Snippet} children - Breadcrumb text and/or icons
	 * @param {string} href - If provided, renders as anchor link; if not, renders as text
	 * @param {boolean} home - If true, no separator is shown before this item. Default: false
	 * @param {string} class - Additional CSS classes to apply
	 *
	 * @see {@link Breadcrumb} - Parent breadcrumb container
	 *
	 * @accessibility
	 * - Renders as semantic <a> if href provided
	 * - Renders as <span> if no href (current page)
	 * - Separator icon (chevron) for visual hierarchy
	 * - Keyboard navigable links
	 */
	interface Props {
		children?: Snippet;
		href?: string;
		home?: boolean;
		class?: string;
		[key: string]: unknown; // Allow other props to pass through
	}

	let { children, href, home = false, class: className, ...restProps }: Props = $props();

	const linkStyles =
		'inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white';
	const currentStyles = 'inline-flex items-center text-gray-500 dark:text-gray-400';
</script>

<li class="inline-flex items-center">
	{#if !home}
		<ChevronRight class="mx-1 h-5 w-5 text-gray-400" />
	{/if}

	{#if href}
		<a {href} class={cn(linkStyles, className)} {...restProps}>
			{#if children}
				{@render children()}
			{/if}
		</a>
	{:else}
		<span class={cn(currentStyles, className)} {...restProps}>
			{#if children}
				{@render children()}
			{/if}
		</span>
	{/if}
</li>
