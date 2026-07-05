<script lang="ts">
	import { AlertDialog } from '$lib';

	let {
		open = $bindable(false),
		onConfirm,
		onCancel
	}: { open?: boolean; onConfirm?: () => void; onCancel?: () => void } = $props();
</script>

<div data-testid="local-root">
	<button data-testid="opener" onclick={() => (open = true)}>Open</button>
	<AlertDialog
		bind:open
		title="Delete item"
		description="This action cannot be undone"
		{onConfirm}
		{onCancel} />
</div>
