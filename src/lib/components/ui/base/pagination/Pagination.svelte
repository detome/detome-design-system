<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { ComponentSize } from '../enums';
	import type { ComponentSizeType } from '../enums';
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	import type { Snippet } from 'svelte';

	/**
	 * Pagination controls for data sets with previous/next and page numbers.
	 *
	 * @example Basic usage
	 * <Pagination pages={pageArray} previous={prevFn} next={nextFn} />
	 *
	 * @example Small size
	 * <Pagination size="sm" pages={pageArray} previous={prevFn} next={nextFn} />
	 *
	 * @example Large size
	 * <Pagination size="lg" pages={pageArray} previous={prevFn} next={nextFn} />
	 *
	 * @interface PageItem
	 * @property {string} name - Page number/text to display
	 * @property {string} href - Link URL for this page
	 * @property {boolean} [active] - If true, this is the current page
	 *
	 * @param {PageItem[]} pages - Array of page items with name, href, and optional active state
	 * @param {() => void} previous - Callback when previous button is clicked
	 * @param {() => void} next - Callback when next button is clicked
	 * @param {ComponentSize | ComponentSizeType} size - Button size affecting height and text. Default: ComponentSize.MD
	 *   Options: 'sm' | 'md' | 'lg'
	 * @param {string} class - Additional CSS classes to apply
	 * @param {Snippet} prevContent - Custom content for previous button (alternative to chevron icon)
	 * @param {Snippet} nextContent - Custom content for next button (alternative to chevron icon)
	 *
	 * @accessibility
	 * - aria-label for navigation
	 * - aria-current="page" for active page
	 * - Keyboard navigable links
	 * - Visible active state
	 * - Semantic <nav> element
	 */
	interface PageItem {
		name: string;
		href: string;
		active?: boolean;
	}

	interface Props {
		pages: PageItem[];
		previous?: () => void;
		next?: () => void;
		size?: ComponentSize | ComponentSizeType;
		class?: string;
		prevContent?: Snippet;
		nextContent?: Snippet;
	}

	let {
		pages,
		previous,
		next,
		size = ComponentSize.MD,
		class: className,
		prevContent,
		nextContent
	}: Props = $props();

	const sizes: Record<ComponentSize, string> = {
		[ComponentSize.XS]: 'h-6 min-w-6 text-xs',
		[ComponentSize.SM]: 'h-8 min-w-8 text-xs',
		[ComponentSize.MD]: 'h-10 min-w-10 text-sm',
		[ComponentSize.LG]: 'h-12 min-w-12 text-base',
		[ComponentSize.XL]: 'h-14 min-w-14 text-lg'
	};

	const sizeClass = $derived(sizes[size]);

	const baseButtonStyles =
		'flex items-center justify-center rounded-lg border border-border-strong bg-surface text-fg-muted hover:bg-surface-overlay hover:text-fg-default';

	const activeStyles =
		'z-10 border-primary-300 bg-primary-50 text-primary-600 hover:bg-primary-100 hover:text-primary-700 dark:border-primary-700 dark:bg-primary-900/30 dark:text-primary-300';
</script>

<nav class={cn('flex items-center gap-1', className)} aria-label="Pagination">
	{#if previous}
		<button
			type="button"
			onclick={previous}
			class={cn(baseButtonStyles, sizeClass, 'px-3')}
			aria-label="Previous page">
			{#if prevContent}
				{@render prevContent()}
			{:else}
				<ChevronLeft class="h-5 w-5" />
			{/if}
		</button>
	{/if}

	{#each pages as page}
		<a
			href={page.href}
			class={cn(baseButtonStyles, sizeClass, page.active ? activeStyles : '')}
			aria-current={page.active ? 'page' : undefined}>
			{page.name}
		</a>
	{/each}

	{#if next}
		<button
			type="button"
			onclick={next}
			class={cn(baseButtonStyles, sizeClass, 'px-3')}
			aria-label="Next page">
			{#if nextContent}
				{@render nextContent()}
			{:else}
				<ChevronRight class="h-5 w-5" />
			{/if}
		</button>
	{/if}
</nav>
