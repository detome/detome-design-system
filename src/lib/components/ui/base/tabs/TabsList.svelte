<script lang="ts">
	import { Tabs as BitsTabs } from 'bits-ui';
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	/**
	 * Container for tab triggers with visual selection indicator.
	 * Wraps bits-ui.Tabs.List.
	 *
	 * @example Basic usage
	 * ```svelte
	 * <TabsList>
	 *   <TabsTrigger value="tab1">Tab 1</TabsTrigger>
	 *   <TabsTrigger value="tab2">Tab 2</TabsTrigger>
	 *   <TabsTrigger value="tab3">Tab 3</TabsTrigger>
	 * </TabsList>
	 * ```
	 *
	 * @param {Snippet} children - TabsTrigger components
	 * @param {string} class - Additional CSS classes to apply
	 *
	 * @see {@link Tabs} - Parent component
	 * @see {@link TabsTrigger} - Individual tab triggers
	 */
	interface Props {
		children?: Snippet;
		class?: string;
	}

	let { children, class: className, ...restProps }: Props = $props();

	const baseStyles =
		'inline-flex items-end justify-start border-b border-border-default text-fg-muted';
</script>

<BitsTabs.List class={cn(baseStyles, className)} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</BitsTabs.List>
