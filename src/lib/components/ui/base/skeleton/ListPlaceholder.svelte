<script lang="ts">
	import { cn } from '$lib/utils/cn';

	interface Props {
		rows?: number;
		class?: string;
	}

	let { rows = 5, class: className }: Props = $props();
</script>

<div class={cn('animate-pulse space-y-3', className)}>
	{#each Array(rows) as _, i (i)}
		<div class="flex items-center space-x-4">
			<div class="bg-surface-overlay h-10 w-10 rounded-full"></div>
			<div class="flex-1 space-y-2">
				<div class="bg-surface-overlay h-4 rounded" style="width: {60 + Math.random() * 30}%"></div>
				<div class="bg-surface-sunken h-3 rounded" style="width: {40 + Math.random() * 40}%"></div>
			</div>
		</div>
	{/each}
</div>
