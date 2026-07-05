<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from 'bits-ui';
	import { StatusVariant, ButtonVariant } from '$lib/components/ui/base/enums';
	import type { StatusVariantType } from '$lib/components/ui/base/enums';
	import { cn } from '$lib/utils/cn';
	import { fade, scale } from 'svelte/transition';
	import Button from '../button/Button.svelte';
	import { statusIcons } from '$lib/utils/status-icons';
	import type { Snippet } from 'svelte';

	/**
	 * Alert dialog for critical confirmations and important messages.
	 * Wraps bits-ui's AlertDialog primitive (role="alertdialog") with pre-configured
	 * confirm/cancel actions and variant icons. Unlike Modal, it cannot be dismissed
	 * by clicking outside — the user must explicitly choose Confirm or Cancel (or
	 * press Escape, which is treated the same as Cancel).
	 *
	 * @example Basic confirmation
	 * ```svelte
	 * <AlertDialog
	 *   bind:open={showDialog}
	 *   title="Delete Account"
	 *   description="This action cannot be undone"
	 *   onConfirm={handleDelete}
	 * />
	 * ```
	 *
	 * @example Error variant
	 * ```svelte
	 * <AlertDialog
	 *   bind:open={showError}
	 *   variant="error"
	 *   title="Error Occurred"
	 *   description="Something went wrong. Please try again."
	 *   confirmText="Retry"
	 *   onConfirm={handleRetry}
	 * />
	 * ```
	 *
	 * @example Success variant with custom content
	 * ```svelte
	 * <AlertDialog
	 *   bind:open={showSuccess}
	 *   variant="success"
	 *   title="Operation Complete"
	 *   onConfirm={() => showSuccess = false}
	 * >
	 *   {#snippet children()}
	 *     <p class="text-sm text-gray-600">
	 *       Your changes have been saved successfully.
	 *     </p>
	 *   {/snippet}
	 * </AlertDialog>
	 * ```
	 *
	 * @example Warning with custom buttons
	 * ```svelte
	 * <AlertDialog
	 *   bind:open={showWarning}
	 *   variant="warning"
	 *   title="Unsaved Changes"
	 *   confirmText="Discard"
	 *   cancelText="Keep Editing"
	 *   onConfirm={handleDiscard}
	 *   onCancel={handleKeep}
	 * />
	 * ```
	 *
	 * @example Info variant
	 * ```svelte
	 * <AlertDialog
	 *   bind:open={showInfo}
	 *   variant="info"
	 *   title="New Feature"
	 *   description="Check out our latest features"
	 *   confirmText="Got it"
	 *   onConfirm={() => showInfo = false}
	 * />
	 * ```
	 *
	 * @param {boolean} open - Controls dialog visibility. Default: false
	 * @param {StatusVariant | StatusVariantType} variant - Visual variant affecting icon and button colors. Default: StatusVariant.INFO
	 *   Options: 'info' | 'warning' | 'error' | 'success'
	 * @param {string} title - Dialog title (required)
	 * @param {string} description - Optional descriptive text below title
	 * @param {string} confirmText - Text for confirm button. Default: 'Confirm'
	 * @param {string} cancelText - Text for cancel button. Default: 'Cancel'
	 * @param {() => void} onConfirm - Callback when confirm button is clicked
	 * @param {() => void} onCancel - Callback when cancel button is clicked or dialog is dismissed via Escape
	 * @param {Snippet} children - Custom content below description
	 * @param {string} class - Additional CSS classes to apply
	 *
	 * @see {@link Modal} - For dismissible dialogs
	 * @see {@link Drawer} - For side-panel navigation
	 *
	 * @accessibility
	 * - Keyboard: Escape triggers Cancel, Tab/Shift+Tab to navigate buttons
	 * - Focus trap: Focus managed by bits-ui's AlertDialog primitive
	 * - ARIA: role="alertdialog", aria-labelledby, aria-describedby managed by bits-ui
	 * - Clicking outside the dialog does not dismiss it — Confirm or Cancel must be chosen
	 * - Screen reader: Icon, title, and description are properly announced
	 * - High contrast colors for all variants
	 */
	interface Props {
		open?: boolean;
		variant?: StatusVariant | StatusVariantType;
		title: string;
		description?: string;
		confirmText?: string;
		cancelText?: string;
		onConfirm?: () => void;
		onCancel?: () => void;
		children?: Snippet;
		class?: string;
	}

	let {
		open = $bindable(false),
		variant = StatusVariant.INFO,
		title,
		description,
		confirmText = 'Confirm',
		cancelText = 'Cancel',
		onConfirm,
		onCancel,
		children,
		class: className
	}: Props = $props();

	const iconColors: Record<StatusVariant, string> = {
		[StatusVariant.INFO]: 'text-info-600',
		[StatusVariant.WARNING]: 'text-warning-600',
		[StatusVariant.ERROR]: 'text-error-600',
		[StatusVariant.SUCCESS]: 'text-success-600'
	};

	const buttonVariants: Record<StatusVariant, ButtonVariant> = {
		[StatusVariant.INFO]: ButtonVariant.PRIMARY,
		[StatusVariant.WARNING]: ButtonVariant.SECONDARY,
		[StatusVariant.ERROR]: ButtonVariant.DANGER,
		[StatusVariant.SUCCESS]: ButtonVariant.SUCCESS
	};

	const Icon = $derived(statusIcons[variant]);

	function handleConfirm() {
		onConfirm?.();
		open = false;
	}

	function handleCancel() {
		onCancel?.();
		open = false;
	}
