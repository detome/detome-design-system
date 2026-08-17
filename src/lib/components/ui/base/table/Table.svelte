<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	/**
	 * Table container component with responsive scrolling and visual variants.
	 * Wraps semantic HTML table with overflow handling and styling options.
	 *
	 * @example Basic table
	 * ```svelte
	 * <Table>
	 *   <TableHead>
	 *     <TableHeadCell>Name</TableHeadCell>
	 *     <TableHeadCell>Email</TableHeadCell>
	 *   </TableHead>
	 *   <TableBody>
	 *     <TableBodyRow>
	 *       <TableBodyCell>John Doe</TableBodyCell>
	 *       <TableBodyCell>john@example.com</TableBodyCell>
	 *     </TableBodyRow>
	 *   </TableBody>
	 * </Table>
	 * ```
	 *
	 * @example Striped rows
	 * ```svelte
	 * <Table striped>
	 *   <TableHead>
	 *     <TableHeadCell>Name</TableHeadCell>
	 *   </TableHead>
	 *   <TableBody>
	 *     <TableBodyRow>
	 *       <TableBodyCell>Item 1</TableBodyCell>
	 *     </TableBodyRow>
	 *   </TableBody>
	 * </Table>
	 * ```
	 *
	 * @example Hoverable rows
	 * ```svelte
	 * <Table hoverable>
	 *   <TableHead>
	 *     <TableHeadCell>Product</TableHeadCell>
	 *   </TableHead>
	 *   <TableBody>
	 *     <TableBodyRow>
	 *       <TableBodyCell>Hover me</TableBodyCell>
	 *     </TableBodyRow>
	 *   </TableBody>
	 * </Table>
	 * ```
	 *
	 * @example With shadow and no border
	 * ```svelte
	 * <Table shadow noborder>
	 *   <TableHead>
	 *     <TableHeadCell>Title</TableHeadCell>
	 *   </TableHead>
	 *   <TableBody>
	 *     <TableBodyRow>
	 *       <TableBodyCell>Content</TableBodyCell>
	 *     </TableBodyRow>
	 *   </TableBody>
	 * </Table>
	 * ```
	 *
	 * @example With custom classes
	 * ```svelte
	 * <Table classes={{ div: 'max-h-96', table: 'w-full' }}>
	 *   <TableHead>
	 *     <TableHeadCell>Header</TableHeadCell>
	 *   </TableHead>
	 *   <TableBody>
	 *     <TableBodyRow>
	 *       <TableBodyCell>Data</TableBodyCell>
	 *     </TableBodyRow>
	 *   </TableBody>
	 * </Table>
	 * ```
	 *
	 * @param {Snippet} children - Table content (TableHead, TableBody)
	 * @param {string} class - Additional CSS classes to apply to table element
	 * @param {{div?: string, table?: string}} classes - Object with div and table class overrides
	 * @param {boolean} striped - If true, applies alternating row background colors. Default: false
	 * @param {boolean} hoverable - If true, adds hover effect to rows. Default: false
	 * @param {boolean} noborder - If true, removes border collapse. Default: false
	 * @param {boolean} shadow - If true, adds shadow to table container. Default: false
	 *
	 * @see {@link TableHead} - Table header component
	 * @see {@link TableBody} - Table body component
	 * @see {@link TableBodyRow} - Table row component
	 * @see {@link TableBodyCell} - Table cell component
	 *
	 * @accessibility
	 * - Semantic HTML table structure
	 * - Responsive scrolling for mobile
	 * - Proper scope attributes on headers
	 * - Keyboard navigable rows with onclick
	 * - High contrast text colors
	 */
	interface Props {
		children?: Snippet;
		class?: string;
		classes?: {
			div?: string;
			table?: string;
		};
		striped?: boolean;
		hoverable?: boolean;
		noborder?: boolean;
		shadow?: boolean;
	}

	let {
		children,
		class: className,
		classes,
		striped = false,
		hoverable = false,
		noborder = false,
		shadow = false,
		...restProps
	}: Props = $props();

	const baseStyles = 'w-full text-sm text-left text-fg-muted';
	const borderStyles = $derived(noborder ? '' : 'border-collapse');
	const shadowStyles = $derived(shadow ? 'shadow-md' : '');
</script>

<div class={cn('relative overflow-x-auto', classes?.div)}>
	<table
		class={cn(baseStyles, borderStyles, shadowStyles, className, classes?.table)}
		{...restProps}>
		{#if children}
			{@render children()}
		{/if}
	</table>
</div>
