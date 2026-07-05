<script lang="ts">
	import { Popover } from '$lib';

	let { open = $bindable(false) }: { open?: boolean } = $props();
</script>

<div data-testid="local-root">
	<Popover bind:open>
		{#snippet trigger({ props })}
			<button data-testid="trigger" {...props}>Open</button>
		{/snippet}
		<div data-testid="content">Popover content</div>
	</Popover>
</div>
