<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	/**
	 * Table body cell for displaying data.
	 * Semantic td element with customizable padding and colspan.
	 *
	 * @example Basic cell
	 * ```svelte
	 * <TableBodyCell>John Doe</TableBodyCell>
	 * ```
	 *
	 * @example With custom padding
	 * ```svelte
	 * <TableBodyCell padding="px-4 py-2">Compact cell</TableBodyCell>
	 * ```
	 *
	 * @example With colspan
	 * ```svelte
	 * <TableBodyCell colspan={3}>
	 *   No data available
	 * </TableBodyCell>
	 * ```
	 *
	 * @example With custom content
	 * ```svelte
	 * <TableBodyCell>
	 *   <Button variant="outline" size="sm">Edit</Button>
	 * </TableBodyCell>
	 * ```
	 *
	 * @example With custom styling
	 * ```svelte
	 * <TableBodyCell class="text-center text-blue-600">
	 *   Active
	 * </TableBodyCell>
	 * ```
	 *
	 * @example With icon
	 * ```svelte
	 * <TableBodyCell>
	 *   <User class="h-4 w-4 inline mr-2" />
	 *   John Doe
	 * </TableBodyCell>
	 * ```
	 *
	 * @param {Snippet} children - Cell content
	 * @param {string} class - Additional CSS classes to apply
	 * @param {string} padding - Padding classes for cell. Default: 'px-6 py-4'
	 * @param {number} colspan - Number of columns cell should span
	 *
	 * @see {@link Table} - Main table container
	 * @see {@link TableBodyRow} - Table row component
	 * @see {@link TableHeadCell} - Header cell component
	 *
	 * @accessibility
	 * - Semantic td element
	 * - Supports colspan for merged cells
	 * - High contrast text
	 * - Proper padding for readability
	 */
	interface Props {
		children?: Snippet;
		class?: string;
		padding?: string;
		colspan?: number;
	}

	let {
		children,
		class: className,
		padding = 'px-6 py-4',
		colspan,
		...restProps
	}: Props = $props();

	const baseStyles = 'text-fg-default';
</script>

<td class={cn(padding, baseStyles, className)} {colspan} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</td>
