<script lang="ts">
	import { Select as BitsSelect } from 'bits-ui';
	import { cn } from '$lib/utils/cn';
	import { ChevronDown, Check } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import { safeValueToString, findOptionByValue } from '$lib/utils/bits-ui-utils';
	import { SELECT_ITEM_CLASS } from './select-item-styles';
	import { ComponentSize, type ComponentSizeType } from '../enums';

	/**
	 * Select option interface
	 * @interface SelectOption
	 */
	export interface SelectOption {
		/** Option value (can be string, number, or null) */
		value: string | number | null;
		/** Display label for the option */
		label?: string;
		/** Whether the option is disabled */
		disabled?: boolean;
	}

	/**
	 * Select component props
	 * @interface Props
	 */
	interface Props {
		/** Currently selected value */
		value?: string | number | null;
		/** Available options */
		options?: SelectOption[];
		/** Placeholder text when no option is selected */
		placeholder?: string;
		/**
		 * Trigger size. Matches the same size on Button, so the two line up when
		 * placed side by side. Default: ComponentSize.MD
		 */
		size?: ComponentSize | ComponentSizeType;
		/** Whether the select is disabled */
		disabled?: boolean;
		/** Whether the select is required */
		required?: boolean;
		/** Error message to display */
		error?: string;
		/** Custom content snippet */
		children?: Snippet;
		/** Additional CSS classes */
		class?: string;
		/** HTML id attribute */
		id?: string;
		/** Callback when selection changes */
		onChange?: (value: string | number | null | undefined) => void;
	}

	let {
		value = $bindable(),
		options = [],
		placeholder = 'Select an option',
		size = ComponentSize.MD,
		disabled = false,
		required = false,
		error,
		children,
		class: classValue,
		id,
		onChange,
		...restProps
	}: Props = $props();

	/**
	 * bits-ui's Select component requires string values for its internal state management.
	 * This component automatically converts values to strings internally and back to the
	 * original type when calling the onChange callback, preserving type safety at the
	 * component boundary while using bits-ui's native capabilities.
	 */

	// Convert current value to string for bits-ui (read-only derived)
	let selectedStringValue = $derived(safeValueToString(value));

	// Find selected option for display
	const selected = $derived(findOptionByValue(options, value) as SelectOption | undefined);

	/**
	 * Handles value change from bits-ui select
	 * Converts string value back to original type and triggers onChange callback
	 * @param newStringValue - New string value from bits-ui
	 */
	function handleValueChange(newStringValue: string | undefined) {
		try {
			const option = findOptionByValue(options, newStringValue) as SelectOption | undefined;
			const newVal = option?.value ?? null;
			if (value !== newVal) {
				value = newVal;
				onChange?.(newVal);
			}
		} catch (error) {
			console.error('Error handling select value change:', error);
			// Fallback to null if conversion fails
			value = null;
			onChange?.(null);
		}
	}

	const baseStyles =
		'flex w-full items-center justify-between rounded-md border bg-white text-gray-900 transition-all duration-200 dark:text-gray-50';

	/**
	 * Heights mirror Button's `sizes` so a Select and a Button of the same size
	 * line up in a row. Button sets `min-h-*` because its label can wrap; a
	 * trigger renders a single line, so a fixed `h-*` of the same value matches.
	 *
	 * MD reproduces the pre-size styling (`h-10 px-4 text-sm`) and stays the
	 * default, so existing usages are unaffected.
	 */
	const sizes: Record<string, string> = {
		[ComponentSize.XS]: 'h-7 px-2.5 text-xs',
		[ComponentSize.SM]: 'h-8 px-3 text-sm',
		[ComponentSize.MD]: 'h-10 px-4 text-sm',
		[ComponentSize.LG]: 'h-11 px-6 text-base',
		[ComponentSize.XL]: 'h-12 px-8 text-lg'
	};

	const sizeStyles = $derived(sizes[size] ?? sizes[ComponentSize.MD]);
	const normalStyles =
		'border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700';
	const errorStyles = $derived(
		error ? 'border-error-500 focus:ring-error-500' : 'border-gray-300 dark:border-gray-600'
	);
	const disabledStyles = 'disabled:cursor-not-allowed disabled:opacity-50';
	const valueStyles = $derived(selected ? '' : 'text-gray-400 dark:text-gray-500');
</script>

<div class="w-full">
	<BitsSelect.Root
		type="single"
		value={selectedStringValue}
		onValueChange={handleValueChange}
		{disabled}>
		<BitsSelect.Trigger
			{id}
			class={cn(baseStyles, sizeStyles, errorStyles, normalStyles, disabledStyles, classValue)}>
			<span class={cn('flex-1 text-left', valueStyles)}>
				{selected?.label ?? placeholder}
			</span>
			<ChevronDown class="h-4 w-4 opacity-50" />
		</BitsSelect.Trigger>

		<BitsSelect.Portal>
			<BitsSelect.Content
				class="z-50 max-h-96 w-[var(--bits-select-anchor-width)] overflow-auto rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
				{#if children}
					{@render children()}
				{:else if options.length > 0}
					{#each options as option}
						<BitsSelect.Item
							value={option.value?.toString() ?? ''}
							label={option.label}
							disabled={option.disabled}
							class={SELECT_ITEM_CLASS}>
							<span class="check-icon absolute left-2 hidden">
								<Check class="h-4 w-4" />
							</span>
							{option.label}
						</BitsSelect.Item>
					{/each}
				{/if}
			</BitsSelect.Content>
		</BitsSelect.Portal>
	</BitsSelect.Root>

	{#if error}
		<p class="text-error-600 dark:text-error-400 mt-1 text-sm">{error}</p>
	{/if}
</div>
