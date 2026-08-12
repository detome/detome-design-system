<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';
	import { Inbox } from '@lucide/svelte';

	interface Props {
		title: string;
		description?: string;
		icon?: Snippet;
		action?: Snippet;
		class?: string;
	}

	let { title, description, icon, action, class: className }: Props = $props();
</script>

<div class={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
	<div
		class="bg-surface-overlay text-fg-faint mb-4 flex h-16 w-16 items-center justify-center rounded-full">
		{#if icon}
			{@render icon()}
		{:else}
			<Inbox class="h-8 w-8" aria-hidden="true" />
		{/if}
	</div>
	<h3 class="text-fg-default mb-1 text-lg font-semibold">{title}</h3>
	{#if description}
		<p class="text-fg-muted mb-4 max-w-sm text-sm">{description}</p>
	{/if}
	{#if action}
		<div class="mt-2">
			{@render action()}
		</div>
	{/if}
</div>
