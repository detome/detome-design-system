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

	const baseStyles =
		'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-3 disabled:pointer-events-none disabled:opacity-50 whitespace-normal overflow-hidden';

	const variants: Record<string, string> = {
		[ButtonVariant.PRIMARY]:
			'bg-gradient-to-b from-primary-600 to-primary-700 text-white shadow-[0_1px_2px_0_rgb(0_0_0/0.06),0_4px_12px_-2px_rgb(15_91_238/0.15),inset_0_1px_0_0_rgb(255_255_255/0.15)] hover:shadow-[0_2px_4px_0_rgb(0_0_0/0.08),0_8px_24px_-4px_rgb(15_91_238/0.25),inset_0_1px_0_0_rgb(255_255_255/0.2)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_1px_2px_0_rgb(0_0_0/0.1),0_2px_8px_-2px_rgb(15_91_238/0.2),inset_0_1px_0_0_rgb(255_255_255/0.1)]',
		[ButtonVariant.SECONDARY]:
			'bg-gradient-to-b from-secondary-500 to-secondary-600 text-white shadow-[0_1px_2px_0_rgb(0_0_0/0.06),0_4px_12px_-2px_rgb(209_106_31/0.15),inset_0_1px_0_0_rgb(255_255_255/0.15)] hover:shadow-[0_2px_4px_0_rgb(0_0_0/0.08),0_8px_24px_-4px_rgb(209_106_31/0.25),inset_0_1px_0_0_rgb(255_255_255/0.2)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_1px_2px_0_rgb(0_0_0/0.1),0_2px_8px_-2px_rgb(209_106_31/0.2),inset_0_1px_0_0_rgb(255_255_255/0.1)]',
		[ButtonVariant.OUTLINE]:
			'border-2 border-gray-300 bg-white/90 text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:shadow-md active:bg-gray-100 dark:bg-gray-800/90 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700/80',
		[ButtonVariant.GHOST]:
			'text-gray-700 bg-white/10 border border-white/10 hover:bg-white/20 hover:border-white/20 active:bg-white/10 dark:text-gray-300 dark:hover:bg-gray-800/50',
		[ButtonVariant.DANGER]:
			'bg-gradient-to-b from-error-600 to-error-700 text-white shadow-[0_1px_2px_0_rgb(0_0_0/0.06),0_4px_12px_-2px_rgb(220_38_38/0.15),inset_0_1px_0_0_rgb(255_255_255/0.15)] hover:shadow-[0_2px_4px_0_rgb(0_0_0/0.08),0_8px_24px_-4px_rgb(220_38_38/0.25),inset_0_1px_0_0_rgb(255_255_255/0.2)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_1px_2px_0_rgb(0_0_0/0.1),0_2px_8px_-2px_rgb(220_38_38/0.2),inset_0_1px_0_0_rgb(255_255_255/0.1)]',
		[ButtonVariant.SUCCESS]:
			'bg-gradient-to-b from-success-600 to-success-700 text-white shadow-[0_1px_2px_0_rgb(0_0_0/0.06),0_4px_12px_-2px_rgb(22_163_74/0.15),inset_0_1px_0_0_rgb(255_255_255/0.15)] hover:shadow-[0_2px_4px_0_rgb(0_0_0/0.08),0_8px_24px_-4px_rgb(22_163_74/0.25),inset_0_1px_0_0_rgb(255_255_255/0.2)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_1px_2px_0_rgb(0_0_0/0.1),0_2px_8px_-2px_rgb(22_163_74/0.2),inset_0_1px_0_0_rgb(255_255_255/0.1)]'
	};

	const sizes: Record<string, string> = {
		[ComponentSize.XS]: 'min-h-7 h-auto py-1.5 px-2.5 text-xs rounded-md',
		[ComponentSize.SM]: 'min-h-8 h-auto py-2 px-3 text-sm rounded-md',
		[ComponentSize.MD]: 'min-h-10 h-auto py-2.5 px-4 text-base rounded-md',
		[ComponentSize.LG]: 'min-h-11 h-auto py-3 px-6 text-base rounded-md',
		[ComponentSize.XL]: 'min-h-12 h-auto py-3.5 px-8 text-lg rounded-md'
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

{#if href}
	<BitsButton.Root
		class={computedClass}
		{href}
		disabled={buttonDisabled ? true : undefined}
		aria-disabled={buttonDisabled ? true : undefined}
		tabindex={buttonDisabled ? -1 : 0}
		{onclick}
		{...restProps}>
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
	</BitsButton.Root>
{:else}
	<BitsButton.Root class={computedClass} {type} disabled={buttonDisabled} {onclick} {...restProps}>
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
	</BitsButton.Root>
{/if}
