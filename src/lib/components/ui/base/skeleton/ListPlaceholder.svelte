<script lang="ts">
	import { cn } from '$lib/utils/cn';

	interface Props {
		rows?: number;
		/** Render the column-header bar above the rows. */
		showHeader?: boolean;
		class?: string;
	}

	let { rows = 5, showHeader = true, class: className }: Props = $props();

	// Deterministic per-row widths so the skeleton looks like real, varied
	// content instead of a uniform gray block, and doesn't reshuffle on rerender.
	const rowWidths = [92, 78, 88, 64, 84, 71, 96, 60, 80, 68];
</script>

<div
	class={cn('border-border-default bg-surface overflow-hidden rounded-lg border', className)}
	role="status"
	aria-busy="true"
	aria-label="Loading">
	{#if showHeader}
		<div class="border-border-default bg-surface-raised flex items-center gap-4 border-b px-4 py-3">
			<div class="skeleton-bar h-3.5 w-20 rounded"></div>
			<div class="skeleton-bar h-3.5 w-40 rounded"></div>
			<div class="skeleton-bar h-3.5 flex-1 rounded"></div>
			<div class="skeleton-bar h-3.5 w-16 rounded"></div>
		</div>
	{/if}
	{#each Array(rows) as _unused, i (i)}
		<div
			class="border-border-subtle flex items-center gap-4 border-b px-4 py-3 last:border-b-0"
			style="opacity: {1 - i * 0.07}">
			<div class="skeleton-bar h-3.5 w-16 shrink-0 rounded"></div>
			<div class="skeleton-bar h-3.5 rounded" style="width: {rowWidths[i % rowWidths.length]}%">
			</div>
			<div class="skeleton-bar h-5 w-16 shrink-0 rounded-full"></div>
		</div>
	{/each}
	<span class="sr-only">Loading…</span>
</div>

<style>
	/* Brand-tinted shimmer that sweeps left → right. More lively than a plain
	   pulse, but quiet enough to sit inside a card without shouting. */
	.skeleton-bar {
		background-color: var(--color-surface-overlay);
		background-image: linear-gradient(
			90deg,
			transparent 0%,
			color-mix(in srgb, var(--color-primary-300) 22%, transparent) 50%,
			transparent 100%
		);
		background-size: 200% 100%;
		background-repeat: no-repeat;
		animation: skeleton-shimmer 1.6s ease-in-out infinite;
	}

	@keyframes skeleton-shimmer {
		0% {
			background-position: 120% 0;
		}
		100% {
			background-position: -80% 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.skeleton-bar {
			animation: none;
		}
	}
</style>
