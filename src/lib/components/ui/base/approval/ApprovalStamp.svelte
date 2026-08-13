<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { ShieldCheck } from '@lucide/svelte';
	import { LucideIconSize } from '../enums';

	interface Props {
		name: string;
		role?: string;
		timestamp?: string;
		avatarUrl?: string;
		class?: string;
	}

	let { name, role, timestamp, avatarUrl, class: className }: Props = $props();
</script>

<div
	class={cn(
		'border-success-200 bg-success-50 dark:border-success-700 dark:bg-success-900/20 inline-flex items-center gap-3 rounded-lg border px-4 py-2.5',
		className
	)}>
	{#if avatarUrl}
		<img
			src={avatarUrl}
			alt="{name}'s avatar"
			class="border-success-300 dark:border-success-700 h-8 w-8 rounded-full border" />
	{:else}
		<div
			class="bg-success-200 text-success-700 dark:bg-success-800 dark:text-success-300 flex h-8 w-8 items-center justify-center rounded-full">
			<span class="text-xs font-bold">{name.charAt(0).toUpperCase()}</span>
		</div>
	{/if}
	<div class="flex flex-col">
		<div class="flex items-center gap-1.5">
			<ShieldCheck size={LucideIconSize.SM} class="text-success-600 dark:text-success-400" aria-hidden="true" />
			<span class="text-success-800 dark:text-success-300 text-sm font-semibold">
				Approved by {name}
			</span>
		</div>
		<div class="text-success-600 dark:text-success-400 flex items-center gap-2 text-xs">
			{#if role}
				<span>{role}</span>
			{/if}
			{#if role && timestamp}
				<span aria-hidden="true">&middot;</span>
			{/if}
			{#if timestamp}
				<time>{timestamp}</time>
			{/if}
		</div>
	</div>
</div>
