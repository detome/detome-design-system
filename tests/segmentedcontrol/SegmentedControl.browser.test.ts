import { expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import { SegmentedControl } from '$lib';

const options = [
	{ value: 'and', label: 'AND' },
	{ value: 'or', label: 'OR' }
];

test('renders the selected option as checked', async () => {
	render(SegmentedControl, { options, value: 'and', ariaLabel: 'Combinator' });

	await expect.element(page.getByRole('radio', { name: 'AND' })).toBeChecked();
	await expect.element(page.getByRole('radio', { name: 'OR' })).not.toBeChecked();
});

test('gives the selected segment the primary filled styling so it stands out', async () => {
	render(SegmentedControl, { options, value: 'and', ariaLabel: 'Combinator' });

	const checked = await page.getByRole('radio', { name: 'AND' }).element();
	expect(checked.className).toContain('data-[state=checked]:from-primary-600');
	expect(checked.className).toContain('data-[state=checked]:text-white');
});

test('selects the segment that is clicked', async () => {
	render(SegmentedControl, { options, value: 'and', ariaLabel: 'Combinator' });

	await page.getByRole('radio', { name: 'OR' }).click();

	await expect.element(page.getByRole('radio', { name: 'OR' })).toBeChecked();
	await expect.element(page.getByRole('radio', { name: 'AND' })).not.toBeChecked();
});

test('calls onChange with the newly selected value', async () => {
	const onChange = vi.fn();
	render(SegmentedControl, { options, value: 'and', ariaLabel: 'Combinator', onChange });

	await page.getByRole('radio', { name: 'OR' }).click();

	expect(onChange).toHaveBeenCalledWith('or');
});

test('does not select a disabled segment when clicked', async () => {
	const onChange = vi.fn();
	render(SegmentedControl, {
		options: [options[0]!, { ...options[1]!, disabled: true }],
		value: 'and',
		ariaLabel: 'Combinator',
		onChange
	});

	await page
		.getByRole('radio', { name: 'OR' })
		.click({ force: true })
		.catch(() => {});

	await expect.element(page.getByRole('radio', { name: 'AND' })).toBeChecked();
	expect(onChange).not.toHaveBeenCalled();
});

test('applies the aria-label to the group', async () => {
	render(SegmentedControl, { options, value: 'and', ariaLabel: 'Filter combinator' });

	await expect.element(page.getByRole('radiogroup', { name: 'Filter combinator' })).toBeVisible();
});
