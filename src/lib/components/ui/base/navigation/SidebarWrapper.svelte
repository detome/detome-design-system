<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	/**
	 * Main sidebar container component with sticky positioning and scroll support.
	 * Wraps sidebar content groups and items.
	 *
	 * @example Basic sidebar
	 * ```svelte
	 * <SidebarWrapper>
	 *   <SidebarGroup>
	 *     <SidebarItem label="Dashboard" href="/dashboard" />
	 *   </SidebarGroup>
	 * </SidebarWrapper>
	 * ```
	 *
	 * @example Multiple groups
	 * ```svelte
	 * <SidebarWrapper>
	 *   <SidebarGroup>
	 *     <SidebarItem label="Overview" href="/overview" />
	 *   </SidebarGroup>
	 *   <SidebarGroup rounded>
	 *     <SidebarItem label="Settings" href="/settings" />
	 *   </SidebarGroup>
	 * </SidebarWrapper>
	 * ```
	 *
	 * @example With custom styling
	 * ```svelte
	 * <SidebarWrapper class="bg-gray-100">
	 *   <SidebarItem label="Custom" href="/custom" />
	 * </SidebarWrapper>
	 * ```
	 *
	 * @example With nested dropdowns
	 * ```svelte
	 * <SidebarWrapper>
	 *   <SidebarDropdown label="Products" defaultOpen={true}>
	 *     <SidebarItem label="All Products" href="/products" />
	 *   </SidebarDropdown>
	 * </SidebarWrapper>
	 * ```
	 *
	 * @param {Snippet} children - Sidebar content (SidebarGroup, SidebarItem, SidebarDropdown)
	 * @param {string} class - Additional CSS classes to apply
	 *
	 * @see {@link SidebarGroup} - Group sidebar items
	 * @see {@link SidebarItem} - Individual sidebar navigation item
	 * @see {@link SidebarDropdown} - Collapsible sidebar section
	 *
	 * @accessibility
	 * - Scrollable container with proper keyboard navigation
	 * - Sticky positioning for persistent navigation
	 * - Supports high contrast mode
	 */
	interface Props {
		children?: Snippet;
		class?: string;
	}

	let { children, class: className, ...restProps }: Props = $props();

	const baseStyles =
		'top-2 h-full w-full overflow-y-auto bg-white lg:sticky lg:me-0 lg:block lg:h-[calc(100dvh-4rem)] dark:bg-gray-800';
</script>

<div class={cn(baseStyles, className)} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</div>
