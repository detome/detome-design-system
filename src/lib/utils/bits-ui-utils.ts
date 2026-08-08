/**
 * Utility functions for working with bits-ui components
 * Provides common conversion and helper functions used across multiple components
 */

import { CalendarDate, type DateValue } from '@internationalized/date';

/**
 * Converts a JavaScript Date object to a CalendarDate for bits-ui date components
 * @param date - JavaScript Date object or undefined
 * @returns CalendarDate object or undefined
 */
export function dateToCalendarDate(date: Date | undefined): CalendarDate | undefined {
	if (!date) return undefined;
	return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

/**
 * Converts a CalendarDate (from bits-ui) back to a JavaScript Date object
 * @param dateValue - CalendarDate object or undefined
 * @returns JavaScript Date object or undefined
 */
export function calendarDateToDate(dateValue: DateValue | undefined): Date | undefined {
	if (!dateValue) return undefined;
	return new Date(dateValue.year, dateValue.month - 1, dateValue.day);
}

/**
 * Converts a value to string for bits-ui components that require string values
 * Handles null, undefined, numbers, and other types safely
 * @param value - Value to convert to string
 * @returns String representation or empty string for null/undefined
 */
export function safeValueToString(value: unknown): string {
	if (value === null || value === undefined) return '';
	return String(value);
}

/**
 * Finds an option by value in a select options array
 * @param options - Array of select options
 * @param value - Value to find
 * @returns Matching option or undefined
 */
export function findOptionByValue(
	options: Array<{ value: unknown }>,
	value: unknown
): unknown | undefined {
	// This used to be `if (!value) return undefined;` but that caused problems when an index started at 0 for an enum
	// This is a more explicit check for non-0 and non-valid inputs
	if (value === null || value === undefined) return undefined;

	const valueString = safeValueToString(value);
	return options.find((opt) => safeValueToString(opt.value) === valueString);
}
