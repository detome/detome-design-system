<script lang="ts">
	import { cn } from '$lib/utils/cn';

	interface Props {
		href?: string;
		class?: string;
	}

	let { href = '#main-content', class: className }: Props = $props();
</script>

<a
	{href}
	class={cn(
		'focus:bg-primary-600 focus:ring-primary-400 sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:ring-2 focus:ring-offset-2 focus:outline-none',
		className
	)}>
	Skip to main content
</a>
