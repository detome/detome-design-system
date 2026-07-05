<script lang="ts">
	import { Dropdown, DropdownItem } from '$lib';

	let { onItemClick }: { onItemClick?: () => void } = $props();
</script>

<div data-testid="local-root">
	<Dropdown>
		{#snippet trigger({ props })}
			<button data-testid="trigger" {...props}>Open</button>
		{/snippet}
		<DropdownItem onclick={onItemClick}>Item One</DropdownItem>
		<DropdownItem>Item Two</DropdownItem>
	</Dropdown>
</div>
