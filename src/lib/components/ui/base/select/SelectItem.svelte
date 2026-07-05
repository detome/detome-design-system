<script lang="ts">
	import { Select as BitsSelect } from 'bits-ui';
	import { Check } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import { SELECT_ITEM_CLASS } from './select-item-styles';

	/**
	 * Individual select option item for custom rendering in Select dropdown.
	 * Wraps bits-ui.Select.Item.
	 *
	 * @example Basic usage
	 * ```svelte
	 * <SelectItem value="option1">Option 1</SelectItem>
	 * ```
	 *
	 * @example With label
	 * ```svelte
	 * <SelectItem value="premium" label="Premium Plan">Premium Plan ($29/mo)</SelectItem>
	 * ```
	 *
	 * @example Disabled option
	 * ```svelte
	 * <SelectItem value="unavailable" disabled>This option is unavailable</SelectItem>
	 * ```
	 *
	 * @example With custom content
	 * ```svelte
	 * <SelectItem value="custom">
	 *   <div class="flex items-center gap-2">
	 *     <Icon class="h-4 w-4" />
	 *     <span>Option with icon</span>
	 *   </div>
	 * </SelectItem>
	 * ```
	 *
	 * @example In Select component
	 * ```svelte
	 * <Select bind:value={selected}>
	 *   {#snippet children()}
	 *     <SelectItem value="opt1">First Option</SelectItem>
	 *     <SelectItem value="opt2">Second Option</SelectItem>
	 *     <SelectItem value="opt3" disabled>Disabled Option</SelectItem>
	 *   {/snippet}
	 * </Select>
	 * ```
	 *
	 * @param {string} value - Unique value for this option (required)
	 * @param {string} label - Display label text (optional, children used if not provided)
	 * @param {boolean} disabled - If true, option cannot be selected. Default: false
	 * @param {Snippet} children - Custom content for option (text, icons, etc.)
	 *
	 * @see {@link Select} - Use Select to wrap SelectItems
	 *
	 * @accessibility
	 * - Keyboard navigable (arrow keys, Enter to select)
	 * - Checkmark icon shows selected state
	 * - Hover state provides visual feedback
	 * - Disabled state properly indicated
	 * - Screen reader announces option text
	 */
	interface Props {
		value: string;
		label?: string;
		disabled?: boolean;
		children?: Snippet;
	}

	let { value, label, disabled = false, children }: Props = $props();
</script>

<BitsSelect.Item {value} {label} {disabled} class={SELECT_ITEM_CLASS}>
	<span class="check-icon absolute left-2 hidden">
		<Check class="h-4 w-4" />
	</span>
	{#if children}
		{@render children()}
	{/if}
</BitsSelect.Item>
