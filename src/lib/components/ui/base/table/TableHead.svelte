<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	/**
	 * Table header component containing column definitions.
	 * Wraps table thead with predefined styling and structure.
	 *
	 * @example Basic header
	 * ```svelte
	 * <TableHead>
	 *   <TableHeadCell>Name</TableHeadCell>
	 *   <TableHeadCell>Email</TableHeadCell>
	 *   <TableHeadCell>Status</TableHeadCell>
	 * </TableHead>
	 * ```
	 *
	 * @example With custom styling
	 * ```svelte
	 * <TableHead class="bg-blue-50">
	 *   <TableHeadCell>ID</TableHeadCell>
	 *   <TableHeadCell>Title</TableHeadCell>
	 * </TableHead>
	 * ```
	 *
	 * @example Without default row
	 * ```svelte
	 * <TableHead defaultRow={false}>
	 *   <tr class="custom-row">
	 *     <TableHeadCell>Custom</TableHeadCell>
	 *   </tr>
	 * </TableHead>
	 * ```
	 *
	 * @example Clickable header
	 * ```svelte
	 * <TableHead>
	 *   <TableHeadCell onclick={handleSort}>Sort</TableHeadCell>
	 *   <TableHeadCell>Name</TableHeadCell>
	 * </TableHead>
	 * ```
	 *
	 * @param {Snippet} children - TableHeadCell components
	 * @param {string} class - Additional CSS classes to apply
	 * @param {boolean} defaultRow - If true, wraps children in tr element. Default: true
	 *
	 * @see {@link Table} - Main table container
	 * @see {@link TableHeadCell} - Individual header cell
	 *
	 * @accessibility
	 * - Semantic thead element
	 * - Uppercase text for visual hierarchy
	 * - High contrast background
	 * - Supports sort indicators via onclick
	 */
	interface Props {
		children?: Snippet;
		class?: string;
		defaultRow?: boolean;
	}

	let { children, class: className, defaultRow = true, ...restProps }: Props = $props();

	const baseStyles = 'text-xs text-fg-muted uppercase bg-surface-raised';
</script>

<thead class={cn(baseStyles, className)} {...restProps}>
	{#if children}
		<tr>
			{@render children()}
		</tr>
	{/if}
</thead>
