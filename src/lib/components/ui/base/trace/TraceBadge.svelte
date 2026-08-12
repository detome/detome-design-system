<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	export interface TraceBadgeVariant {
		label: string;
		icon?: Snippet;
		class?: string;
	}

	interface Props {
		label: string;
		count?: number;
		class?: string;
		icon?: Snippet;
		variant?: 'default' | 'upstream' | 'downstream' | 'suspect';
	}

	let { label, count, class: className, icon, variant = 'default' }: Props = $props();

	const variantStyles = {
		default: 'border-border-default bg-surface-overlay text-fg-muted',
		upstream:
			'border-primary-200 bg-primary-50 text-primary-700 dark:border-primary-700 dark:bg-primary-900/30 dark:text-primary-300',
		downstream:
			'border-accent-200 bg-accent-50 text-accent-700 dark:border-accent-700 dark:bg-accent-900/30 dark:text-accent-300',
		suspect:
			'border-warning-300 bg-warning-50 text-warning-800 dark:border-warning-700 dark:bg-warning-900/30 dark:text-warning-300'
	};
</script>

<span
	class={cn(
		'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium',
		variantStyles[variant],
		className
	)}>
	{#if icon}
		{@render icon()}
	{/if}
	<span>{label}</span>
	{#if count !== undefined}
		<span class="opacity-70">({count})</span>
	{/if}
</span>
