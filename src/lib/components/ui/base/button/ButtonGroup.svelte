<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	/**
	 * Groups buttons together with proper spacing and visual connection.
	 * Creates cohesive button groups for related actions.
	 *
	 * @example Basic button group
	 * ```svelte
	 * <ButtonGroup>
	 *   <Button variant="outline">Cancel</Button>
	 *   <Button variant="primary">Confirm</Button>
	 * </ButtonGroup>
	 * ```
	 *
	 * @example Multiple actions
	 * ```svelte
	 * <ButtonGroup>
	 *   <Button variant="ghost">
	 *     {#snippet icon()}
	 *       <Edit class="h-4 w-4" />
	 *     {/snippet}
	 *   </Button>
	 *   <Button variant="ghost">
	 *     {#snippet icon()}
	 *       <Copy class="h-4 w-4" />
	 *     {/snippet}
	 *   </Button>
	 *   <Button variant="ghost">
	 *     {#snippet icon()}
	 *       <Trash class="h-4 w-4" />
	 *     {/snippet}
	 *   </Button>
	 * </ButtonGroup>
	 * ```
	 *
	 * @example With custom class
	 * ```svelte
	 * <ButtonGroup class="w-full">
	 *   <Button fullWidth>Previous</Button>
	 *   <Button fullWidth>Next</Button>
	 * </ButtonGroup>
	 * ```
	 *
	 * @param {Snippet} children - Button components to group together
	 * @param {string} class - Additional CSS classes to apply
	 *
	 * @see {@link Button} - Use Button components as children
	 * @see {@link ToolbarGroup} - Similar grouping for toolbar use
	 *
	 * @accessibility
	 * - role="group" for semantic grouping
	 * - First button gets rounded-left, last gets rounded-right
	 * - Middle buttons have no border radius
	 * - Focus management maintained across buttons
	 */
	interface Props {
		children?: Snippet;
		class?: string;
	}

	let { children, class: className }: Props = $props();

	const baseStyles =
		'inline-flex rounded-md shadow-sm [&>*:first-child]:rounded-l-md [&>*:first-child]:rounded-r-none [&>*:last-child]:rounded-l-none [&>*:last-child]:rounded-r-md [&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:not(:last-child)]:border-r-0';
</script>

<div class={cn(baseStyles, className)} role="group">
	{#if children}
		{@render children()}
	{/if}
</div>
