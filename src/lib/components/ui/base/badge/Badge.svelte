<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { X } from '@lucide/svelte';
	import {
		BadgeVariant,
		ComponentSize,
		type BadgeVariantType,
		type ComponentSizeType
	} from '../enums';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	/**
	 * Small status indicator with semantic colors and dismissible option.
	 * Can render as link when href provided.
	 *
	 * @example Basic badge
	 * ```svelte
	 * <Badge variant={BadgeVariant.PRIMARY}>New</Badge>
	 * ```
	 *
	 * @example With semantic color
	 * ```svelte
	 * <Badge variant={BadgeVariant.SUCCESS}>Completed</Badge>
	 * ```
	 *
	 * @example Dismissible badge
	 * ```svelte
	 * <Badge dismissable onclose={handleClose} variant={BadgeVariant.INFO}>
	 *   New notification
	 * </Badge>
	 * ```
	 *
	 * @example As link
	 * ```svelte
	 * <Badge href="/notifications" variant={BadgeVariant.ERROR}>
	 *   3 unread messages
	 * </Badge>
	 * ```
	 *
	 * @example Small size
	 * ```svelte
	 * <Badge size={ComponentSize.SM} variant={BadgeVariant.WARNING}>
	 *   Beta
	 * </Badge>
	 * ```
	 *
	 * @param {BadgeVariant | BadgeVariantType} variant - Color variant for semantic meaning. Default: BadgeVariant.DEFAULT
	 *   Options: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
	 * @param {ComponentSize | ComponentSizeType} size - Badge size affecting padding and text. Default: ComponentSize.MD
	 *   Options: 'xs' | 'sm' | 'md' | 'lg'
	 * @param {boolean} dismissable - If true, shows X button to dismiss. Requires onclose. Default: false
	 * @param {() => void} onclose - Callback when dismiss button is clicked
	 * @param {Snippet} children - Badge text and content
	 * @param {string} class - Additional CSS classes to apply
	 * @param {string} href - If provided, renders as anchor tag with hover effect
	 *
	 * @accessibility
	 * - Semantic colors convey meaning to all users
	 * - Dismiss button has aria-label="Remove"
	 * - When href provided, renders as semantic link
	 * - Proper contrast ratios for all variants
	 */
	interface Props extends HTMLAttributes<HTMLSpanElement> {
		variant?: BadgeVariant | BadgeVariantType;
		size?: ComponentSize | ComponentSizeType;
		dismissable?: boolean; // Show dismiss button
		onclose?: () => void; // Called when dismiss button is clicked
		children?: Snippet;
		class?: string;
		href?: string;
	}

	let {
		variant = BadgeVariant.DEFAULT,
		size = ComponentSize.MD,
		dismissable = false,
		onclose,
		children,
		class: className,
		href,
		...restProps
	}: Props = $props();

	const baseStyles =
		'inline-flex items-center text-center justify-center font-medium rounded-full border';

	const variants: Record<string, string> = {
		[BadgeVariant.DEFAULT]:
			'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600',
		[BadgeVariant.PRIMARY]:
			'bg-primary-100 text-primary-800 border-primary-200 dark:bg-primary-900/30 dark:text-primary-300 dark:border-primary-700',
		[BadgeVariant.SECONDARY]:
			'bg-secondary-100 text-secondary-800 border-secondary-200 dark:bg-secondary-900/30 dark:text-secondary-300 dark:border-secondary-700',
		[BadgeVariant.SUCCESS]:
			'bg-success-100 text-success-800 border-success-200 dark:bg-success-900/30 dark:text-success-300 dark:border-success-700',
		[BadgeVariant.WARNING]:
			'bg-warning-100 text-warning-800 border-warning-200 dark:bg-warning-900/30 dark:text-warning-300 dark:border-warning-700',
		[BadgeVariant.ERROR]:
			'bg-error-100 text-error-800 border-error-200 dark:bg-error-900/30 dark:text-error-300 dark:border-error-700',
		[BadgeVariant.INFO]:
			'bg-info-100 text-info-800 border-info-200 dark:bg-info-900/30 dark:text-info-300 dark:border-info-700'
	};

	const sizes: Record<string, string> = {
		[ComponentSize.XS]: 'px-1.5 py-0.5 text-xs',
		[ComponentSize.SM]: 'px-2 py-0.5 text-xs',
		[ComponentSize.MD]: 'px-2.5 py-0.5 text-sm',
		[ComponentSize.LG]: 'px-3 py-1 text-base'
	};

	const computedClass = $derived(
		cn(baseStyles, variants[variant] as string, sizes[size] as string, className)
	);
</script>

{#if href}
	<a
		{href}
		class={cn(computedClass, 'transition-opacity hover:opacity-80', dismissable && 'pr-1')}
		{...restProps}>
		{#if children}
			{@render children()}
		{/if}
		{#if dismissable && onclose}
			<button
				type="button"
				onclick={onclose}
				class="ml-1 inline-flex items-center rounded-sm p-0.5 hover:bg-black/10 dark:hover:bg-white/10"
				aria-label="Remove">
				<X class="h-3 w-3" />
			</button>
		{/if}
	</a>
{:else}
	<span class={cn(computedClass, dismissable && 'pr-1')} {...restProps}>
		{#if children}
			{@render children()}
		{/if}
		{#if dismissable && onclose}
			<button
				type="button"
				onclick={onclose}
				class="ml-1 inline-flex items-center rounded-sm p-0.5 hover:bg-black/10 dark:hover:bg-white/10"
				aria-label="Remove">
				<X class="h-3 w-3" />
			</button>
		{/if}
	</span>
{/if}
