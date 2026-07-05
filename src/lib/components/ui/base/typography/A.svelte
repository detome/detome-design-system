<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { TextColor } from '../enums';
	import type { TextColorType } from '../enums';
	import type { Snippet } from 'svelte';

	/**
	 * Styled link component with hover and focus states.
	 * Semantic anchor element with color variants.
	 *
	 * @example Primary link
	 * ```svelte
	 * <A href="/about">About Us</A>
	 * ```
	 *
	 * @example Default blue link
	 * ```svelte
	 * <A href="/contact" color="default">Contact</A>
	 * ```
	 *
	 * @example External link
	 * ```svelte
	 * <A href="https://example.com" target="_blank" rel="noopener noreferrer">
	 *   External Site
	 * </A>
	 * ```
	 *
	 * @example Secondary color
	 * ```svelte
	 * <A href="/pricing" color="secondary">Pricing</A>
	 * ```
	 *
	 * @example With icon
	 * ```svelte
	 * <A href="/docs">
	 *   Documentation
	 *   <ArrowRight class="inline h-4 w-4 ml-1" />
	 * </A>
	 * ```
	 *
	 * @example With custom styling
	 * ```svelte
	 * <A href="/learn" class="text-lg font-bold">
	 *   Start Learning
	 * </A>
	 * ```
	 *
	 * @example Email link
	 * ```svelte
	 * <A href="mailto:hello@example.com">hello@example.com</A>
	 * ```
	 *
	 * @param {string} href - Link URL or destination (required)
	 * @param {Snippet} children - Link content
	 * @param {string} class - Additional CSS classes to apply
	 * @param {TextColor | TextColorType} color - Link color variant. Default: TextColor.PRIMARY
	 *   Options: 'default' | 'primary' | 'secondary'
	 * @param {string} target - Link target (e.g., '_blank' for new tab)
	 * @param {string} rel - Link relationship (e.g., 'noopener noreferrer' for external links)
	 *
	 * @see {@link P} - For paragraph text
	 * @see {@link Heading} - For heading elements
	 *
	 * @accessibility
	 * - Semantic anchor element
	 * - Keyboard: Enter to navigate
	 * - Visible focus ring for keyboard navigation
	 * - Hover underline for visual feedback
	 * - High contrast colors
	 * - External links should use target="_blank" and rel="noopener noreferrer"
	 */
	interface Props {
		href: string;
		children?: Snippet;
		class?: string;
		color?: TextColor | TextColorType;
		target?: string;
		rel?: string;
	}

	let {
		href,
		children,
		class: className,
		color = TextColor.PRIMARY,
		target,
		rel,
		...restProps
	}: Props = $props();

	const colorStyles: Record<TextColor, string> = {
		[TextColor.DEFAULT]: 'text-blue-600 dark:text-blue-400',
		[TextColor.PRIMARY]: 'text-primary-600 dark:text-primary-400',
		[TextColor.SECONDARY]: 'text-secondary-600 dark:text-secondary-400',
		[TextColor.MUTED]: 'text-gray-600 dark:text-gray-400',
		[TextColor.SUCCESS]: 'text-success-600 dark:text-success-400',
		[TextColor.WARNING]: 'text-warning-600 dark:text-warning-400',
		[TextColor.ERROR]: 'text-error-600 dark:text-error-400',
		[TextColor.INFO]: 'text-info-600 dark:text-info-400',
		[TextColor.BLUE]: 'text-blue-600 dark:text-blue-400',
		[TextColor.GREEN]: 'text-green-600 dark:text-green-400',
		[TextColor.RED]: 'text-red-600 dark:text-red-400',
		[TextColor.YELLOW]: 'text-yellow-600 dark:text-yellow-400',
		[TextColor.PURPLE]: 'text-purple-600 dark:text-purple-400'
	};

	const baseStyles =
		'font-medium hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded';
</script>

<a
	{href}
	{target}
	{rel}
	class={cn(baseStyles, colorStyles[color] as string, className)}
	{...restProps}>
	{#if children}{@render children()}{/if}
</a>
