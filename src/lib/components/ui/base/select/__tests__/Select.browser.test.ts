import { expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import { Select } from '$lib';
import { expectExists, expectNotExists } from '$lib/test-utils/browser-utils';
import SelectChildrenHarness from './SelectChildrenHarness.test.svelte';

const options = [
	{ value: 'a', label: 'Option A' },
	{ value: 'b', label: 'Option B' }
];

test('shows the placeholder when no option is selected', async () => {
	const screen = render(Select, { options, placeholder: 'Choose one' });
	await expect.element(screen.getByText('Choose one')).toBeVisible();
});

test('opens the listbox and shows options when the trigger is clicked', async () => {
	const screen = render(Select, { options, value: 'a' });
	await expectNotExists(page.getByRole('option', { name: 'Option B' }));

	await screen.getByRole('button').click();

	await expectExists(page.getByRole('option', { name: 'Option B' }));
});

test('updates the displayed label when a new option is selected', async () => {
	const screen = render(Select, { options, value: 'a' });
	await screen.getByRole('button').click();

	await page.getByRole('option', { name: 'Option B' }).click();

	await expect.element(screen.getByRole('button')).toHaveTextContent('Option B');
});

// Regression test: SelectItem's checkmark used to be styled with
// `data-[state=checked]`, but bits-ui's Select.Item never sets `data-state` -
// it sets `data-selected` instead, so the checkmark never appeared.
test('shows the checkmark on the selected custom SelectItem only', async () => {
	render(SelectChildrenHarness, { value: 'a' });
	await page.getByRole('button').click();

	const selectedItem = page.getByRole('option', { name: 'Option A' });
	const unselectedItem = page.getByRole('option', { name: 'Option B' });
	await expect.element(selectedItem).toHaveAttribute('data-selected');
	await expect.element(unselectedItem).not.toHaveAttribute('data-selected');

	const selectedCheckIcon = selectedItem.element().querySelector('.check-icon');
	const unselectedCheckIcon = unselectedItem.element().querySelector('.check-icon');
	expect(selectedCheckIcon).not.toBeNull();
	expect(unselectedCheckIcon).not.toBeNull();

	// absolute positioning blockifies the computed display, so a visible
	// checkmark reads as "block" rather than the literal "inline" utility -
	// what matters is that it isn't "none" (Tailwind's `hidden`).
	expect(getComputedStyle(selectedCheckIcon as Element).display).not.toBe('none');
	expect(getComputedStyle(unselectedCheckIcon as Element).display).toBe('none');
});

// Regression test: the trigger and item text had no color utility classes at
// all, so in dark mode they rendered as browser-default black text on the
// dark:bg-gray-800 popover - unreadable.
test('renders trigger and item text in a non-black color when dark mode is active', async () => {
	document.documentElement.classList.add('dark');
	try {
		const screen = render(Select, { options, value: 'a' });
		const trigger = screen.getByRole('button');
		await trigger.click();

		const item = page.getByRole('option', { name: 'Option B' });
		await expectExists(item);

		expect(getComputedStyle(trigger.element()).color).not.toBe('rgb(0, 0, 0)');
		expect(getComputedStyle(item.element()).color).not.toBe('rgb(0, 0, 0)');
	} finally {
		document.documentElement.classList.remove('dark');
	}
});
