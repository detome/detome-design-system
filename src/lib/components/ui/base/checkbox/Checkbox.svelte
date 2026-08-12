<script lang="ts">
	import { Checkbox as BitsCheckbox } from 'bits-ui';
	import { cn } from '$lib/utils/cn';
	import { Check, Minus } from '@lucide/svelte';
	import type { Snippet } from 'svelte';

	/**
	 * Boolean input with checked/unchecked/indeterminate states.
	 * Wraps bits-ui.Checkbox.Root for accessibility and tri-state support.
	 *
	 * @example Basic checkbox
	 * ```svelte
	 * <Checkbox bind:checked={agreeToTerms} />
	 * <Label for="terms">I agree to the terms</Label>
	 * ```
	 *
	 * @example Required field
	 * ```svelte
	 * <Checkbox bind:checked={requiredField} required />
	 * <Label for="required">Required option</Label>
	 * ```
	 *
	 * @example Indeterminate (tri-state)
	 * ```svelte
	 * <Checkbox bind:checked={allSelected} bind:indeterminate={someSelected} />
	 * <Label for="all">Select all</Label>
	 * ```
	 *
	 * @example Disabled
	 * ```svelte
	 * <Checkbox bind:checked={disabledCheck} disabled />
	 * <Label for="disabled">Disabled option</Label>
	 * ```
	 *
	 * @param {boolean} checked - Current checked state (bindable)
	 * @param {boolean} indeterminate - Indeterminate state for tri-state checkboxes (partially selected). Bindable. Default: false
	 * @param {boolean} disabled - Disables checkbox interaction. Default: false
	 * @param {boolean} required - Shows asterisk, form validation hint. Default: false
	 * @param {string} name - HTML name attribute for form submission
	 * @param {string} value - HTML value attribute
	 * @param {string} id - HTML id for label association
	 * @param {Snippet} children - Label content displayed next to checkbox
	 * @param {string} class - Additional CSS classes to apply
	 * @param {(checked: boolean | 'indeterminate') => void} onCheckedChange - Callback when checked state changes
	 *
	 * @see {@link RadioGroup} - Use for single-select radio buttons
	 * @see {@link Switch} - Use for toggle switches instead
	 *
	 * @accessibility
	 * - Native checkbox keyboard support (Space to toggle)
	 * - Proper label association via for/id attributes
	 * - Indeterminate state properly announced to screen readers
	 * - Visual focus ring for keyboard navigation
	 * - Required indicator (asterisk) for form validation
	 */
	interface Props {
		/** Current checked state */
		checked?: boolean;
		/** Indeterminate state (for tri-state checkboxes) */
		indeterminate?: boolean;
		/** Whether the checkbox is disabled */
		disabled?: boolean;
		/** Whether the checkbox is required */
		required?: boolean;
		/** HTML name attribute */
		name?: string;
		/** HTML value attribute */
		value?: string;
		/** Label content snippet */
		children?: Snippet;
		/** Additional CSS classes */
		class?: string;
		/** HTML id attribute */
		id?: string;
		/** Callback when checked state changes */
		onCheckedChange?: (checked: boolean | 'indeterminate') => void;
	}

	let {
		checked = $bindable(),
		indeterminate = $bindable(false),
		disabled = false,
		required = false,
		name,
		value,
		children,
		class: classValue,
		id,
		onCheckedChange,
		...restProps
	}: Props = $props();

	const baseStyles =
		'peer h-5 w-5 shrink-0 rounded-md border-2 border-border-strong bg-surface transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-500/20 disabled:cursor-not-allowed disabled:opacity-50 hover:border-primary-400 hover:shadow-[0_0_0_4px_rgb(57_97_145/0.08)]';
	const checkedStyles =
		'data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-primary-600 data-[state=checked]:to-primary-500 data-[state=checked]:border-primary-600 data-[state=checked]:text-white data-[state=checked]:shadow-[0_2px_4px_0_rgb(57_97_145/0.3),inset_0_1px_0_0_rgb(255_255_255/0.2)] data-[state=checked]:scale-105';
	const indeterminateStyles =
		'data-[state=indeterminate]:bg-gradient-to-br data-[state=indeterminate]:from-primary-600 data-[state=indeterminate]:to-primary-500 data-[state=indeterminate]:border-primary-600 data-[state=indeterminate]:text-white data-[state=indeterminate]:shadow-[0_2px_4px_0_rgb(57_97_145/0.3),inset_0_1px_0_0_rgb(255_255_255/0.2)] data-[state=indeterminate]:scale-105';
</script>

<div class="flex items-center gap-2">
	<BitsCheckbox.Root
		bind:checked
		bind:indeterminate
		{disabled}
		{required}
		{name}
		{value}
		{id}
		{onCheckedChange}
		class={cn(baseStyles, checkedStyles, indeterminateStyles, classValue)}>
		{#snippet children(props)}
			{#if props.indeterminate}
				<Minus class="h-4 w-4" />
			{:else if props.checked}
				<Check class="h-4 w-4" />
			{/if}
		{/snippet}
	</BitsCheckbox.Root>

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
