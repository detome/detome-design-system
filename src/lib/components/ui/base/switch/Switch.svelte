<script lang="ts">
	import { Switch as BitsSwitch } from 'bits-ui';
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';
	import { AccentVariant } from '../enums';
	import type { AccentVariantType } from '../enums';

	/**
	 * Toggle switch with variants (primary, secondary, success, error, warning) and sizes.
	 * Wraps bits-ui.Switch.Root for accessibility.
	 *
	 * @example Basic usage
	 * ```svelte
	 * <Switch bind:checked={notificationsEnabled} />
	 * <Label for="switch">Enable notifications</Label>
	 * ```
	 *
	 * @example With variant
	 * ```svelte
	 * <Switch bind:checked={darkMode} variant={AccentVariant.SECONDARY} />
	 * <Label for="theme">Dark mode</Label>
	 * ```
	 *
	 * @example Success variant
	 * ```svelte
	 * <Switch bind:checked={autoSave} variant={AccentVariant.SUCCESS} />
	 * <Label for="autosave">Auto-save</Label>
	 * ```
	 *
	 * @example Error variant
	 * ```svelte
	 * <Switch bind:checked={strictMode} variant={AccentVariant.ERROR} />
	 * <Label for="strict">Strict mode</Label>
	 * ```
	 *
	 * @example Disabled
	 * ```svelte
	 * <Switch bind:checked={disabledSwitch} disabled />
	 * <Label for="disabled">Disabled switch</Label>
	 * ```
	 *
	 * @param {boolean} checked - Current checked state (bindable)
	 * @param {AccentVariant | AccentVariantType} variant - Color variant for semantic meaning. Default: AccentVariant.PRIMARY
	 *   Options: 'primary' | 'secondary' | 'success' | 'error' | 'warning'
	 *   Note: 'info' defaults to 'primary'
	 * @param {boolean} disabled - Disables switch interaction. Default: false
	 * @param {boolean} required - Shows asterisk, form validation hint. Default: false
	 * @param {string} name - HTML name attribute for form submission
	 * @param {string} value - HTML value attribute
	 * @param {string} id - HTML id for label association
	 * @param {Snippet} children - Label content displayed next to switch
	 * @param {string} class - Additional CSS classes to apply
	 * @param {(checked: boolean) => void} onCheckedChange - Callback when checked state changes
	 *
	 * @see {@link Checkbox} - Use Checkbox for boolean selections
	 * @see {@link RadioGroup} - Use RadioGroup for single-select options
	 *
	 * @accessibility
	 * - Keyboard toggle with Space and Enter
	 * - Visible focus ring for keyboard navigation
	 * - Proper label association via for/id attributes
	 * - Smooth animation with proper reduced motion support
	 * - ARIA switch role for screen readers
	 */
	interface Props {
		/** Current checked state */
		checked?: boolean;
		/** Whether the switch is disabled */
		disabled?: boolean;
		/** Whether the switch is required */
		required?: boolean;
		/** HTML name attribute */
		name?: string;
		/** HTML value attribute */
		value?: string;
		/** Label content snippet */
		children?: Snippet;
		/** Label content displayed to the left of the switch */
		leftLabel?: Snippet;
		/** Additional CSS classes */
		class?: string;
		/** HTML id attribute */
		id?: string;
		/** Visual variant (color scheme) */
		variant?: AccentVariant | AccentVariantType;
		/** Callback when checked state changes */
		onCheckedChange?: (checked: boolean) => void;
	}

	let {
		checked = $bindable(),
		disabled = false,
		required = false,
		name,
		value,
		children,
		leftLabel,
		class: classValue,
		id,
		variant = AccentVariant.PRIMARY,
		onCheckedChange,
		...restProps
	}: Props = $props();

	const color = $derived(variant);

	const colors: Record<string, string> = {
		primary:
			'data-[state=checked]:bg-primary-500 data-[state=checked]:shadow-[0_2px_4px_0_rgb(15_91_238/0.2)]',
		secondary:
			'data-[state=checked]:bg-secondary-500 data-[state=checked]:shadow-[0_2px_4px_0_rgb(209_106_31/0.2)]',
		success:
			'data-[state=checked]:bg-success-500 data-[state=checked]:shadow-[0_2px_4px_0_rgb(22_163_74/0.2)]',
		error:
			'data-[state=checked]:bg-error-500 data-[state=checked]:shadow-[0_2px_4px_0_rgb(220_38_38/0.2)]',
		warning:
			'data-[state=checked]:bg-warning-500 data-[state=checked]:shadow-[0_2px_4px_0_rgb(202_138_4/0.2)]',
		info: 'data-[state=checked]:bg-primary-500 data-[state=checked]:shadow-[0_2px_4px_0_rgb(15_91_238/0.2)]'
	};

	const baseStyles =
		'peer inline-flex h-6 w-11 min-h-6 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-gray-200 transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700';
	const thumbStyles =
		'pointer-events-none block h-5 w-5 rounded-full bg-white shadow-[0_2px_4px_0_rgb(0_0_0/0.15),0_0_0_1px_rgb(0_0_0/0.05)] ring-0 transition-transform duration-200 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] data-[state=checked]:translate-x-5 data-[state=checked]:scale-105 data-[state=unchecked]:translate-x-0';
</script>

<div class="flex items-center gap-2">
	{#if leftLabel}
		<label
			for={id}
			class="text-sm leading-none font-medium text-gray-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-50">
			{@render leftLabel()}
		</label>
	{/if}

	<BitsSwitch.Root
		bind:checked
		{disabled}
		{required}
		{name}
		{value}
		{id}
		{onCheckedChange}
		class={cn(baseStyles, colors[color] as string, classValue)}>
		<BitsSwitch.Thumb class={thumbStyles} />
	</BitsSwitch.Root>

	{#if children}
		<label
			for={id}
			class="text-sm leading-none font-medium text-gray-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-50">
			{@render children()}
			{#if required}
				<span class="text-error-500 ml-1">*</span>
			{/if}
		</label>
	{/if}
</div>
