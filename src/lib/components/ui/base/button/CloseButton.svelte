<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { X } from '@lucide/svelte';
	import { LucideIconSize } from '../enums';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	/**
	 * Pre-styled close button (X icon) for modals, panels, and alerts.
	 * Commonly used in Modal, Alert, and Drawer components.
	 *
	 * @example Basic usage
	 * ```svelte
	 * <CloseButton onclick={handleClose} />
	 * ```
	 *
	 * @example In modal header
	 * ```svelte
	 * <Modal bind:open={isOpen} title="Settings">
	 *   <!-- Modal content -->
	 * </Modal>
	 * ```
	 *
	 * @example With custom class
	 * ```svelte
	 * <CloseButton class="absolute top-2 right-2" onclick={handleClose} />
	 * ```
	 *
	 * @param {string} class - Additional CSS classes to apply
	 *
	 * @see {@link Modal} - Modal uses close button
	 * @see {@link Alert} - Alert can use close button with dismissible prop
	 * @see {@link Drawer} - Drawer can use close button
	 *
	 * @accessibility
	 * - aria-label="Close" for screen readers
	 * - type="button" to prevent form submission
	 * - Hover state provides visual feedback
	 * - Proper focus indicator
	 */
	interface Props extends HTMLButtonAttributes {
		class?: string;
	}

	let { class: className, ...restProps }: Props = $props();

	const baseStyles =
		'inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white';
</script>

<button type="button" class={cn(baseStyles, className)} {...restProps} aria-label="Close">
	<X size={LucideIconSize.LG} />
</button>
