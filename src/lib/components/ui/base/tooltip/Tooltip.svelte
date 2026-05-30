<script lang="ts">
	import { Tooltip as BitsTooltip } from 'bits-ui';
	import { cn } from '$lib/utils/cn';
	import { Side, Align } from '../enums';
	import type { SideType, AlignType } from '../enums';
	import { scale } from 'svelte/transition';
	import type { Snippet } from 'svelte';

	/**
	 * Tooltip component for displaying contextual information on hover/focus.
	 * Wraps bits-ui Tooltip with scale animation and arrow indicator.
	 *
	 * @example Basic tooltip
	 * ```svelte
	 * <Tooltip content="This is a tooltip">
	 *   <Button>Hover me</Button>
	 * </Tooltip>
	 * ```
	 *
	 * @example With custom placement
	 * ```svelte
	 * <Tooltip content="Tooltip on right" side="right">
	 *   <Button>Hover me</Button>
	 * </Tooltip>
	 * ```
	 *
	 * @example With custom alignment
	 * ```svelte
	 * <Tooltip content="Start aligned" side="bottom" align="start">
	 *   <Button>Hover me</Button>
	 * </Tooltip>
	 * ```
	 *
	 * @example With custom content
	 * ```svelte
	 * <Tooltip>
	 *   {#snippet content()}
	 *     <div>
	 *       <p class="font-bold">Custom Tooltip</p>
	 *       <p class="text-sm">Rich content</p>
	 *     </div>
	 *   {/snippet}
	 *   <Button>Hover me</Button>
	 * </Tooltip>
	 * ```
	 *
	 * @example With no delay
	 * ```svelte
	 * <Tooltip content="Instant tooltip" delayDuration={0}>
	 *   <Button>Hover me</Button>
	 * </Tooltip>
	 * ```
	 *
	 * @example With hoverable content
	 * ```svelte
	 * <Tooltip
	 *   content="Click to dismiss"
	 *   disableHoverableContent={false}
	 * >
	 *   <Button>Hover me</Button>
	 * </Tooltip>
	 * ```
	 *
	 * @param {string | Snippet} content - Tooltip text or custom content snippet
	 * @param {Snippet} children - Trigger element that shows tooltip on hover/focus
	 * @param {Side | SideType} side - Tooltip placement side relative to trigger. Default: Side.TOP
	 *   Options: 'top' | 'right' | 'bottom' | 'left'
	 * @param {Align | AlignType} align - Tooltip alignment along the side. Default: Align.CENTER
	 *   Options: 'start' | 'center' | 'end'
	 * @param {number} delayDuration - Delay in ms before tooltip appears. Default: 200
	 * @param {boolean} disableHoverableContent - If true, tooltip closes when leaving trigger. Default: undefined
	 * @param {string} class - Additional CSS classes to apply
	 *
	 * @see {@link Popover} - For interactive popovers
	 * @see {@link Dropdown} - For dropdown menus
	 *
	 * @accessibility
	 * - Keyboard: Focus/blur shows/hides tooltip
	 * - ARIA: Proper role and aria-describedby managed by bits-ui
	 * - Screen reader: Tooltip content announced on focus
	 * - Scale animation respects prefers-reduced-motion
	 * - High contrast for text readability
	 */
	interface Props {
		/** Tooltip content (string or snippet) */
		content?: string | Snippet;
		/** Trigger element content */
		children: Snippet;
		/** Tooltip placement side */
		side?: Side | SideType;
		/** Tooltip alignment */
		align?: Align | AlignType;
		/** Delay before showing tooltip (ms) */
		delayDuration?: number;
		/** Whether tooltip content is hoverable */
		disableHoverableContent?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Allow additional HTML attributes */
		[key: string]: unknown;
	}

	let {
		content,
		children,
		side = Side.TOP,
		align = Align.CENTER,
		delayDuration = 200,
		disableHoverableContent,
		class: classValue,
		...restProps
	}: Props = $props();

	const hasContent = $derived(content !== undefined);
	const isStringContent = $derived(typeof content === 'string');
</script>

<BitsTooltip.Provider {disableHoverableContent}>
	<BitsTooltip.Root {delayDuration}>
		<BitsTooltip.Trigger>
			{@render children()}
		</BitsTooltip.Trigger>

		<BitsTooltip.Content forceMount {side} {align} {...restProps}>
			{#snippet child({ wrapperProps, props, open })}
				{#if open}
					<div {...wrapperProps}>
						<div
							{...props}
							transition:scale={{
								duration: 100,
								start: 0.95,
								opacity: 0
							}}
							class={cn(
								'z-50 overflow-hidden rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-900 shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50',
								classValue
							)}>
							{#if hasContent}
								{#if isStringContent}
									{content}
								{:else}
									{@render (content as Snippet)()}
								{/if}
							{/if}
							<BitsTooltip.Arrow class="fill-white dark:fill-gray-800" />
						</div>
					</div>
				{/if}
			{/snippet}
		</BitsTooltip.Content>
	</BitsTooltip.Root>
</BitsTooltip.Provider>
