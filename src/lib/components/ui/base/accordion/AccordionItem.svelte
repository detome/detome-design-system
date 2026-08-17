<script lang="ts">
	import { Accordion as BitsAccordion } from 'bits-ui';
	import { cn } from '$lib/utils/cn';
	import { ChevronDown } from '@lucide/svelte';
	import { LucideIconSize } from '../enums';
	import { slide } from 'svelte/transition';
	import type { Snippet } from 'svelte';

	/**
	 * Individual accordion panel with header and content.
	 * Content collapses/expands with smooth slide animation.
	 *
	 * @example Basic usage
	 * ```svelte
	 * <AccordionItem value="item1" title="First Item">
	 *   <p>This is the content for the first accordion item.</p>
	 * </AccordionItem>
	 * ```
	 *
	 * @example Custom header
	 * ```svelte
	 * <AccordionItem value="item2">
	 *   {#snippet header()}
	 *     <div class="flex items-center gap-2">
	 *       <Icon class="h-4 w-4" />
	 *       <span>Custom Header</span>
	 *     </div>
	 *   {/snippet}
	 *   <p>Content here</p>
	 * </AccordionItem>
	 * ```
	 *
	 * @example Disabled
	 * ```svelte
	 * <AccordionItem value="item3" title="Disabled" disabled>
	 *   <p>This item cannot be expanded</p>
	 * </AccordionItem>
	 * ```
	 *
	 * @example Rich content
	 * ```svelte
	 * <AccordionItem value="faq1" title="What is this?">
	 *   <p>Detailed explanation goes here with multiple paragraphs, lists, and other content.</p>
	 *   <ul>
	 *     <li>Point one</li>
	 *     <li>Point two</li>
	 *   </ul>
	 * </AccordionItem>
	 * ```
	 *
	 * @param {string} value - Unique identifier for this panel (required)
	 * @param {boolean} disabled - Disables panel expansion. Default: false
	 * @param {string} title - Header text displayed in clickable area
	 * @param {Snippet} header - Custom header snippet (alternative to title)
	 * @param {Snippet} children - Collapsible content to display
	 * @param {string} class - Additional CSS classes to apply
	 *
	 * @see {@link Accordion} - Parent accordion container
	 *
	 * @accessibility
	 * - Keyboard toggle (Space, Enter)
	 * - ARIA expanded attribute
	 * - Chevron icon rotates on expand
	 * - Smooth slide animation
	 * - Screen reader announces state changes
	 */
	interface Props {
		value: string; // REQUIRED - explicit values needed for controlled state
		disabled?: boolean;
		title?: string;
		children?: Snippet;
		header?: Snippet;
		class?: string;
	}

	let {
		value,
		disabled = false,
		title,
		children,
		header,
		class: className,
		...restProps
	}: Props = $props();
</script>

<BitsAccordion.Item
	{value}
	{disabled}
	class={cn('border-b border-gray-200 dark:border-gray-700', className)}
	{...restProps}>
	<BitsAccordion.Header>
		<BitsAccordion.Trigger
			class="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180">
			{#if header}
				{@render header()}
			{:else}
				{title}
			{/if}
			<ChevronDown size={LucideIconSize.MD} class="shrink-0 transition-transform duration-200" />
		</BitsAccordion.Trigger>
	</BitsAccordion.Header>

	<BitsAccordion.Content forceMount class="overflow-hidden text-sm">
		{#snippet child({ props, open })}
			{#if open}
				<div
					{...props}
					transition:slide={{
						duration: 250,
						easing: (t) => t * (2 - t)
					}}
					class="pt-0 pb-4">
					{#if children}
						{@render children()}
					{/if}
				</div>
			{/if}
		{/snippet}
	</BitsAccordion.Content>
</BitsAccordion.Item>
