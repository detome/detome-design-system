import { expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';
import { expectExists, expectNotExists } from '$lib/test-utils/browser-utils';
import PopoverHarness from './PopoverHarness.test.svelte';

test('content is not rendered until the trigger is clicked', async () => {
	render(PopoverHarness);
	await expectNotExists(page.getByTestId('content'));

	await page.getByTestId('trigger').click();

	await expectExists(page.getByTestId('content'));
});

// Regression test: Popover.Content wasn't wrapped in Popover.Portal, so it
// rendered inline instead of at document.body - clippable by an ancestor's
// overflow/transform.
test('content is rendered in a portal outside the local DOM tree', async () => {
	render(PopoverHarness);
	await page.getByTestId('trigger').click();
	await expectExists(page.getByTestId('content'));

	const content = page.getByTestId('content').element();
	const localRoot = page.getByTestId('local-root').element();

	expect(localRoot.contains(content)).toBe(false);
	expect(document.body.contains(content)).toBe(true);
});

test('content closes when Escape is pressed', async () => {
	render(PopoverHarness);
	await page.getByTestId('trigger').click();
	await expectExists(page.getByTestId('content'));

	await userEvent.keyboard('{Escape}');

	await expectNotExists(page.getByTestId('content'));
});
