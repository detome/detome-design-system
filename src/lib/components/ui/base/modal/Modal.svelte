<script lang="ts">
	import { Dialog } from 'bits-ui';
	import { cn } from '$lib/utils/cn';
	import { fade, scale } from 'svelte/transition';
	import { X } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import { ModalSize } from '../enums';
	import type { ModalSizeType } from '../enums';

	/**
	 * Modal component props
	 * @interface Props
	 */
	interface Props {
		/** Whether the modal is open */
		open?: boolean;
		/** Modal size (sm, md, lg, xl, full) */
		size?: ModalSize | ModalSizeType;
		/** Whether the modal can be dismissed */
		dismissible?: boolean;
		/** Modal title */
		title?: string;
		/** Modal description */
		description?: string;
		/** Main content snippet */
		children?: Snippet;
		/** Footer content snippet */
		footer?: Snippet;
		/** Header content snippet */
		header?: Snippet;
		/** Callback when modal closes */
		onClose?: () => void;
		/** Form submit handler */
		onsubmit?: (event: SubmitEvent) => void;
		/** Whether to render as a form */
		form?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Whether clicking outside closes the modal */
		outsideclose?: boolean;
	}

	let {
		open = $bindable(false),
		size = ModalSize.MD,
		dismissible = true,
		title,
		description,
		children,
		footer,
		header,
		onClose,
		onsubmit,
		form = false,
		class: classValue,
		outsideclose = true,
		...restProps
	}: Props = $props();

	// https://tailwindcss.com/docs/max-width
	const sizes: Record<string, string> = {
		[ModalSize.SM]: 'max-w-sm', // 384px
		[ModalSize.MD]: 'max-w-md', // 448px
		[ModalSize.LG]: 'max-w-3xl', // 768px
		[ModalSize.XL]: 'max-w-7xl', // 1280px - extra wide for complex UIs
		[ModalSize.FULL]: 'max-w-full mx-4'
	};

	/**
	 * Handles modal open state changes
	 * Triggers onClose callback when modal is closed
	 * @param newOpen - New open state
	 */
	function handleOpenChange(newOpen: boolean) {
		if (!newOpen && onClose) {
			onClose();
		}
	}
</script>

<Dialog.Root bind:open onOpenChange={handleOpenChange}>
	<Dialog.Portal>
		<!-- Overlay -->
		<Dialog.Overlay forceMount>
			{#snippet child({ props, open })}
				{#if open}
					<div
						{...props}
						class="fixed inset-0 z-50 h-full w-full bg-black/50 backdrop-blur-sm"
						transition:fade={{ duration: 200, easing: (t) => t * (2 - t) }}>
					</div>
				{/if}
			{/snippet}
		</Dialog.Overlay>

		<!--
			Content: a full-screen flex wrapper that centres the panel
			*without* a CSS transform. A transform here would make it the containing
			block for any `position: fixed` descendant (e.g. a filterable user
			picker's dropdown), so those popovers would be offset by the modal's box
			instead of the viewport. `pointer-events-none` lets clicks in the padding
			fall through to the overlay so outside-click-to-close still works, while
			the panel itself re-enables pointer events.
		-->
		<Dialog.Content
			forceMount
			onInteractOutside={(e) => {
				if (!outsideclose) {
					e.preventDefault();
				}
			}}
			onEscapeKeydown={(e) => {
				if (!dismissible) {
					e.preventDefault();
				}
			}}
			class="pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
			{...restProps}>
			{#snippet child({ props, open })}
				{#if open}
					<div {...props}>
						<div
							class={cn(
								'pointer-events-auto w-full rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800',
								sizes[size] as string,
								classValue
							)}
							transition:scale={{
								duration: 250,
								start: 0.95,
								opacity: 0,
								easing: (t) => t * (2 - t)
							}}>
							{#if title || header || dismissible}
								<div class="mb-4 flex items-start justify-between">
									{#if header}
										{@render header()}
									{:else if title}
										<Dialog.Title class="text-xl font-semibold text-gray-900 dark:text-gray-50">
											{title}
										</Dialog.Title>
									{/if}

									{#if dismissible}
										<Dialog.Close
											class="rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300">
											<X class="h-5 w-5" />
											<span class="sr-only">Close</span>
										</Dialog.Close>
									{/if}
								</div>
							{/if}

							{#if description}
								<Dialog.Description class="mb-4 text-sm text-gray-600 dark:text-gray-400">
									{description}
								</Dialog.Description>
							{/if}

							{#if children}
								<div class="modal-body">
									{@render children()}
								</div>
							{/if}

							{#if footer}
								<div
									class="modal-footer mt-6 flex items-center justify-end gap-3 border-t border-gray-200 pt-4 dark:border-gray-700">
									{@render footer()}
								</div>
							{/if}
						</div>
					</div>
				{/if}
			{/snippet}
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
