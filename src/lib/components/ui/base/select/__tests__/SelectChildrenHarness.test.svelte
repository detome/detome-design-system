<script lang="ts">
	import { Select, SelectItem } from '$lib';

	let { value = $bindable('a') }: { value?: string } = $props();
</script>

<Select id="select" bind:value>
	{#snippet children()}
		<SelectItem value="a">Option A</SelectItem>
		<SelectItem value="b">Option B</SelectItem>
	{/snippet}
</Select>
