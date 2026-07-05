<script lang="ts">
	import { Tabs as BitsTabs } from 'bits-ui';
	import { cn } from '$lib/utils/cn';
	import { fade, fly } from 'svelte/transition';
	import type { Snippet } from 'svelte';

	/**
	 * Content panel for each tab with smooth transitions.
	 * Wraps bits-ui.Tabs.Content.
	 *
	 * @example Basic usage
	 * ```svelte
	 * <TabsContent value="overview">
	 *   <h3>Overview</h3>
	 *   <p>This is the overview tab content.</p>
	 * </TabsContent>
	 * ```
	 *
	 * @example With custom onclick
	 * ```svelte
	 * <TabsContent value="details" onclick={trackView}>
	 *   <DetailsPanel />
	 * </TabsContent>
	 * ```
	 *
	 * @param {string} value - Tab identifier (must match TabsTrigger value)
	 * @param {Snippet} children - Tab content to display
	 * @param {(event: MouseEvent) => void} onclick - Click handler for content
	 * @param {string} class - Additional CSS classes to apply
	 *
	 * @see {@link Tabs} - Parent component
	 * @see {@link TabsTrigger} - Trigger button for this content
	 *
	 * @accessibility
	 * - Only active tab content is visible to screen readers
	 * - Smooth fade/slide transition
	 * - Focus management when switching tabs
	 * - ARIA role="tabpanel"
	 */
	interface Props {
		value: string;
		children?: Snippet;
		onclick?: (event: MouseEvent) => void;
		class?: string;
	}

	let { value, children, onclick, class: className, ...restProps }: Props = $props();

	const baseStyles =
		'mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:ring-offset-gray-950';
</script>

<BitsTabs.Content {value} class={cn(baseStyles, className)} {onclick} {...restProps}>
	{#snippet child({ props })}
		<div
			{...props}
			transition:fly={{
				duration: 200,
				y: 10,
				opacity: 0,
				easing: (t) => t * (2 - t)
			}}>
			{#if children}
				{@render children()}
			{/if}
		</div>
	{/snippet}
</BitsTabs.Content>
