<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	/**
	 * Table body row containing data cells.
	 * Semantic tr element with hover and border styling.
	 *
	 * @example Basic row
	 * ```svelte
	 * <TableBodyRow>
	 *   <TableBodyCell>John Doe</TableBodyCell>
	 *   <TableBodyCell>john@example.com</TableBodyCell>
	 * </TableBodyRow>
	 * ```
	 *
	 * @example Clickable row
	 * ```svelte
	 * <TableBodyRow onclick={() => navigate('/user/1')}>
	 *   <TableBodyCell>John Doe</TableBodyCell>
	 *   <TableBodyCell>View Profile</TableBodyCell>
	 * </TableBodyRow>
	 * ```
	 *
	 * @example With custom styling
	 * ```svelte
	 * <TableBodyRow class="bg-gray-100">
	 *   <TableBodyCell>Highlighted Row</TableBodyCell>
	 * </TableBodyRow>
	 * ```
	 *
	 * @example With custom color
	 * ```svelte
	 * <TableBodyRow color="blue">
	 *   <TableBodyCell>Blue accent</TableBodyCell>
	 * </TableBodyRow>
	 * ```
	 *
	 * @example Last row no border
	 * ```svelte
	 * <TableBodyRow class="border-b-0">
	 *   <TableBodyCell>Final Row</TableBodyCell>
	 * </TableBodyRow>
	 * ```
	 *
	 * @param {Snippet} children - TableBodyCell components
	 * @param {string} class - Additional CSS classes to apply
	 * @param {(event: MouseEvent) => void} onclick - Click handler for row interaction
	 *
	 * @see {@link Table} - Main table container
	 * @see {@link TableBody} - Table body container
	 * @see {@link TableBodyCell} - Table cell component
	 *
	 * @accessibility
	 * - Semantic tr element
	 * - Keyboard accessible with onclick and Enter key
	 * - Hover effect for visual feedback
	 * - Clear border separation between rows
	 */
	interface Props {
		children?: Snippet;
		class?: string;
		onclick?: (event: MouseEvent) => void;
	}

	let { children, class: className, onclick, ...restProps }: Props = $props();

	const baseStyles = 'border-b border-border-default hover:bg-surface-raised transition-colors';
	const bgStyles = 'bg-surface';
</script>

<tr class={cn(baseStyles, bgStyles, className)} {onclick} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</tr>
