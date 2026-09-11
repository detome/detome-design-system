<script lang="ts" module>
	/**
	 * Option interface for SegmentedControl
	 * @interface SegmentedControlOption
	 */
	export interface SegmentedControlOption {
		/** Option value */
		value: string;
		/** Display label for the option */
		label: string;
		/** Whether the option is disabled */
		disabled?: boolean;
	}
</script>

<script lang="ts">
	import { RadioGroup as BitsRadioGroup } from 'bits-ui';
	import { cn } from '$lib/utils/cn';
	import { ComponentSize, type ComponentSizeType } from '../enums';

	/**
	 * Segmented control for choosing exactly one option from a small set.
	 * Renders as an attached pill group; built on bits-ui RadioGroup so exactly
	 * one option is always selected and arrow keys move between segments.
	 *
	 * @example Basic usage
	 * ```svelte
	 * <SegmentedControl
	 *   bind:value={combinator}
	 *   ariaLabel="Filter combinator"
	 *   options={[
	 *     { value: 'and', label: 'AND' },
	 *     { value: 'or', label: 'OR' }
	 *   ]} />
	 * ```
	 *
	 * @example Extra small size
	 * ```svelte
	 * <SegmentedControl bind:value={mode} size={ComponentSize.XS} options={modes} />
	 * ```
	 *
	 * @example With change handler
	 * ```svelte
	 * <SegmentedControl bind:value={view} options={views} onChange={(v) => persist(v)} />
	 * ```
	 *
	 * @param {string} value - Currently selected value (bindable)
	 * @param {SegmentedControlOption[]} options - Segments to render (required)
	 * @param {ComponentSize | ComponentSizeType} size - Control size. Default: ComponentSize.SM
	 *   Options: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
	 * @param {boolean} disabled - Disables the whole control. Default: false
	 * @param {string} name - HTML name attribute for form grouping
	 * @param {string} ariaLabel - Accessible label for the group (recommended)
	 * @param {string} class - Additional CSS classes to apply to the container
	 * @param {(value: string) => void} onChange - Callback when the selection changes
	 *
	 * @see {@link RadioGroup} - Use RadioGroup for vertical/horizontal radio lists
	 * @see {@link Select} - Use Select when there are many options
	 * @see {@link Switch} - Use Switch for on/off settings
	 *
	 * @accessibility
	 * - Radio group semantics: exactly one segment is always selected
	 * - Arrow keys move between segments, Space/Enter select
	 * - Roving tabindex keeps the group a single tab stop
	 * - Visible focus ring for keyboard navigation
	 */
	interface Props {
		value?: string;
		options: SegmentedControlOption[];
		size?: ComponentSize | ComponentSizeType;
		disabled?: boolean;
		name?: string;
		ariaLabel?: string;
		class?: string;
		onChange?: (value: string) => void;
		[key: string]: unknown;
	}

	let {
		value = $bindable(),
		options,
		size = ComponentSize.SM,
		disabled = false,
		name,
		ariaLabel,
		class: className,
		onChange,
		...restProps
	}: Props = $props();

	const containerStyles =
		'inline-flex items-center gap-0.5 rounded-lg border border-border-default bg-surface-raised p-0.5';

	/**
	 * Item heights are one step below the Input heights at the same size so a
	 * control (item + 2px container padding + border) lines up with an Input of
	 * the same size when the two sit side by side.
	 */
	const sizes: Record<string, string> = {
		[ComponentSize.XS]: 'h-6 px-2 text-xs',
		[ComponentSize.SM]: 'h-7 px-2.5 text-xs',
		[ComponentSize.MD]: 'h-9 px-3 text-sm',
		[ComponentSize.LG]: 'h-11 px-4 text-base',
		[ComponentSize.XL]: 'h-12 px-6 text-lg'
	};

	const itemStyles =
		'inline-flex cursor-pointer items-center justify-center rounded-md font-medium whitespace-nowrap text-fg-muted transition-all duration-150 hover:text-fg-default focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-primary-600 data-[state=checked]:to-primary-500 data-[state=checked]:text-white data-[state=checked]:shadow-[0_2px_4px_0_rgb(57_97_145/0.3),inset_0_1px_0_0_rgb(255_255_255/0.2)]';

	function handleValueChange(newValue: string) {
		// Radio semantics guarantee a non-empty selection; the guard only covers
		// the brief moment before an initial value is applied.
		if (!newValue) return;
		onChange?.(newValue);
	}
</script>

<BitsRadioGroup.Root
	bind:value
	{disabled}
	{name}
	aria-label={ariaLabel}
	onValueChange={handleValueChange}
	class={cn(containerStyles, className)}
	{...restProps}>
	{#each options as option (option.value)}
		<BitsRadioGroup.Item
			value={option.value}
			disabled={option.disabled}
			class={cn(itemStyles, sizes[size] as string)}>
			{option.label}
		</BitsRadioGroup.Item>
	{/each}
</BitsRadioGroup.Root>
