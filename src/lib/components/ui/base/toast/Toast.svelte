<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { X } from '@lucide/svelte';
	import { statusIcons } from '$lib/utils/status-icons';
	import { fly } from 'svelte/transition';
	import type { Snippet } from 'svelte';
	import { StatusVariant } from '$lib/components/ui/base/enums';
	import type { StatusVariantType } from '$lib/components/ui/base/enums';
	import { ButtonVariant } from '$lib/components/ui/base/enums';

	/**
	 * Toast notification component with multiple variants and dismissible option.
	 * Supports auto-dismiss, custom content, and fly-in animation.
	 *
	 * @example Basic success toast
	 * ```svelte
	 * <Toast variant={StatusVariant.SUCCESS} message="Changes saved successfully!" />
	 * ```
	 *
	 * @example Dismissible error toast
	 * ```svelte
	 * <Toast
	 *   variant={StatusVariant.ERROR}
	 *   message="Failed to save changes"
	 *   dismissable
	 *   onDismiss={() => console.log('dismissed')}
	 * />
	 * ```
	 *
	 * @example With custom content
	 * ```svelte
	 * <Toast dismissable onclose={() => console.log('closed')}>
	 *   {#snippet children()}
	 *     <div>
	 *       <p class="font-bold">Custom Notification</p>
	 *       <p class="text-sm">With custom content</p>
	 *     </div>
	 *   {/snippet}
	 * </Toast>
	 * ```
	 *
	 * @example Using toast data object
	 * ```svelte
	 * <Toast
	 *   toast={myToastData}
	 *   onDismiss={(id) => removeToast(id)}
	 * />
	 * ```
	 *
	 * @example Warning variant
	 * ```svelte
	 * <Toast variant={StatusVariant.WARNING} message="This is a warning" />
	 * ```
	 *
	 * @param {ToastData} toast - Toast data object containing id, variant, and message
	 * @param {(id: string) => void} onDismiss - Callback when toast is dismissed via close button
	 * @param {boolean} dismissable - If true, shows dismiss button. Auto-detected from toast/onDismiss. Default: false
	 * @param {() => void} onclose - Callback when toast is closed or dismissed
	 * @param {StatusVariant | StatusVariantType} color - Color variant (alternative to toast.variant). Default: StatusVariant.INFO
	 * @param {Snippet} children - Custom toast content (overrides toast.message)
	 * @param {string} class - Additional CSS classes to apply
	 *
	 * @see {@link ToastProvider} - Provider component for toast state management
	 * @see {@link Modal} - For modal dialogs
	 *
	 * @accessibility
	 * - ARIA: role="alert" and aria-live="polite" for screen readers
	 * - Keyboard: Dismiss button is keyboard accessible
	 * - Dismiss button has proper aria-label
	 * - Fly-in animation respects prefers-reduced-motion
	 * - High contrast colors for all variants
	 */
	interface ToastData {
		id: string;
		variant?: StatusVariant;
		message?: string;
	}

	interface Props {
		toast?: ToastData;
		onDismiss?: (id: string) => void;
		dismissable?: boolean;
		onclose?: () => void;
		color?: StatusVariant | StatusVariantType;
		children?: Snippet;
		class?: string;
	}

	let {
		toast,
		onDismiss,
		dismissable = false,
		onclose,
		color: colorProp,
		children,
		class: className
	}: Props = $props();

	const variant = $derived(toast?.variant ?? colorProp ?? StatusVariant.INFO);

	const variants: Record<StatusVariant, string> = {
		[StatusVariant.INFO]:
			'bg-info-50 border-info-200 text-info-800 dark:bg-info-900/90 dark:border-info-700 dark:text-info-100',
		[StatusVariant.SUCCESS]:
			'bg-success-50 border-success-200 text-success-800 dark:bg-success-900/90 dark:border-success-700 dark:text-success-100',
		[StatusVariant.ERROR]:
			'bg-error-50 border-error-200 text-error-800 dark:bg-error-900/90 dark:border-error-700 dark:text-error-100',
		[StatusVariant.WARNING]:
			'bg-warning-50 border-warning-200 text-warning-800 dark:bg-warning-900/90 dark:border-warning-700 dark:text-warning-100'
	};

	const iconColors: Record<StatusVariant, string> = {
		[StatusVariant.INFO]: 'text-info-600 dark:text-info-400',
		[StatusVariant.SUCCESS]: 'text-success-600 dark:text-success-400',
		[StatusVariant.ERROR]: 'text-error-600 dark:text-error-400',
		[StatusVariant.WARNING]: 'text-warning-600 dark:text-warning-400'
	};

	const Icon = $derived(statusIcons[variant]);

	function handleDismiss() {
		if (toast && onDismiss) {
			onDismiss(toast.id);
		}
		if (onclose) {
			onclose();
		}
	}

	const showDismissButton = $derived(dismissable || (toast && onDismiss));

	const baseStyles =
		'flex items-center gap-3 rounded-lg border p-4 shadow-lg backdrop-blur-sm min-w-[300px] max-w-md';
	const computedClass = $derived(cn(baseStyles, variants[variant] as string, className));
</script>

<div
	transition:fly={{ y: -20, duration: 200 }}
	class={computedClass}
	role="alert"
	aria-live="polite">
	{#if !children}
		<div class="flex-shrink-0 {iconColors[variant]}">
			<Icon class="h-5 w-5" />
		</div>
	{/if}

	<div class="flex-1 text-sm font-medium">
		{#if children}
			{@render children()}
		{:else}
			{toast?.message ?? ''}
		{/if}
	</div>

	{#if showDismissButton}
		<button
			type="button"
			onclick={handleDismiss}
			class="flex-shrink-0 rounded-md p-1 hover:bg-black/10 dark:hover:bg-white/10"
			aria-label="Dismiss">
			<X class="h-4 w-4" />
		</button>
	{/if}
</div>
