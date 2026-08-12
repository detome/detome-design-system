<script lang="ts">
	import { Collapsible } from 'bits-ui';
	import { cn } from '$lib/utils/cn';
	import { slide } from 'svelte/transition';
	import { ChevronDown } from '@lucide/svelte';
	import type { Snippet } from 'svelte';

	/**
	 * Collapsible sidebar section with animated expand/collapse.
	 * Wraps bits-ui Collapsible with smooth slide transition.
	 *
	 * @example Basic dropdown
	 * ```svelte
	 * <SidebarDropdown label="Products">
	 *   <SidebarItem label="All Products" href="/products" />
	 *   <SidebarItem label="Featured" href="/products/featured" />
	 * </SidebarDropdown>
	 * ```
	 *
	 * @example With icon
	 * ```svelte
	 * <SidebarDropdown label="Settings">
	 *   {#snippet icon()}
	 *     <Settings class="h-5 w-5" />
	 *   {/snippet}
	 *   <SidebarItem label="Profile" href="/settings/profile" />
	 *   <SidebarItem label="Security" href="/settings/security" />
	 * </SidebarDropdown>
	 * ```
	 *
	 * @example Default collapsed
	 * ```svelte
	 * <SidebarDropdown label="Advanced" defaultOpen={false}>
	 *   <SidebarItem label="Analytics" href="/advanced/analytics" />
	 *   <SidebarItem label="Reports" href="/advanced/reports" />
	 * </SidebarDropdown>
	 * ```
	 *
	 * @example With nested dropdowns
	 * ```svelte
	 * <SidebarDropdown label="Main Section">
	 *   <SidebarDropdown label="Sub Section">
	 *     <SidebarItem label="Deep Link" href="/deep" />
	 *   </SidebarDropdown>
	 * </SidebarDropdown>
	 * ```
	 *
	 * @param {string} label - Text label for the dropdown trigger
	 * @param {Snippet} icon - Leading icon slot for trigger
	 * @param {Snippet} children - Nested sidebar items (SidebarItem, SidebarDropdown)
	 * @param {boolean} defaultOpen - Initial open state. Default: true
	 * @param {string} class - Additional CSS classes to apply
	 *
	 * @see {@link SidebarWrapper} - Main sidebar container
	 * @see {@link SidebarGroup} - Group sidebar items
	 * @see {@link SidebarItem} - Individual sidebar navigation item
	 *
	 * @accessibility
	 * - Keyboard: Enter or Space to toggle, Escape to close
	 * - ARIA: Proper aria-expanded state managed by bits-ui
	 * - Smooth transition respects prefers-reduced-motion
	 * - Screen reader announces expanded/collapsed state
	 */
	interface Props {
		label: string;
		icon?: Snippet;
		children?: Snippet;
		defaultOpen?: boolean;
		class?: string;
		[key: string]: unknown; // Allow any additional props
	}

	let {
		label,
		icon,
		children,
		defaultOpen = true,
		class: className,
		...restProps
	}: Props = $props();

	// Initialize open state - defaultOpen provides the initial value
	let isOpen = $state(defaultOpen === undefined ? true : defaultOpen);

	const triggerStyles =
		'flex items-center w-full px-3 py-2.5 text-base font-medium transition-all duration-200 rounded-lg group text-fg-default hover:bg-surface-overlay hover:scale-[1.01] hover:shadow-md';
	const iconClass =
		'shrink-0 w-7 h-7 text-fg-muted transition-colors duration-200 group-hover:text-fg-default';
</script>

<Collapsible.Root bind:open={isOpen} class={cn('space-y-2', className)} {...restProps}>
	<Collapsible.Trigger class={triggerStyles}>
		{#if icon}
			<span class="transition-colors duration-200">
				{@render icon()}
			</span>
		{/if}
		<span class="ms-3 flex-1 text-left whitespace-nowrap">{label}</span>
		<ChevronDown
			class={cn(
				'h-5 w-5 transition-transform duration-300 ease-out',
				isOpen ? 'rotate-180 transform' : ''
			)} />
	</Collapsible.Trigger>

	<Collapsible.Content forceMount>
		{#snippet child({ props, open })}
			{#if open}
				<div
					{...props}
					transition:slide={{ duration: 250 }}
					class="sidebar-dropdown-content space-y-2">
					{#if children}
						{@render children()}
					{/if}
				</div>
			{/if}
		{/snippet}
	</Collapsible.Content>
</Collapsible.Root>
