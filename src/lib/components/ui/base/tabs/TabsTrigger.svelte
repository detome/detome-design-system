<script lang="ts">
	import { Tabs as BitsTabs } from 'bits-ui';
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	/**
	 * Individual tab trigger button with active state indicator.
	 * Wraps bits-ui.Tabs.Trigger.
	 *
	 * @example Basic usage
	 * ```svelte
	 * <TabsTrigger value="overview">Overview</TabsTrigger>
	 * <TabsTrigger value="settings">Settings</TabsTrigger>
	 * <TabsTrigger value="reports">Reports</TabsTrigger>
	 * ```
	 *
	 * @example With icon
	 * ```svelte
	 * <TabsTrigger value="home">
	 *   {#snippet children()}
	 *     <Home class="h-4 w-4 mr-2" />
	 *     Home
	 *   {/snippet}
	 * </TabsTrigger>
	 * ```
	 *
	 * @example Disabled
	 * ```svelte
	 * <TabsTrigger value="disabled" disabled>Disabled Tab</TabsTrigger>
	 * ```
	 *
	 * @param {string} value - Tab identifier (must match TabsContent value)
	 * @param {boolean} disabled - Disables tab interaction. Default: false
	 * @param {Snippet} children - Tab label text and/or icons
	 * @param {string} class - Additional CSS classes to apply
	 *
	 * @see {@link Tabs} - Parent component
	 * @see {@link TabsContent} - Content panel for this tab
	 *
	 * @accessibility
	 * - Keyboard navigable with arrow keys
	 * - Space or Enter to activate
	 * - Active state visually indicated (underline)
	 * - ARIA tab role
	 * - Focus indicator when keyboard focused
	 */
	interface Props {
		value: string;
		disabled?: boolean;
		children?: Snippet;
		class?: string;
	}

	let { value, disabled = false, children, class: className, ...restProps }: Props = $props();

	const baseStyles =
		'relative inline-flex items-center justify-center whitespace-nowrap rounded-md px-8 py-3.5 text-sm font-medium tracking-wide ring-offset-surface transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=inactive]:text-fg-muted data-[state=inactive]:hover:text-fg-default data-[state=inactive]:hover:bg-surface/60 data-[state=active]:bg-surface data-[state=active]:text-fg-default data-[state=active]:shadow-sm after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:rounded-t-md after:transition-all after:duration-200 after:ease-out data-[state=inactive]:after:bg-transparent data-[state=inactive]:hover:after:bg-primary-200 data-[state=active]:after:bg-[linear-gradient(90deg,var(--color-primary-500),var(--color-accent-500))] first:after:rounded-tl-lg last:after:rounded-tr-lg dark:ring-offset-surface-raised dark:data-[state=inactive]:hover:after:bg-primary-700 dark:data-[state=active]:after:bg-[linear-gradient(90deg,var(--color-primary-400),var(--color-accent-400))]';
</script>

<BitsTabs.Trigger {value} {disabled} class={cn(baseStyles, className)} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</BitsTabs.Trigger>
