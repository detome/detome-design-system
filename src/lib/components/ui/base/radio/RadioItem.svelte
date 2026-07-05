<script lang="ts">
	import { RadioGroup as BitsRadioGroup } from 'bits-ui';
	import { RADIO_ITEM_CLASS } from './radio-item-styles';
	import type { Snippet } from 'svelte';

	/**
	 * Individual radio button item for use within RadioGroup.
	 * Wraps bits-ui.RadioGroup.Item.
	 *
	 * @example Basic usage
	 * ```svelte
	 * <RadioItem value="option1">Option 1</RadioItem>
	 * ```
	 *
	 * @example With id for label
	 * ```svelte
	 * <RadioItem id="option-a" value="a">Option A</RadioItem>
	 * <Label for="option-a">Select Option A</Label>
	 * ```
	 *
	 * @example Disabled
	 * ```svelte
	 * <RadioItem value="disabled" disabled>This option is disabled</RadioItem>
	 * ```
	 *
	 * @example In RadioGroup
	 * ```svelte
	 * <RadioGroup bind:value={selected}>
	 *   <RadioItem value="morning">Morning</RadioItem>
	 *   <RadioItem value="afternoon">Afternoon</RadioItem>
	 *   <RadioItem value="evening">Evening</RadioItem>
	 * </RadioGroup>
	 * ```
	 *
	 * @example Clickable label
	 * ```svelte
	 * <RadioItem id="option-a" value="a" labelClickable>Option A</RadioItem>
	 * ```
	 *
	 * @param {string} value - Unique value for this radio option (required)
	 * @param {boolean} disabled - If true, this option cannot be selected. Default: false
	 * @param {string} id - HTML id for label association. Auto-generated per instance if omitted.
	 * @param {boolean} labelClickable - If true, clicking the label also selects the radio. Default: false
	 * @param {Snippet} children - Radio label text
	 *
	 * @see {@link RadioGroup} - Use RadioGroup to group multiple RadioItems
	 *
	 * @accessibility
	 * - Proper label association when used with id
	 * - Keyboard navigable as part of RadioGroup
	 * - ARIA checked state
	 * - Visible focus indicator when selected
	 */
	interface Props {
		value: string;
		disabled?: boolean;
		children?: Snippet;
		id?: string;
		labelClickable?: boolean;
	}

	let { value, disabled = false, children, id, labelClickable = true }: Props = $props();

	// Fall back to a component-scoped unique id so `labelClickable` works even
	// when the caller doesn't pass an explicit `id`.
	const uid = $props.id();
	const resolvedId = $derived(id ?? uid);
</script>

<div class="flex items-center gap-2">
	<BitsRadioGroup.Item {value} {disabled} id={resolvedId} class={RADIO_ITEM_CLASS}>
		{#snippet children(props)}
			{#if props.checked}
				<div class="flex h-full w-full items-center justify-center">
					<div class="h-2.5 w-2.5 rounded-full bg-white"></div>
				</div>
			{/if}
		{/snippet}
	</BitsRadioGroup.Item>

	{#if children}
		<label
			for={labelClickable ? resolvedId : undefined}
			class="text-sm leading-none font-medium text-gray-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-50 {labelClickable
				? 'cursor-pointer'
				: ''}">
			{@render children()}
		</label>
	{/if}
</div>
