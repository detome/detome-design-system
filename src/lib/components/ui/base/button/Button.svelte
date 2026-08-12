<script lang="ts">
	import { Button as BitsButton } from 'bits-ui';
	import { cn } from '$lib/utils/cn';
	import {
		ButtonVariant,
		ComponentSize,
		type ButtonVariantType,
		type ComponentSizeType
	} from '../enums';
	import type { Snippet } from 'svelte';

	/**
	 * Button component with multiple visual variants and sizes.
	 * Wraps bits-ui.Button.Root with custom styling and theming.
	 *
	 * @example Basic usage
	 * ```svelte
	 * <Button variant={ButtonVariant.PRIMARY}>Click me</Button>
	 * ```
	 *
	 * @example With icon
	 * ```svelte
	 * <Button icon>
	 *   {#snippet icon()}
	 *     <Search class="h-4 w-4" />
	 *   {/snippet}
	 *   Search
	 * </Button>
	 * ```
	 *
	 * @example Loading state
	 * ```svelte
	 * <Button variant={ButtonVariant.PRIMARY} loading={isLoading}>
	 *   {#snippet icon()}
	 *     <Save class="h-4 w-4" />
	 *   {/snippet}
	 *   Save Changes
	 * </Button>
	 * ```
	 *
	 * @example Full width
	 * ```svelte
	 * <Button variant={ButtonVariant.PRIMARY} fullWidth>Full Width Button</Button>
	 * ```
	 *
	 * @example As link
	 * ```svelte
	 * <Button href="/dashboard">Go to Dashboard</Button>
	 * ```
	 *
	 * @param {ButtonVariant | ButtonVariantType} variant - Visual style variant. Default: ButtonVariant.PRIMARY
	 *   Options: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
	 * @param {ComponentSize | ComponentSizeType} size - Button size affecting padding and text size. Default: ComponentSize.MD
	 *   Options: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
	 * @param {boolean} fullWidth - If true, button takes full width of container. Default: false
	 * @param {boolean} loading - If true, shows loading spinner and disables button. Default: false
	 * @param {boolean} disabled - If true, button is disabled. Default: false
	 * @param {Snippet} icon - Icon slot for leading icon
	 * @param {Snippet} children - Main button content
	 * @param {string} class - Additional CSS classes to apply
	 * @param {string} href - If provided, renders as anchor tag with href attribute
	 * @param {'button' | 'submit' | 'reset'} type - HTML button type. Default: 'button'
	 * @param {(e: MouseEvent) => void} onclick - Click event handler
	 *
	 * @see {@link ButtonGroup} - Can be grouped with ButtonGroup
	 * @see {@link CloseButton} - For modal close buttons
	 *
	 * @accessibility
	 * - Keyboard: Enter and Space to activate
	 * - ARIA: Supports all button ARIA attributes
	 * - Focus: Visible focus ring indicator
	 * - Screen reader: Proper button role announced
	 */
	interface Props {
		variant?: ButtonVariant | ButtonVariantType;
		size?: ComponentSize | ComponentSizeType;
		fullWidth?: boolean;
		loading?: boolean;
		icon?: Snippet;
		children?: Snippet;
		class?: string;
		href?: string;
		disabled?: boolean;
		type?: 'button' | 'submit' | 'reset';
		onclick?: (e: MouseEvent) => void;
		[key: string]: unknown; // Allow additional HTML attributes
	}

	let {
		variant = ButtonVariant.PRIMARY,
		size = ComponentSize.MD,
		fullWidth = false,
		loading = false,
		disabled = false,
		icon,
		children,
		class: className,
		href,
		type = 'button',
		onclick,
		...restProps
	}: Props = $props();

	/**
	 * Every variant carries the same 2px border — transparent unless a variant
	 * colours it. Without this, bordered variants (outline, ghost) stood 4px
	 * taller than filled ones at the same `size`, so a row of mixed-variant
	 * buttons never lined up.
	 */
	const baseStyles =
		'inline-flex items-center justify-center gap-2 border-2 border-transparent font-medium transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 whitespace-normal overflow-hidden';

	/**
	 * On focus the button's transparent 2px border fills with a primary-to-accent
	 * gradient, using the same padding-box/border-box technique as Input. This
	 * unifies the focus language across the whole system and gives every button
	 * a branded focus indicator that no standard ring can match.
	 *
	 * The fill gradient must be restated in the padding-box layer because the
	 * `background` shorthand resets `background-image` from `bg-gradient-to-b`.
	 */
	const gradientFocus = (from: string, to: string) =>
		`focus-visible:bg-[linear-gradient(var(--color-${from}),var(--color-${to}))_padding-box,linear-gradient(90deg,var(--color-primary-400),var(--color-accent-400))_border-box]`;

	const variants: Record<string, string> = {
		[ButtonVariant.PRIMARY]: `bg-gradient-to-b from-primary-600 to-primary-700 text-white shadow-[0_2px_0_0_var(--color-primary-800),0_1px_2px_0_rgb(0_0_0/0.06),0_4px_12px_-2px_rgb(57_97_145/0.15)] hover:shadow-[0_2px_0_0_var(--color-primary-800),0_2px_4px_0_rgb(0_0_0/0.08),0_8px_24px_-4px_rgb(57_97_145/0.25)] active:translate-y-[2px] active:shadow-[0_0_0_0_var(--color-primary-800),0_1px_2px_0_rgb(0_0_0/0.1)] ${gradientFocus('primary-600', 'primary-700')}`,
		[ButtonVariant.SECONDARY]: `bg-gradient-to-b from-secondary-500 to-secondary-600 text-white shadow-[0_2px_0_0_var(--color-secondary-800),0_1px_2px_0_rgb(0_0_0/0.06),0_4px_12px_-2px_rgb(209_106_31/0.15)] hover:shadow-[0_2px_0_0_var(--color-secondary-800),0_2px_4px_0_rgb(0_0_0/0.08),0_8px_24px_-4px_rgb(209_106_31/0.25)] active:translate-y-[2px] active:shadow-[0_0_0_0_var(--color-secondary-800),0_1px_2px_0_rgb(0_0_0/0.1)] ${gradientFocus('secondary-500', 'secondary-600')}`,
		[ButtonVariant.OUTLINE]:
			'border-border-strong bg-surface/90 text-fg-muted hover:bg-surface-raised hover:border-border-strong hover:shadow-md active:bg-surface-overlay focus-visible:ring-2 focus-visible:ring-primary-400/60 focus-visible:ring-offset-2',
		[ButtonVariant.GHOST]:
			'text-fg-muted bg-surface/10 border-border-subtle hover:bg-surface/20 hover:border-border-default active:bg-surface/10 focus-visible:ring-2 focus-visible:ring-primary-400/60 focus-visible:ring-offset-2',
		[ButtonVariant.DANGER]: `bg-gradient-to-b from-error-600 to-error-700 text-white shadow-[0_2px_0_0_var(--color-error-800),0_1px_2px_0_rgb(0_0_0/0.06),0_4px_12px_-2px_rgb(220_38_38/0.15)] hover:shadow-[0_2px_0_0_var(--color-error-800),0_2px_4px_0_rgb(0_0_0/0.08),0_8px_24px_-4px_rgb(220_38_38/0.25)] active:translate-y-[2px] active:shadow-[0_0_0_0_var(--color-error-800),0_1px_2px_0_rgb(0_0_0/0.1)] ${gradientFocus('error-600', 'error-700')}`,
		[ButtonVariant.SUCCESS]: `bg-gradient-to-b from-success-600 to-success-700 text-white shadow-[0_2px_0_0_var(--color-success-800),0_1px_2px_0_rgb(0_0_0/0.06),0_4px_12px_-2px_rgb(22_163_74/0.15)] hover:shadow-[0_2px_0_0_var(--color-success-800),0_2px_4px_0_rgb(0_0_0/0.08),0_8px_24px_-4px_rgb(22_163_74/0.25)] active:translate-y-[2px] active:shadow-[0_0_0_0_var(--color-success-800),0_1px_2px_0_rgb(0_0_0/0.1)] ${gradientFocus('success-600', 'success-700')}`
	};

	/**
	 * `min-h-*` is the height contract, and Select matches it at the same size.
	 *
	 * Padding is deliberately small enough that a single line of text plus the
	 * border fits inside `min-h-*`, so a normal button is exactly that height.
	 * Padding used to overshoot — a md button asked for 40px and rendered 44 —
	 * which left `min-h-*` inert and every size 4-8px off its nominal value.
	 * A label that wraps still grows the button past the minimum, as before.
	 */
	const sizes: Record<string, string> = {
		[ComponentSize.XS]: 'min-h-7 h-auto py-1 px-2.5 text-xs rounded-md',
		[ComponentSize.SM]: 'min-h-8 h-auto py-1 px-3 text-sm rounded-md',
		[ComponentSize.MD]: 'min-h-10 h-auto py-1.5 px-4 text-base rounded-md',
		[ComponentSize.LG]: 'min-h-11 h-auto py-2 px-6 text-base rounded-md',
		[ComponentSize.XL]: 'min-h-12 h-auto py-2 px-8 text-lg rounded-md'
	};

	const computedClass = $derived(
		cn(
			baseStyles,
			variants[variant] as string,
			sizes[size] as string,
			fullWidth && 'w-full',
			className
		)
	);

	const buttonDisabled = $derived(disabled || loading);
</script>

{#snippet buttonContent()}
	{#if loading}
		<svg
			class="h-4 w-4 animate-spin"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24">
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
			</circle>
			<path
				class="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
			</path>
		</svg>
	{:else if icon}
		{@render icon()}
	{/if}

	{#if children}
		{@render children()}
	{/if}
{/snippet}

{#if href}
	<BitsButton.Root
		class={computedClass}
		{href}
		disabled={buttonDisabled ? true : undefined}
		aria-disabled={buttonDisabled ? true : undefined}
		tabindex={buttonDisabled ? -1 : 0}
		{onclick}
		{...restProps}>
		{@render buttonContent()}
	</BitsButton.Root>
{:else}
	<BitsButton.Root class={computedClass} {type} disabled={buttonDisabled} {onclick} {...restProps}>
		{@render buttonContent()}
	</BitsButton.Root>
{/if}
