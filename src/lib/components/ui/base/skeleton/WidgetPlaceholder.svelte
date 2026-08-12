<script lang="ts">
	import { cn } from '$lib/utils/cn';

	interface Props {
		class?: string;
	}

	let { class: className }: Props = $props();

	const baseStyles =
		'max-w-sm animate-pulse rounded border border-border-default p-4 shadow md:p-6';
</script>

<div class={cn(baseStyles, className)} role="status" aria-label="Loading...">
	<div class="mb-4 flex items-center justify-between">
		<div>
			<div class="bg-surface-overlay mb-2.5 h-2.5 w-32 rounded-full"></div>
			<div class="bg-surface-sunken h-2 w-48 rounded-full"></div>
		</div>
		<div class="bg-surface-sunken h-12 w-12 rounded"></div>
	</div>
	<div class="bg-surface-sunken mb-4 h-2 rounded-full"></div>
	<div class="bg-surface-sunken mb-4 h-2 rounded-full"></div>
	<div class="bg-surface-sunken mb-4 h-2 rounded-full"></div>
	<div class="bg-surface-sunken h-2 w-3/4 rounded-full"></div>
	<span class="sr-only">Loading...</span>
</div>
