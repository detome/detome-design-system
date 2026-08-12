<script lang="ts">
	import { DatePicker } from 'bits-ui';
	import type { DateValue } from '@internationalized/date';
	import { cn } from '$lib/utils/cn';
	import { Calendar } from '@lucide/svelte';
	import { dateToCalendarDate, calendarDateToDate } from '$lib/utils/bits-ui-utils';

	/**
	 * Single date selection component with custom styling and keyboard support.
	 * Wraps bits-ui.DatePicker with internationalized date handling.
	 *
	 * @example Basic usage
	 * ```svelte
	 * <Datepicker bind:value={selectedDate} />
	 * ```
	 *
	 * @example With date range limits
	 * ```svelte
	 * <Datepicker
	 *   bind:value={selectedDate}
	 *   minValue={new Date('2024-01-01')}
	 *   maxValue={new Date('2024-12-31')} />
	 * ```
	 *
	 * @example With onChange handler
	 * ```svelte
	 * <Datepicker
	 *   bind:value={appointmentDate}
	 *   onChange={() => validateDate()} />
	 * ```
	 *
	 * @param {Date} value - Currently selected date (bindable, undefined if none selected)
	 * @param {Date} minValue - Minimum selectable date (user cannot select earlier dates)
	 * @param {Date} maxValue - Maximum selectable date (user cannot select later dates)
	 * @param {string} class - Additional CSS classes to apply
	 * @param {() => void} onChange - Callback when date selection changes
	 *
	 * @see {@link DateRangePicker} - Use for date range selection
	 *
	 * @accessibility
	 * - Full keyboard date navigation (arrow keys, Page Up/Down)
	 * - ARIA datepicker role with proper labels
	 * - Today indicator (dot) for visual reference
	 * - Focus management on open/close
	 * - Screen reader announces selected date
	 */
	interface Props {
		/** Current selected date */
		value?: Date;
		/** Minimum selectable date */
		minValue?: Date;
		/** Maximum selectable date */
		maxValue?: Date;
		/** Additional CSS classes */
		class?: string;
		/** Callback when date changes */
		onChange?: () => void;
	}

	let { value = $bindable(), minValue, maxValue, class: classValue, onChange }: Props = $props();

	// Compute internal bits-ui value from prop value
	let internalValue = $derived(dateToCalendarDate(value));

	// Compute min/max values for bits-ui
	let bitsMinValue = $derived(dateToCalendarDate(minValue));
	let bitsMaxValue = $derived(dateToCalendarDate(maxValue));

	/**
	 * Handles value change from bits-ui date picker
	 * Converts CalendarDate back to JavaScript Date and triggers onChange callback
	 * @param newDateValue - New date value from bits-ui
	 */
	function handleValueChange(newDateValue: DateValue | undefined) {
		const newDate = calendarDateToDate(newDateValue);
		value = newDate ?? undefined;
		onChange?.();
	}
</script>

<DatePicker.Root
	value={internalValue}
	minValue={bitsMinValue}
	maxValue={bitsMaxValue}
	granularity="day"
	onValueChange={handleValueChange}>
	<DatePicker.Input
		class={cn(
			'border-border-strong bg-surface flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm',
			'focus-within:border-primary-500 hover:bg-surface-raised focus-within:ring-2 focus-within:outline-none',
			classValue
		)}>
		{#snippet children({ segments })}
			{#each segments as { part, value }, i (part + i)}
				<div class="inline-block select-none">
					{#if part === 'literal'}
						<DatePicker.Segment {part} class="text-fg-muted p-1">
							{value}
						</DatePicker.Segment>
					{:else}
						<DatePicker.Segment
							{part}
							class="focus:ring-primary-500 hover:bg-surface-overlay rounded px-1 py-1 focus:ring-2">
							{value}
						</DatePicker.Segment>
					{/if}
				</div>
			{/each}
			<DatePicker.Trigger
				class="text-fg-muted hover:bg-surface-overlay hover:text-fg-default ml-auto inline-flex size-8 items-center justify-center rounded-lg transition-all">
				<Calendar class="h-4 w-4" />
			</DatePicker.Trigger>
		{/snippet}
	</DatePicker.Input>

	<DatePicker.Content
		class="border-border-default bg-surface z-50 rounded-lg border p-4 shadow-lg"
		sideOffset={8}>
		<DatePicker.Calendar>
			{#snippet children({ months, weekdays })}
				{#each months as month}
					<div class="space-y-4">
						<DatePicker.Header class="flex items-center justify-between">
							<DatePicker.PrevButton
								class="hover:bg-surface-overlay inline-flex h-10 w-10 items-center justify-center rounded-lg">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round">
									<polyline points="15 18 9 12 15 6" />
								</svg>
							</DatePicker.PrevButton>
							<DatePicker.Heading class="text-fg-default text-base font-semibold" />
							<DatePicker.NextButton
								class="hover:bg-surface-overlay inline-flex h-10 w-10 items-center justify-center rounded-lg">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round">
									<polyline points="9 18 15 12 9 6" />
								</svg>
							</DatePicker.NextButton>
						</DatePicker.Header>

						<DatePicker.Grid class="w-full border-collapse">
							<DatePicker.GridHead>
								<DatePicker.GridRow class="flex">
									{#each weekdays as day}
										<DatePicker.HeadCell class="text-fg-muted w-10 text-center text-xs font-medium">
											{day.slice(0, 2)}
										</DatePicker.HeadCell>
									{/each}
								</DatePicker.GridRow>
							</DatePicker.GridHead>
							<DatePicker.GridBody>
								{#each month.weeks as weekDates}
									<DatePicker.GridRow class="mt-1 flex">
										{#each weekDates as date}
											<DatePicker.Cell
												{date}
												month={month.value}
												class="relative h-10 w-10 p-0 text-center">
												<DatePicker.Day
													class={cn(
														'inline-flex h-10 w-10 items-center justify-center rounded-lg text-sm',
														'hover:bg-surface-overlay',
														'data-[selected]:bg-primary-600 data-[selected]:text-white',
														'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
														'data-[outside-month]:text-fg-faint'
													)}>
													{date.day}
												</DatePicker.Day>
											</DatePicker.Cell>
										{/each}
									</DatePicker.GridRow>
								{/each}
							</DatePicker.GridBody>
						</DatePicker.Grid>
					</div>
				{/each}
			{/snippet}
		</DatePicker.Calendar>
	</DatePicker.Content>
</DatePicker.Root>
