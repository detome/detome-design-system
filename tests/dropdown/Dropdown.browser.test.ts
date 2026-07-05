import { expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import { expectExists, expectNotExists } from '../browser-utils';
import DropdownHarness from './DropdownHarness.svelte';

test('opens the menu and shows items when the trigger is clicked', async () => {
	render(DropdownHarness);
	await expectNotExists(page.getByText('Item One'));

	await page.getByTestId('trigger').click();

	await expectExists(page.getByText('Item One'));
});

test('calls the item onclick handler when an item is selected', async () => {
	const onItemClick = vi.fn();
	render(DropdownHarness, { onItemClick });
	await page.getByTestId('trigger').click();

	await page.getByText('Item One').click();

	expect(onItemClick).toHaveBeenCalledOnce();
});

// Regression test: DropdownMenu.Content wasn't wrapped in DropdownMenu.Portal,
// so it rendered inline instead of at document.body.
test('menu content is portalled outside the local DOM tree', async () => {
	render(DropdownHarness);
	await page.getByTestId('trigger').click();
	await expectExists(page.getByText('Item One'));

	const item = page.getByText('Item One').element();
	const localRoot = page.getByTestId('local-root').element();

	expect(localRoot.contains(item)).toBe(false);
	expect(document.body.contains(item)).toBe(true);
});
