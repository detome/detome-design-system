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
		'relative -mb-px inline-flex items-center justify-center whitespace-nowrap px-5 pt-2 pb-2.5 text-sm font-medium tracking-wide transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:pointer-events-none disabled:opacity-50 data-[state=inactive]:text-fg-muted data-[state=inactive]:hover:text-fg-default data-[state=active]:text-fg-default dark:focus-visible:ring-offset-surface-raised';
</script>

<BitsTabs.Trigger {value} {disabled} class={cn(baseStyles, className)} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</BitsTabs.Trigger>

<style>
	/* Separator between tabs: an absolutely-positioned 1px bar at each
	   trigger's right edge, so it lands exactly on the boundary between two
	   adjacent tabs — equidistant from the label on either side (px-5 padding
	   both ways). Absolute positioning keeps it out of the flex flow, so it
	   never displaces the centered label (a flex-child ::before did). Hidden on
	   the last tab so there's no trailing divider. The list carries no gap, so
	   the boundary is centered between the two labels. bits-ui sets
	   data-tabs-trigger at runtime, so this selector is intentionally global. */
	:global([data-tabs-trigger]:not(:last-child))::before {
		content: '';
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		height: 1rem;
		width: 1px;
		background: var(--color-fg-faint);
	}

	/* Active underline: an absolutely-positioned bar pinned to the trigger's
	   bottom edge at left:0 / right:0, so it spans the full border-box width —
	   flush on both the left and right edges. It sits above the baseline rule
	   via the trigger's -mb-px. bits-ui sets data-state at runtime, so these
	   selectors are intentionally global. */
	:global([data-tabs-trigger][data-state='active'])::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 2px;
		background: linear-gradient(90deg, var(--color-primary-500), var(--color-accent-500));
	}

	:global(.dark [data-tabs-trigger][data-state='active'])::after {
		background: linear-gradient(90deg, var(--color-primary-400), var(--color-accent-400));
	}
</style>
