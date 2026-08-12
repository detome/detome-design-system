<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	/**
	 * Grouping component for organizing sidebar items.
	 * Can be styled as rounded container or simple spacing group.
	 *
	 * @example Basic grouping
	 * ```svelte
	 * <SidebarGroup>
	 *   <SidebarItem label="Home" href="/" />
	 *   <SidebarItem label="Dashboard" href="/dashboard" />
	 * </SidebarGroup>
	 * ```
	 *
	 * @example With rounded background
	 * ```svelte
	 * <SidebarGroup rounded>
	 *   <SidebarItem label="Settings" href="/settings" />
	 *   <SidebarItem label="Profile" href="/profile" />
	 * </SidebarGroup>
	 * ```
	 *
	 * @example Multiple groups in sidebar
	 * ```svelte
	 * <SidebarWrapper>
	 *   <SidebarGroup>
	 *     <SidebarItem label="Overview" href="/overview" />
	 *   </SidebarGroup>
	 *   <SidebarGroup rounded>
	 *     <SidebarItem label="Account" href="/account" />
	 *   </SidebarGroup>
	 * </SidebarWrapper>
	 * ```
	 *
	 * @example With custom styling
	 * ```svelte
	 * <SidebarGroup class="space-y-4">
	 *   <SidebarItem label="Item 1" href="/item1" />
	 *   <SidebarItem label="Item 2" href="/item2" />
	 * </SidebarGroup>
	 * ```
	 *
	 * @param {Snippet} children - Sidebar items to group (SidebarItem, SidebarDropdown)
	 * @param {string} class - Additional CSS classes to apply
	 * @param {boolean} rounded - If true, wraps items in rounded container. Default: false
	 *
	 * @see {@link SidebarWrapper} - Main sidebar container
	 * @see {@link SidebarItem} - Individual sidebar navigation item
	 * @see {@link SidebarDropdown} - Collapsible sidebar section
	 *
	 * @accessibility
	 * - Logical grouping of navigation items for screen readers
	 * - Consistent spacing and visual hierarchy
	 */
	interface Props {
		children?: Snippet;
		class?: string;
		rounded?: boolean;
	}

	let { children, class: className, rounded = false, ...restProps }: Props = $props();

	const baseStyles = 'space-y-2';
	const roundedStyles = $derived(rounded ? 'bg-surface-raised rounded-xl p-4' : '');
</script>

<div class={cn(baseStyles, roundedStyles, className)} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</div>
