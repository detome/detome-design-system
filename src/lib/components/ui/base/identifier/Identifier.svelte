<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Copy, Check } from '@lucide/svelte';

	interface Props {
		value: string;
		label?: string;
		class?: string;
		copyable?: boolean;
	}

	let { value, label, class: className, copyable = true }: Props = $props();

	let copied = $state(false);

	function handleCopy() {
		if (!copyable) return;
		navigator.clipboard.writeText(value);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 1500);
	}
</script>

{#if copyable}
	<button
		type="button"
		class={cn(
			'border-primary-200 bg-primary-50 text-primary-700 hover:bg-primary-100 hover:border-primary-300 focus-visible:ring-primary-400/60 dark:border-primary-700 dark:bg-primary-900/30 dark:text-primary-300 dark:hover:bg-primary-900/50 inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-[family-name:var(--font-mono-id)] text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none',
			className
		)}
		onclick={handleCopy}
		aria-label={label ? `Copy ${label}: ${value}` : `Copy ${value}`}
		title="Click to copy">
		<span>{value}</span>
		{#if copied}
			<Check class="text-success-600 dark:text-success-400 h-3 w-3" />
		{:else}
			<Copy class="h-3 w-3 opacity-50" />
		{/if}
	</button>
{:else}
	<span
		class={cn(
			'border-primary-200 bg-primary-50 text-primary-700 dark:border-primary-700 dark:bg-primary-900/30 dark:text-primary-300 inline-flex items-center rounded-md border px-2 py-0.5 font-[family-name:var(--font-mono-id)] text-xs font-medium',
			className
		)}>
		{value}
	</span>
{/if}
