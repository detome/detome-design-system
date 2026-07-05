<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { StatusVariant } from '../enums';
	import type { StatusVariantType } from '../enums';
	import type { Snippet } from 'svelte';

	/**
	 * Helper text component for form fields and descriptions.
	 * Provides contextual information below form inputs.
	 *
	 * @example Default helper text
	 * ```svelte
	 * <Helper>Enter your email address</Helper>
	 * ```
	 *
	 * @example Error message
	 * ```svelte
	 * <Helper color="error">Email is required</Helper>
	 * ```
	 *
	 * @example Success message
	 * ```svelte
	 * <Helper color="success">Email is valid</Helper>
	 * ```
	 *
	 * @example Warning message
	 * ```svelte
	 * <Helper color="warning">Email will be shared</Helper>
	 * ```
	 *
	 * @example With character count
	 * ```svelte
	 * <Helper>
	 *   {charsWritten}/500 characters
	 * </Helper>
	 * ```
	 *
	 * @example With format hint
	 * ```svelte
	 * <Helper>Format: MM/DD/YYYY</Helper>
	 * ```
	 *
	 * @example With link
	 * ```svelte
	 * <Helper>
	 *   By signing up, you agree to our
	 *   <A href="/terms">Terms of Service</A>
	 * </Helper>
	 * ```
	 *
	 * @example With icon
	 * ```svelte
	 * <Helper color="success">
	 *   <Check class="h-3 w-3 inline mr-1" />
	 *   Password is strong
	 * </Helper>
	 * ```
	 *
	 * @param {Snippet} children - Helper text content
	 * @param {string} class - Additional CSS classes to apply
	 * @param {StatusVariant | StatusVariantType} color - Text color variant. Default: StatusVariant.INFO
	 *   Options: 'default' | 'success' | 'error' | 'warning'
	 *
	 * @see {@link Input} - Form input component
	 * @see {@link Label} - Form label component
	 *
	 * @accessibility
	 * - Should be associated with form field via aria-describedby
	 * - Color variants provide semantic meaning
	 * - Screen reader accessible helper text
	 * - High contrast for all color variants
	 */
	interface Props {
		children?: Snippet;
		class?: string;
		color?: StatusVariant | StatusVariantType;
	}

	let { children, class: className, color = StatusVariant.INFO, ...restProps }: Props = $props();

	const colors: Record<StatusVariant, string> = {
		[StatusVariant.INFO]: 'text-gray-500 dark:text-gray-400',
		[StatusVariant.SUCCESS]: 'text-success-600 dark:text-success-400',
		[StatusVariant.ERROR]: 'text-error-600 dark:text-error-400',
		[StatusVariant.WARNING]: 'text-warning-600 dark:text-warning-400'
	};

	const baseStyles = 'mt-1 text-sm';
</script>

<p class={cn(baseStyles, colors[color] as string, className)} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</p>
