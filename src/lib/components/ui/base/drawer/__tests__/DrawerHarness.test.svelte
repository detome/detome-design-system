<script lang="ts">
	import { Drawer } from '$lib';

	let {
		open = $bindable(false),
		placement = 'left'
	}: { open?: boolean; placement?: 'left' | 'right' | 'top' | 'bottom' } = $props();
</script>

<div data-testid="local-root">
	<Drawer bind:open {placement}>
		<div data-testid="content">Drawer content</div>
	</Drawer>
</div>
