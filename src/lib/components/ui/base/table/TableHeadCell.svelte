<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	/**
	 * Table header cell for column definitions.
	 * Semantic th element with predefined styling and scope.
	 *
	 * @example Basic header cell
	 * ```svelte
	 * <TableHeadCell>Name</TableHeadCell>
	 * ```
	 *
	 * @example With custom padding
	 * ```svelte
	 * <TableHeadCell padding="px-4 py-2">Title</TableHeadCell>
	 * ```
	 *
	 * @example Clickable for sorting
	 * ```svelte
	 * <TableHeadCell onclick={() => sort('name')}>
	 *   Name
	 *   <ArrowUpDown class="inline ml-1 h-4 w-4" />
	 * </TableHeadCell>
	 * ```
	 *
	 * @example With custom styling
	 * ```svelte
	 * <TableHeadCell class="text-center text-red-600">
	 *   Priority
	 * </TableHeadCell>
	 * ```
	 *
	 * @param {Snippet} children - Header cell content
	 * @param {string} class - Additional CSS classes to apply
	 * @param {string} padding - Padding classes for cell. Default: 'px-6 py-3'
	 * @param {(event: MouseEvent) => void} onclick - Click handler (e.g., for sorting)
	 *
	 * @see {@link Table} - Main table container
	 * @see {@link TableHead} - Table header container
	 * @see {@link TableBodyCell} - Body cell component
	 *
	 * @accessibility
	 * - Semantic th element with scope="col"
	 * - Keyboard accessible with onclick
	 * - High contrast text
	 * - Supports screen reader announcements
	 */
	interface Props {
		children?: Snippet;
		class?: string;
		padding?: string;
		onclick?: (event: MouseEvent) => void;
	}

	let {
		children,
		class: className,
		padding = 'px-6 py-3',
		onclick,
		...restProps
	}: Props = $props();

	const baseStyles = 'font-medium text-fg-default';
</script>

<th scope="col" class={cn(padding, baseStyles, className)} {onclick} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</th>
