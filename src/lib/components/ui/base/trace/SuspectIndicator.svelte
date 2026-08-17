<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { AlertTriangle, Link2Off } from '@lucide/svelte';
	import { LucideIconSize } from '../enums';

	interface Props {
		class?: string;
		label?: string;
	}

	let { class: className, label = 'Suspect link' }: Props = $props();
</script>

<span
	class={cn(
		'border-warning-300 bg-warning-50 text-warning-800 dark:border-warning-700 dark:bg-warning-900/30 dark:text-warning-300 inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium',
		className
	)}
	role="status"
	aria-label={label}>
	<AlertTriangle size={LucideIconSize.XS} aria-hidden="true" />
	<span>{label}</span>
</span>