</script>

<AlertDialogPrimitive.Root bind:open>
	<AlertDialogPrimitive.Portal>
		<AlertDialogPrimitive.Overlay forceMount>
			{#snippet child({ props, open: overlayOpen })}
				{#if overlayOpen}
					<div
						{...props}
						class="fixed inset-0 z-50 h-full w-full bg-black/50 backdrop-blur-sm"
						transition:fade={{ duration: 200, easing: (t) => t * (2 - t) }}>
					</div>
				{/if}
			{/snippet}
		</AlertDialogPrimitive.Overlay>

		<AlertDialogPrimitive.Content
			forceMount
			onEscapeKeydown={(e) => {
				e.preventDefault();
				handleCancel();
			}}
			class={cn(
				'fixed top-1/2 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800',
				className
			)}>
			{#snippet child({ props, open: contentOpen })}
				{#if contentOpen}
					<div
						{...props}
						transition:scale={{
							duration: 250,
							start: 0.95,
							opacity: 0,
							easing: (t) => t * (2 - t)
						}}>
						<div class="text-center">
							<div
								class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
								<Icon class="h-6 w-6 {iconColors[variant]}" />
							</div>

							<AlertDialogPrimitive.Title
								class="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-50">
								{title}
							</AlertDialogPrimitive.Title>

							{#if description}
								<AlertDialogPrimitive.Description
									class="mb-5 text-sm text-gray-600 dark:text-gray-400">
									{description}
								</AlertDialogPrimitive.Description>
							{/if}

							{#if children}
								<div class="mb-5">
									{@render children()}
								</div>
							{/if}
						</div>

						<div class="flex items-center justify-end gap-3">
							<AlertDialogPrimitive.Cancel onclick={handleCancel}>
								{#snippet child({ props: cancelProps })}
									<Button {...cancelProps} variant="outline">
										{cancelText}
									</Button>
								{/snippet}
							</AlertDialogPrimitive.Cancel>
							<AlertDialogPrimitive.Action onclick={handleConfirm}>
								{#snippet child({ props: actionProps })}
									<Button {...actionProps} variant={buttonVariants[variant]}>
										{confirmText}
									</Button>
								{/snippet}
							</AlertDialogPrimitive.Action>
						</div>
					</div>
				{/if}
			{/snippet}
		</AlertDialogPrimitive.Content>
	</AlertDialogPrimitive.Portal>
</AlertDialogPrimitive.Root>
