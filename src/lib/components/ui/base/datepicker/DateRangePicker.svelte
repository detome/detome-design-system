<script lang="ts">
	import { DateRangePicker, type DateRange as BitsDateRange } from 'bits-ui';
	import { cn } from '$lib/utils/cn';
	import { Calendar } from '@lucide/svelte';
	import { dateToCalendarDate, calendarDateToDate } from '$lib/utils/bits-ui-utils';

	/**
	 * Date range selection component for choosing start and end dates.
	 * Wraps bits-ui.DateRangePicker with internationalized date handling.
	 *
	 * @example Basic date range
	 * <DateRangePicker bind:value={dateRange} />
	 *
	 * @example With initial range
	 * <DateRangePicker bind:value={range} />
	 *
	 * @example With onChange handler
	 * <DateRangePicker bind:value={stayDates} onChange={handleCheck} />
	 *
	 * @interface DateRange
	 * @property {Date} [start] - Start date of the range (optional)
	 * @property {Date} [end] - End date of the range (optional)
	 *
	 * @param {DateRange | Date} value - Selected date range or single date (bindable).
	 *   Can be { start: Date, end: Date } or single Date
	 * @param {string} class - Additional CSS classes to apply
	 * @param {() => void} onChange - Callback when date range selection changes
	 *
	 * @see {@link Datepicker} - Use Datepicker for single date selection
	 *
	 * @accessibility
	 * - Full keyboard date navigation for both calendars
	 * - ARIA datepicker roles with proper labels
	 * - Visual selection indicators for range
	 * - Focus management across calendar views
	 * - Screen reader announces selected range
	 */
	interface DateRange {
		/** Start date of the range */
		start?: Date;
		/** End date of the range */
		end?: Date;
	}

	/**
	 * DateRangePicker component props
	 * @interface Props
	 */
	interface Props {
		/** Current selected date range or single date */
		value?: DateRange | Date;
		/** Additional CSS classes */
		class?: string;
		/** Callback when date range changes */
		onChange?: () => void;
	}

	let { value = $bindable(), class: classValue, onChange }: Props = $props();

	/**
	 * Normalizes value to date range format
	 * Handles both DateRange objects and single Date objects
	 */
	let normalizedValue = $derived.by((): DateRange => {
		if (!value) return { start: undefined, end: undefined };
		if (value instanceof Date) {
			return { start: value, end: undefined };
		}
		return value as DateRange;
	});

	/**
	 * Formats date for display
	 * @param date - Date to format
	 * @returns Formatted date string
	 */
	function formatDate(date: Date | undefined): string {
		if (!date) return '';
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
	}

	// Compute internal bits-ui value from prop value
	let bitsValue: BitsDateRange = $derived({
		start: dateToCalendarDate(normalizedValue.start),
		end: dateToCalendarDate(normalizedValue.end)
	});

	/**
	 * Handles value change from bits-ui date range picker
	 * Converts BitsDateRange back to DateRange and triggers onChange callback
	 * @param newRange - New date range value from bits-ui
	 */
	function handleValueChange(newRange: BitsDateRange) {
		const start = calendarDateToDate(newRange.start);
		const end = calendarDateToDate(newRange.end);
		value = { start, end };
		onChange?.();
	}
</script>

<DateRangePicker.Root value={bitsValue} onValueChange={handleValueChange}>
	<DateRangePicker.Trigger>
		{#snippet child({ props })}
			<button
				{...props}
				class={cn(
					'inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm',
					'focus:ring-primary-500 hover:bg-gray-50 focus:ring-2 focus:outline-none',
					'dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700',
					classValue
				)}>
				<Calendar class="h-4 w-4 flex-shrink-0 text-gray-500 dark:text-gray-400" />
				{#if normalizedValue.start && normalizedValue.end}
					<span class="font-medium">
						{formatDate(normalizedValue.start)} - {formatDate(normalizedValue.end)}
					</span>
				{:else if normalizedValue.start}
					<span class="font-medium">
						From {formatDate(normalizedValue.start)}
					</span>
				{:else if normalizedValue.end}
					<span class="font-medium">
						Until {formatDate(normalizedValue.end)}
					</span>
				{:else}
					<span class="text-gray-500 dark:text-gray-400">Select date range</span>
				{/if}
			</button>
		{/snippet}
	</DateRangePicker.Trigger>

	<DateRangePicker.Content
		class="z-50 rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800"
		sideOffset={8}>
		<DateRangePicker.Calendar>
			{#snippet children({ months, weekdays })}
				{#each months as month}
					<div class="space-y-4">
						<DateRangePicker.Header class="flex items-center justify-between">
							<DateRangePicker.PrevButton
								class="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
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
							</DateRangePicker.PrevButton>
							<DateRangePicker.Heading
								class="text-base font-semibold text-gray-900 dark:text-white" />
							<DateRangePicker.NextButton
								class="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
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
							</DateRangePicker.NextButton>
						</DateRangePicker.Header>

						<DateRangePicker.Grid class="w-full border-collapse">
							<DateRangePicker.GridHead>
								<DateRangePicker.GridRow class="flex">
									{#each weekdays as day}
										<DateRangePicker.HeadCell
											class="w-10 text-center text-xs font-medium text-gray-500 dark:text-gray-400">
											{day.slice(0, 2)}
										</DateRangePicker.HeadCell>
									{/each}
								</DateRangePicker.GridRow>
							</DateRangePicker.GridHead>
							<DateRangePicker.GridBody>
								{#each month.weeks as weekDates}
									<DateRangePicker.GridRow class="mt-1 flex">
										{#each weekDates as date}
											<DateRangePicker.Cell
												{date}
												month={month.value}
												class="relative h-10 w-10 p-0 text-center">
												<DateRangePicker.Day
													class={cn(
														'inline-flex h-10 w-10 items-center justify-center rounded-lg text-sm',
														'hover:bg-gray-100 dark:hover:bg-gray-700',
														'data-[selected]:bg-primary-600 data-[selected]:text-white',
														'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
														'data-[outside-month]:text-gray-400 dark:data-[outside-month]:text-gray-600'
													)}>
													{date.day}
												</DateRangePicker.Day>
											</DateRangePicker.Cell>
										{/each}
									</DateRangePicker.GridRow>
								{/each}
							</DateRangePicker.GridBody>
						</DateRangePicker.Grid>
					</div>
				{/each}
			{/snippet}
		</DateRangePicker.Calendar>
	</DateRangePicker.Content>
</DateRangePicker.Root>
