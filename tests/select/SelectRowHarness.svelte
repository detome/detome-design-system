<script lang="ts">
	/**
	 * Reproduces a toolbar row: selects sharing a constrained flex row with a
	 * button. Each Select declares `w-full`, so several in one row ask for more
	 * space than exists and flex has to squeeze them — the case a select in a
	 * form column never hits.
	 */
	import { Select, Button, ButtonVariant } from '$lib';

	interface Props {
		/**
		 * Width of the row, in px. Measured in Chromium, this row starts squeezing
		 * its selects below ~300px and the labels wrap at ~260px.
		 */
		width: number;
	}

	let { width }: Props = $props();

	const actionOptions = [
		{ value: 'move', label: 'Move to' },
		{ value: 'assign', label: 'Assign to' },
		{ value: 'delete', label: 'Delete' }
	];

	// Two words, so it has somewhere to wrap to. A single-word label can't
	// demonstrate anything here.
	const stateOptions = [
		{ value: 0, label: 'Backlog' },
		{ value: 2, label: 'In Progress' }
	];
</script>

<div style="width: {width}px">
	<div class="flex items-center gap-2">
		<Select id="action-select" value="move" options={actionOptions} />
		<Select id="state-select" value={2} options={stateOptions} />
		<Button variant={ButtonVariant.PRIMARY} class="flex-none">Move 3</Button>
	</div>
</div>
