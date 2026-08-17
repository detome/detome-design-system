<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { ComponentSize, LucideIconSize } from '../enums';
	import type { ComponentSizeType } from '../enums';
	import { Search as SearchIcon } from '@lucide/svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	/**
	 * Search input with built-in search icon and proper styling.
	 * Extends HTML input with search-specific defaults.
	 *
	 * @example Basic usage
	 * ```svelte
	 * <Search bind:value={searchQuery} />
	 * ```
	 *
	 * @example Small size
	 * ```svelte
	 * <Search size="sm" bind:value={quickSearch} />
	 * ```
	 *
	 * @example Large size
	 * ```svelte
	 * <Search size="lg" bind:value={advancedSearch} />
	 * ```
	 *
	 * @example Custom placeholder
	 * ```svelte
	 * <Search placeholder="Search products..." bind:value={productSearch} />
	 * ```
	 *
	 * @example With custom class
	 * ```svelte
	 * <Search class="max-w-md" bind:value={search} />
	 * ```
	 *
	 * @param {string} value - Search input value (bindable)
	 * @param {ComponentSize | ComponentSizeType} size - Input size affecting height and text size. Default: ComponentSize.MD
	 *   Options: 'sm' | 'md' | 'lg'
	 * @param {string} class - Additional CSS classes to apply
	 * @param {string} placeholder - Placeholder text. Default: 'Search...'
	 *
	 * @see {@link Input} - Use Input for general text inputs without icon
	 * @see {@link Button} - Often used with search for submit buttons
	 *
	 * @accessibility
	 * - type="search" for proper search semantics
	 * - Search icon provides visual context
	 * - Keyboard focusable with proper focus ring
	 * - Proper label association (add Label component)
	 * - Placeholder text for screen readers
	 */
	interface Props extends Omit<HTMLInputAttributes, 'size'> {
		value?: string;
		size?: ComponentSize | ComponentSizeType;
		class?: string;
	}

	let {
		value = $bindable(),
		size = ComponentSize.MD,
		class: className,
		placeholder = 'Search...',
		...restProps
	}: Props = $props();

	const sizes: Record<ComponentSize, string> = {
		[ComponentSize.XS]: 'h-6 text-xs',
		[ComponentSize.SM]: 'h-8 text-sm',
		[ComponentSize.MD]: 'h-10 text-sm',
		[ComponentSize.LG]: 'h-12 text-base',
		[ComponentSize.XL]: 'h-14 text-lg'
	};

	const iconSizes: Record<ComponentSize, number> = {
		[ComponentSize.XS]: LucideIconSize.XS,
		[ComponentSize.SM]: LucideIconSize.MD,
		[ComponentSize.MD]: LucideIconSize.LG,
		[ComponentSize.LG]: LucideIconSize.XL,
		[ComponentSize.XL]: LucideIconSize.XXL
	};

	const baseStyles =
		'w-full rounded-lg border border-border-strong bg-surface-raised pl-10 pr-4 text-fg-default placeholder:text-fg-faint focus:border-primary-500 focus:ring-primary-500';
</script>

<div class="relative">
	<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
		<SearchIcon size={iconSizes[size] as number} class="text-fg-muted" />
	</div>
	<input
		type="search"
		bind:value
		{placeholder}
		class={cn(baseStyles, sizes[size] as string, className)}
		{...restProps} />
</div>
