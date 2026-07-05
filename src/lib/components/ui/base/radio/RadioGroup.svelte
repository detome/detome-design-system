<script lang="ts">
	import { RadioGroup as BitsRadioGroup } from 'bits-ui';
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	/**
	 * Radio button group with single-select functionality.
	 * Wraps bits-ui.RadioGroup.Root for accessibility.
	 *
	 * @example Using options prop
	 * ```svelte
	 * <RadioGroup bind:value={selectedPlan} options={[
	 *   { value: 'free', label: 'Free Plan' },
	 *   { value: 'pro', label: 'Pro Plan' },
	 *   { value: 'enterprise', label: 'Enterprise' }
	 * ]} />
	 * ```
	 *
	 * @example Horizontal orientation
	 * ```svelte
	 * <RadioGroup
	 *   bind:value={selectedTheme}
	 *   orientation="horizontal"
	 *   options={[
	 *     { value: 'light', label: 'Light' },
	 *     { value: 'dark', label: 'Dark' }
	 *   ]} />
	 * ```
	 *
	 * @example With disabled options
	 * ```svelte
	 * <RadioGroup bind:value={plan} options={[
	 *   { value: 'free', label: 'Free' },
	 *   { value: 'pro', label: 'Pro (Upgrade)' },
	 *   { value: 'enterprise', label: 'Enterprise', disabled: true }
	 * ]} />
	 * ```
	 *
	 * @example With custom children
	 * ```svelte
	 * <RadioGroup bind:value={selected}>
	 *   <RadioItem value="option1">Option 1</RadioItem>
	 *   <RadioItem value="option2">Option 2</RadioItem>
	 *   <RadioItem value="option3">Option 3</RadioItem>
	 * </RadioGroup>
	 * ```
	 *
	 * @param {string} value - Currently selected value (bindable)
	 * @param {RadioOption[]} options - Array of radio options (alternative to children). Each option has value, label, and optional disabled
	 * @param {boolean} disabled - Disables entire radio group. Default: false
	 * @param {boolean} required - Shows asterisk, form validation hint. Default: false
	 * @param {string} name - HTML name attribute for form grouping
	 * @param {Snippet} children - Custom RadioItem children (alternative to options prop)
	 * @param {string} class - Additional CSS classes to apply
	 * @param {'horizontal' | 'vertical'} orientation - Layout direction. Default: 'vertical'
	 *
	 * @interface RadioOption
	 * @property {string} value - Unique value for this option
	 * @property {string} label - Display label text
	 * @property {boolean} [disabled] - If true, option is disabled
	 *
	 * @see {@link RadioItem} - Use RadioItem for custom children
	 * @see {@link Checkbox} - Use Checkbox for multiple independent selections
	 *
	 * @accessibility
	 * - Arrow keys to navigate between options
	 * - Space or Enter to select
	 * - Proper ARIA role for radio groups
	 * - Visible focus indicator
	 * - Screen reader announces selected state
	 */
	interface RadioOption {
		value: string;
		label: string;
		disabled?: boolean;
	}

	interface Props {
		value?: string;
		options?: RadioOption[];
		disabled?: boolean;
		required?: boolean;
		name?: string;
		children?: Snippet;
		class?: string;
		orientation?: 'horizontal' | 'vertical';
	}

	let {
		value = $bindable(),
		options = [],
		disabled = false,
		required = false,
		name,
		children,
		class: className,
		orientation = 'vertical',
		...restProps
	}: Props = $props();

	const containerClass = $derived(orientation === 'horizontal' ? 'flex gap-4' : 'space-y-2');
</script>

<BitsRadioGroup.Root bind:value {disabled} {required} {name} class={cn(containerClass, className)}>
	{#if children}
		<!-- Support for custom children -->
		{@render children()}
	{:else if options.length > 0}
		<!-- Support for options prop -->
		{#each options as option}
			<div class="flex items-center gap-2">
				<BitsRadioGroup.Item
					id={`radio-${option.value}`}
					value={option.value}
					disabled={option.disabled}
					class="peer focus-visible:ring-primary-500 data-[state=checked]:border-primary-600 data-[state=checked]:bg-primary-600 h-5 w-5 shrink-0 rounded-full border-2 border-gray-300 bg-white transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800">
					{#snippet children(props)}
						{#if props.checked}
							<div class="flex h-full w-full items-center justify-center">
								<div class="h-2.5 w-2.5 rounded-full bg-white"></div>
							</div>
						{/if}
					{/snippet}
				</BitsRadioGroup.Item>
				<label
					for={`radio-${option.value}`}
					class="text-sm leading-none font-medium text-gray-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-50">
					{option.label}
					{#if required}
						<span class="text-error-500 ml-1">*</span>
					{/if}
				</label>
			</div>
		{/each}
	{/if}
</BitsRadioGroup.Root>
