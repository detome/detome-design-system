<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { X } from '@lucide/svelte';
	import { statusIcons } from '$lib/utils/status-icons';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { StatusVariant } from '../enums';
	import type { StatusVariantType } from '../enums';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		variant?: StatusVariant | StatusVariantType;
		dismissible?: boolean;
		onDismiss?: () => void;
		icon?: Snippet;
		children?: Snippet;
		class?: string;
	}

	let {
		variant = StatusVariant.INFO,
		dismissible = false,
		onDismiss,
		icon,
		children,
		class: className,
		...restProps
	}: Props = $props();

	let dismissed = $state(false);

	const variants: Record<StatusVariant, string> = {
		[StatusVariant.INFO]:
			'bg-info-50 border-info-200 text-info-800 dark:bg-info-900/20 dark:border-info-700 dark:text-info-300',
		[StatusVariant.SUCCESS]:
			'bg-success-50 border-success-200 text-success-800 dark:bg-success-900/20 dark:border-success-700 dark:text-success-300',
		[StatusVariant.WARNING]:
			'bg-warning-50 border-warning-200 text-warning-800 dark:bg-warning-900/20 dark:border-warning-700 dark:text-warning-300',
		[StatusVariant.ERROR]:
			'bg-error-50 border-error-200 text-error-800 dark:bg-error-900/20 dark:border-error-700 dark:text-error-300'
	};

	const iconColors: Record<StatusVariant, string> = {
		[StatusVariant.INFO]: 'text-info-600 dark:text-info-400',
		[StatusVariant.SUCCESS]: 'text-success-600 dark:text-success-400',
		[StatusVariant.WARNING]: 'text-warning-600 dark:text-warning-400',
		[StatusVariant.ERROR]: 'text-error-600 dark:text-error-400'
	};

	const DefaultIcon = $derived(statusIcons[variant]);

	function handleDismiss() {
		dismissed = true;
		if (onDismiss) {
			onDismiss();
		}
	}

	const baseStyles = 'flex items-start gap-3 rounded-lg border p-4';
	const computedClass = $derived(cn(baseStyles, variants[variant] as string, className));
</script>

{#if !dismissed}
	<div class={computedClass} role="alert" {...restProps}>
		<div class="flex-shrink-0 {iconColors[variant]}">
			{#if icon}
				{@render icon()}
			{:else}
				<DefaultIcon class="h-5 w-5" />
			{/if}
		</div>

		<div class="flex-1 text-sm">
			{#if children}
				{@render children()}
			{/if}
		</div>

		{#if dismissible}
			<button
				type="button"
				onclick={handleDismiss}
				class="flex-shrink-0 rounded-md p-1 hover:bg-black/10 dark:hover:bg-white/10"
				aria-label="Dismiss">
				<X class="h-4 w-4" />
			</button>
		{/if}
	</div>
{/if}
