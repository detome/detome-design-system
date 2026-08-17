<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { setContext } from 'svelte';
	import type { Snippet } from 'svelte';

	/**
	 * Main sidebar navigation component.
	 * Provides active URL context for child items.
	 *
	 * @example Basic usage
	 * ```svelte
	 * <Sidebar>
	 *   <SidebarGroup title="Main Menu">
	 *     <SidebarItem href="/dashboard">
	 *       {#snippet icon()}
	 *         <Home class="h-5 w-5" />
	 *       {/snippet}
	 *       Dashboard
	 *     </SidebarItem>
	 *     <SidebarItem href="/settings">
	 *       {#snippet icon()}
	 *         <Settings class="h-5 w-5" />
	 *       {/snippet}
	 *       Settings
	 *     </SidebarItem>
	 *   </SidebarGroup>
	 * </Sidebar>
	 * ```
	 *
	 * @example With active URL
	 * ```svelte
	 * <Sidebar activeUrl="/dashboard">
	 *   <SidebarGroup title="Menu">
	 *     <SidebarItem href="/dashboard">Dashboard</SidebarItem>
	 *     <SidebarItem href="/reports">Reports</SidebarItem>
	 *   </SidebarGroup>
	 * </Sidebar>
	 * ```
	 *
	 * @example With custom class
	 * ```svelte
	 * <Sidebar class="sidebar-custom">
	 *   <SidebarGroup>
	 *     <SidebarItem href="/home">Home</SidebarItem>
	 *   </SidebarGroup>
	 * </Sidebar>
	 * ```
	 *
	 * @param {string} activeUrl - URL of currently active page (passed to children via context)
	 * @param {Snippet} children - SidebarGroup, SidebarItem, SidebarDropdown components
	 * @param {string} class - Additional CSS classes to apply
	 *
	 * @see {@link SidebarWrapper} - Wrapper component
	 * @see {@link SidebarGroup} - Group container
	 * @see {@link SidebarItem} - Individual navigation items
	 * @see {@link SidebarDropdown} - Dropdown menu within sidebar
	 *
	 * @accessibility
	 * - Semantic <aside> element
	 * - Provides active URL context to children
	 * - Keyboard navigable items
	 * - Responsive behavior (collapsible on mobile)
	 */
	interface Props {
		activeUrl?: string;
		children?: Snippet;
		class?: string;
	}

	let { activeUrl = '', children, class: className, ...restProps }: Props = $props();

	// Provide activeUrl to child components via context
	setContext('sidebar-active-url', { activeUrl: () => activeUrl });

	const baseStyles =
		'sidebar-width sidebar-transition fixed inset-y-0 left-0 z-30 h-full flex-none border-e border-border-default lg:block lg:h-auto lg:overflow-y-visible lg:pt-16';
</script>

<aside class={cn(baseStyles, className)} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</aside>
