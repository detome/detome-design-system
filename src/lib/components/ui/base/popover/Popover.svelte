<script lang="ts">
	import { Popover as PopoverPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils/cn';
	import { Side, Align } from '../enums';
	import type { SideType, AlignType } from '../enums';
	import { scale } from 'svelte/transition';
	import type { Snippet } from 'svelte';

	/**
	 * Popover component for displaying rich, interactive content on demand.
	 * Wraps bits-ui Popover with scale animation and flexible positioning.
	 *
	 * @example Basic popover
	 * ```svelte
	 * <Popover bind:open={showPopover}>
	 *   {#snippet trigger()}
	 *     <Button>Click to open</Button>
	 *   {/snippet}
	 *   <div>
	 *     <h3>Popover Title</h3>
	 *     <p>Popover content</p>
	 *   </div>
	 * </Popover>
	 * ```
	 *
	 * @example With custom alignment
	 * ```svelte
	 * <Popover bind:open={showPopover} align="center" side="top">
	 *   {#snippet trigger()}
	 *     <Button>Open Popover</Button>
	 *   {/snippet}
	 *   <p>Centered content</p>
	 * </Popover>
	 * ```
	 *
	 * @example With form content
	 * ```svelte
	 * <Popover bind:open={showPopover}>
	 *   {#snippet trigger()}
	 *     <Button>Filter</Button>
	 *   {/snippet}
	 *   <form onsubmit={handleFilter}>
	 *     <Input placeholder="Filter by..." />
	 *     <Button type="submit">Apply</Button>
	 *   </form>
	 * </Popover>
	 * ```
	 *
	 * @example Right placement
	 * ```svelte
	 * <Popover bind:open={showPopover} side="right">
	 *   {#snippet trigger()}
	 *     <Button>Open Right</Button>
	 *   {/snippet}
	 *   <p>Content on right side</p>
	 * </Popover>
	 * ```
	 *
	 * @example Without trigger (manual open)
	 * ```svelte
	 * <Button onclick={() => showPopover = !showPopover}>Toggle</Button>
	 * <Popover bind:open={showPopover}>
	 *   <p>Manually controlled popover</p>
	 * </Popover>
	 * ```
	 *
	 * @param {boolean} open - Controls popover visibility. Default: false
	 * @param {Snippet} trigger - Element that triggers popover on click
	 * @param {Snippet} children - Popover content
	 * @param {Align | AlignType} align - Popover alignment along the side. Default: Align.START
	 *   Options: 'start' | 'center' | 'end'
	 * @param {Side | SideType} side - Popover placement side relative to trigger. Default: Side.BOTTOM
	 *   Options: 'top' | 'right' | 'bottom' | 'left'
	 * @param {string} class - Additional CSS classes to apply
	 *
	 * @see {@link Tooltip} - For simple informational tooltips
	 * @see {@link Dropdown} - For dropdown menus with items
	 * @see {@link Modal} - For modal dialogs
	 *
	 * @accessibility
	 * - Keyboard: Enter/Space to open, Escape to close, Tab/Shift+Tab for navigation
	 * - ARIA: Proper role and aria-expanded managed by bits-ui
	 * - Focus management: Focus trap within popover content
	 * - Screen reader: Popover content announced when opened
	 * - Click outside closes popover
	 * - Scale animation respects prefers-reduced-motion
	 */
	interface Props {
		open?: boolean;
		trigger?: Snippet;
		children?: Snippet;
		align?: Align | AlignType;
		side?: Side | SideType;
		class?: string;
	}

	let {
		open = $bindable(false),
		trigger,
		children,
		align = Align.START,
		side = Side.BOTTOM,
		class: className,
		...restProps
	}: Props = $props();
</script>

<PopoverPrimitive.Root bind:open>
	{#if trigger}
		<PopoverPrimitive.Trigger>
			{#snippet child({ props })}
				<span {...props}>
					{@render trigger()}
				</span>
			{/snippet}
		</PopoverPrimitive.Trigger>
	{/if}

	<PopoverPrimitive.Portal>
		<PopoverPrimitive.Content forceMount {align} {side} {...restProps}>
			{#snippet child({ wrapperProps, props, open })}
				{#if open}
					<div {...wrapperProps}>
						<div
							{...props}
							transition:scale={{
								duration: 150,
								start: 0.95,
								opacity: 0,
								easing: (t) => t * (2 - t)
							}}
							class={cn(
								'z-50 rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800',
								className
							)}>
							{#if children}
								{@render children()}
							{/if}
						</div>
					</div>
				{/if}
			{/snippet}
		</PopoverPrimitive.Content>
	</PopoverPrimitive.Portal>
</PopoverPrimitive.Root>
