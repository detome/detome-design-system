<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { CardVariant, CardPadding } from '../enums';
	import type { CardVariantType, CardPaddingType } from '../enums';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	/**
	 * Container component with multiple visual variants for content grouping.
	 * Can render as link when href provided.
	 *
	 * @example Basic card
	 * ```svelte
	 * <Card variant="default">
	 *   <h3>Card Title</h3>
	 *   <p>Card content goes here</p>
	 * </Card>
	 * ```
	 *
	 * @example Clickable card with hover effect
	 * ```svelte
	 * <Card variant="elevated" hoverable href="/details">
	 *   <h3>Clickable Card</h3>
	 *   <p>Click to view details</p>
	 * </Card>
	 * ```
	 *
	 * @example Glass morphism card
	 * ```svelte
	 * <Card variant="glass" padding="lg">
	 *   <h3>Glass Card</h3>
	 *   <p>Modern glass effect</p>
	 * </Card>
	 * ```
	 *
	 * @example Bordered card
	 * ```svelte
	 * <Card variant="bordered" padding="sm">
	 *   <h3>Bordered Card</h3>
	 *   <p>Subtle border styling</p>
	 * </Card>
	 * ```
	 *
	 * @param {CardVariant | CardVariantType} variant - Visual style variant. Default: CardVariant.DEFAULT
	 *   Options: 'default' | 'bordered' | 'elevated' | 'flat' | 'glass'
	 * @param {CardPadding | CardPaddingType} padding - Padding size. Default: CardPadding.MD
	 *   Options: 'none' | 'sm' | 'md' | 'lg' | 'xl'
	 * @param {boolean} hoverable - If true or href provided, adds hover lift effect. Default: false
	 * @param {string} href - If provided, renders as anchor tag with href and link behavior
	 * @param {Snippet} children - Card content
	 * @param {string} class - Additional CSS classes to apply
	 *
	 * @see {@link Button} - Often used inside cards
	 * @see {@link Input} - Often used inside cards for forms
	 *
	 * @accessibility
	 * - When href is provided, renders as semantic link with proper ARIA
	 * - Keyboard focusable with hover effect
	 * - Visible focus indicator
	 */
	interface Props extends HTMLAttributes<HTMLDivElement> {
		variant?: CardVariant | CardVariantType;
		padding?: CardPadding | CardPaddingType;
		hoverable?: boolean;
		href?: string; // If provided, renders as a link
		children?: Snippet;
		class?: string;
	}

	let {
		variant = CardVariant.DEFAULT,
		padding = CardPadding.MD,
		hoverable = false,
		href,
		children,
		class: className,
		...restProps
	}: Props = $props();

	const baseStyles = 'rounded-xl bg-white dark:bg-gray-800 transition-all duration-200';

	const variants = {
		default:
			'border border-gray-200/80 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_0_0_1px_rgb(0_0_0/0.02)] dark:border-gray-700/80',
		bordered: 'border-2 border-gray-300 dark:border-gray-600',
		elevated:
			'border border-gray-200/60 shadow-[0_2px_4px_0_rgb(0_0_0/0.06),0_8px_16px_-4px_rgb(0_0_0/0.08)] bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-850',
		flat: 'border border-gray-100 dark:border-gray-800',
		glass:
			'bg-white/85 dark:bg-gray-800/85 backdrop-blur-xl backdrop-saturate-150 border border-white/80 dark:border-gray-700/80 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.08),0_10px_24px_-6px_rgb(0_0_0/0.1),inset_0_1px_0_0_rgba(255_255_255/0.9)]'
	};

	const paddings: Record<string, string> = {
		none: '',
		sm: 'p-4',
		md: 'p-6',
		lg: 'p-8',
		xl: 'p-10'
	};

	const computedClass = $derived(
		cn(
			baseStyles,
			variants[variant] as string,
			paddings[padding] as string,
			(hoverable || href) &&
				'hover:-translate-y-0.5 hover:shadow-[0_4px_8px_0_rgb(0_0_0/0.08),0_12px_24px_-4px_rgb(0_0_0/0.12)] hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer active:translate-y-0 active:shadow-[0_1px_2px_0_rgb(0_0_0/0.06),0_4px_8px_-2px_rgb(0_0_0/0.08)]',
			href && 'block no-underline',
			className
		)
	);
</script>

{#if href}
	<!-- Spreading div props onto anchor tag - using type assertion for compatibility -->
	<a {href} class={computedClass} {...restProps as Record<string, unknown>}>
		{#if children}
			{@render children()}
		{/if}
	</a>
{:else}
	<div class={computedClass} {...restProps}>
		{#if children}
			{@render children()}
		{/if}
	</div>
{/if}
