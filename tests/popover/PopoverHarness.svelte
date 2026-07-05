<script lang="ts">
	import { Popover } from '$lib';

	let { open = $bindable(false) }: { open?: boolean } = $props();
</script>

<div data-testid="local-root">
	<Popover bind:open>
		{#snippet trigger()}
			<span data-testid="trigger">Open</span>
		{/snippet}
		<div data-testid="content">Popover content</div>
	</Popover>
</div>
