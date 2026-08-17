<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	/**
	 * List group container for organizing related list items.
	 * Provides consistent styling and spacing for list content.
	 *
	 * @example Basic list group
	 * ```svelte
	 * <Listgroup>
	 *   <ListgroupItem onclick={() => select('item1')}>Item 1</ListgroupItem>
	 *   <ListgroupItem onclick={() => select('item2')}>Item 2</ListgroupItem>
	 *   <ListgroupItem onclick={() => select('item3')}>Item 3</ListgroupItem>
	 * </Listgroup>
	 * ```
	 *
	 * @example With custom styling
	 * ```svelte
	 * <Listgroup class="shadow-lg">
	 *   <ListgroupItem>Item 1</ListgroupItem>
	 *   <ListgroupItem>Item 2</ListgroupItem>
	 * </Listgroup>
	 * ```
	 *
	 * @example With icons
	 * ```svelte
	 * <Listgroup>
	 *   <ListgroupItem>
	 *     <User class="h-4 w-4 mr-2" />
	 *     Profile
	 *   </ListgroupItem>
	 *   <ListgroupItem>
	 *     <Settings class="h-4 w-4 mr-2" />
	 *     Settings
	 *   </ListgroupItem>
	 * </Listgroup>
	 * ```
	 *
	 * @example With active state
	 * ```svelte
	 * <Listgroup>
	 *   <ListgroupItem class="bg-primary-50 text-primary-700">Active Item</ListgroupItem>
	 *   <ListgroupItem>Other Item</ListgroupItem>
	 * </Listgroup>
	 * ```
	 *
	 * @example With badges
	 * ```svelte
	 * <Listgroup>
	 *   <ListgroupItem>
	 *     Notifications
	 *     <Badge variant="secondary">3</Badge>
	 *   </ListgroupItem>
	 * </Listgroup>
	 * ```
	 *
	 * @param {boolean} active - Reserved for future active state management. Default: false
	 * @param {Snippet} children - ListgroupItem components
	 * @param {string} class - Additional CSS classes to apply
	 *
	 * @see {@link ListgroupItem} - Individual list item component
	 *
	 * @accessibility
	 * - Semantic list structure
	 * - Keyboard navigable items with onclick
	 * - High contrast colors
	 * - Proper border and border-radius for grouped items
	 */
	interface Props {
		active?: boolean;
		children?: Snippet;
		class?: string;
	}

	let { active = false, children, class: className, ...restProps }: Props = $props();

	const baseStyles =
		'w-full text-sm font-medium text-fg-default bg-surface border border-border-default rounded-lg';
</script>

<div class={cn(baseStyles, className)} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</div>
