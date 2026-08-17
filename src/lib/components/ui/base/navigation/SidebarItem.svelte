<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	/**
	 * Individual sidebar navigation item with active state detection.
	 * Supports icons, nested items, and automatic active state via context.
	 *
	 * @example Basic item
	 * ```svelte
	 * <SidebarItem label="Dashboard" href="/dashboard" />
	 * ```
	 *
	 * @example With icon
	 * ```svelte
	 * <SidebarItem label="Home" href="/">
	 *   {#snippet icon()}
	 *     <Home class="h-5 w-5" />
	 *   {/snippet}
	 * </SidebarItem>
	 * ```
	 *
	 * @example Nested item
	 * ```svelte
	 * <SidebarItem label="Sub Item" href="/nested" nested />
	 * ```
	 *
	 * @example With custom content
	 * ```svelte
	 * <SidebarItem label="Settings" href="/settings">
	 *   {#snippet children()}
	 *     <span class="ml-auto text-xs">New</span>
	 *   {/snippet}
	 * </SidebarItem>
	 * ```
	 *
	 * @example With custom styling
	 * ```svelte
	 * <SidebarItem label="Custom" href="/custom" class="font-bold" />
	 * ```
	 *
	 * @param {string} label - Text label for the navigation item
	 * @param {string} href - URL path for the navigation link
	 * @param {Snippet} icon - Leading icon slot
	 * @param {Snippet} children - Additional content to display after label
	 * @param {string} class - Additional CSS classes to apply
	 * @param {boolean} nested - If true, adds indentation for nested items. Default: false
	 *
	 * @see {@link SidebarWrapper} - Main sidebar container
	 * @see {@link SidebarGroup} - Group sidebar items
	 * @see {@link SidebarDropdown} - Collapsible sidebar section
	 *
	 * @accessibility
	 * - Semantic link element with proper role and href
	 * - Active state clearly indicated visually and semantically
	 * - Keyboard navigable with Tab and Enter
	 * - High contrast ratios for text
	 * - Screen reader announces label and active state
	 */
	interface Props extends HTMLAnchorAttributes {
		label: string;
		href: string;
		icon?: Snippet;
		children?: Snippet;
		class?: string;
		nested?: boolean;
	}

	let {
		label,
		href,
		icon,
		children,
		class: className,
		nested = false,
		...restProps
	}: Props = $props();

	// Get activeUrl from parent Sidebar context
	const context = getContext<{ activeUrl: () => string } | undefined>('sidebar-active-url');
	const activeUrl = $derived(context?.activeUrl() ?? '');
	const isActive = $derived(activeUrl === href);

	const baseStyles =
		'flex items-center px-3 py-2.5 text-base font-medium transition-all duration-200 rounded-lg group text-fg-default relative';
	const normalStyles = 'hover:bg-surface-overlay hover:scale-[1.01] hover:shadow-md';
	const activeStyles =
		'font-semibold text-primary-900 bg-primary-200 dark:bg-primary-700 dark:text-white hover:bg-primary-100 dark:hover:bg-surface-overlay shadow-sm';
	const nestedStyles = $derived(nested ? 'ml-2 pl-8 sidebar-item-nested relative z-10' : '');
</script>

<a
	{href}
	class={cn(baseStyles, isActive ? activeStyles : normalStyles, nestedStyles, className)}
	aria-current={isActive ? 'page' : undefined}
	{...restProps}>
	{#if icon}
		<span class="transition-colors duration-200">
			{@render icon()}
		</span>
	{/if}
	<span class="ms-3 flex-1">{label}</span>
	{#if children}
		{@render children()}
	{/if}
</a>
