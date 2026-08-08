<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { TextSize, FontWeight, TextColor } from '../enums';
	import type { TextSizeType, FontWeightType, TextColorType } from '../enums';
	import type { Snippet } from 'svelte';

	/**
	 * Paragraph component with configurable size, weight, and color.
	 * Semantic p element with flexible typography variants.
	 *
	 * @example Base paragraph
	 * ```svelte
	 * <P>This is a standard paragraph with base size and weight.</P>
	 * ```
	 *
	 * @example Small text
	 * ```svelte
	 * <P size="sm">This is smaller text for captions.</P>
	 * ```
	 *
	 * @example Large text
	 * ```svelte
	 * <P size="lg">This is larger text for emphasis.</P>
	 * ```
	 *
	 * @example Bold paragraph
	 * ```svelte
	 * <P weight="bold">This is bold text for emphasis.</P>
	 * ```
	 *
	 * @example Muted color
	 * ```svelte
	 * <P color="muted">This is secondary/muted text.</P>
	 * ```
	 *
	 * @example Primary color
	 * ```svelte
	 * <P color="primary">This is primary colored text.</P>
	 * ```
	 *
	 * @example Extra small with medium weight
	 * ```svelte
	 * <P size="xs" weight="medium">Fine print text.</P>
	 * ```
	 *
	 * @example With custom styling
	 * ```svelte
	 * <P class="text-center max-w-md mx-auto">
	 *   Centered paragraph with max width.
	 * </P>
	 * ```
	 *
	 * @param {Snippet} children - Paragraph content
	 * @param {string} class - Additional CSS classes to apply
	 * @param {TextSize | TextSizeType} size - Text size. Default: TextSize.BASE
	 *   Options: 'xs' (12px), 'sm' (14px), 'base' (16px), 'lg' (18px), 'xl' (20px)
	 * @param {FontWeight | FontWeightType} weight - Font weight. Default: FontWeight.NORMAL
	 *   Options: 'normal' | 'medium' | 'semibold' | 'bold'
	 * @param {TextColor | TextColorType} color - Text color variant. Default: TextColor.DEFAULT
	 *   Options: 'default' | 'muted' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'blue' | 'green' | 'red' | 'yellow' | 'purple'
	 *
	 * @see {@link Heading} - For heading elements
	 * @see {@link A} - For links within text
	 *
	 * @accessibility
	 * - Semantic paragraph element
	 * - High contrast colors for readability
	 * - Proper line height for legibility
	 * - Screen reader friendly text
	 */
	interface Props {
		children?: Snippet;
		class?: string;
		size?: TextSize | TextSizeType;
		weight?: FontWeight | FontWeightType;
		color?: TextColor | TextColorType;
	}

	let {
		children,
		class: className,
		size = TextSize.BASE,
		weight = FontWeight.NORMAL,
		color = TextColor.DEFAULT,
		...restProps
	}: Props = $props();

	const sizeStyles: Record<string, string> = {
		xs: 'text-xs',
		sm: 'text-sm',
		base: 'text-base',
		lg: 'text-lg',
		xl: 'text-xl',
		'2xl': 'text-2xl',
		'3xl': 'text-3xl'
	};

	const weightStyles: Record<string, string> = {
		normal: 'font-normal',
		medium: 'font-medium',
		semibold: 'font-semibold',
		bold: 'font-bold'
	};

	const colorStyles: Record<string, string> = {
		default: 'text-gray-700 dark:text-gray-300',
		muted: 'text-gray-600 dark:text-gray-400',
		primary: 'text-primary-600 dark:text-primary-400',
		secondary: 'text-secondary-600 dark:text-secondary-400',
		success: 'text-success-600 dark:text-success-400',
		warning: 'text-warning-600 dark:text-warning-400',
		error: 'text-error-600 dark:text-error-400',
		info: 'text-info-600 dark:text-info-400',
		blue: 'text-blue-600 dark:text-blue-400',
		green: 'text-green-600 dark:text-green-400',
		red: 'text-red-600 dark:text-red-400',
		yellow: 'text-yellow-600 dark:text-yellow-400',
		purple: 'text-purple-600 dark:text-purple-400'
	};

	const baseStyles = 'leading-relaxed';
</script>

<p
	class={cn(
		baseStyles,
		sizeStyles[size] as string,
		weightStyles[weight] as string,
		colorStyles[color] as string,
		className
	)}
	{...restProps}>
	{#if children}{@render children()}{/if}
</p>
