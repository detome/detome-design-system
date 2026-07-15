<script lang="ts">
	import { Select, Button, ComponentSize, ButtonVariant } from '$lib';

	let {
		size = ComponentSize.MD,
		longLabel = false
	}: { size?: ComponentSize; longLabel?: boolean } = $props();

	const label = $derived(
		longLabel ? 'A button label long enough that it has to wrap onto another line' : 'Apply'
	);
</script>

<!-- Every variant plus a Select, as they'd sit together in a toolbar row. -->
<div class="flex w-64 items-center gap-2">
	<Button id="primary" {size} variant={ButtonVariant.PRIMARY}>{label}</Button>
	<Button id="secondary" {size} variant={ButtonVariant.SECONDARY}>Apply</Button>
	<Button id="outline" {size} variant={ButtonVariant.OUTLINE}>Apply</Button>
	<Button id="ghost" {size} variant={ButtonVariant.GHOST}>Apply</Button>
	<Button id="danger" {size} variant={ButtonVariant.DANGER}>Apply</Button>
	<Button id="success" {size} variant={ButtonVariant.SUCCESS}>Apply</Button>
	<div class="w-40">
		<Select id="select" {size} options={[{ value: 'a', label: 'A' }]} value="a" />
	</div>
</div>
