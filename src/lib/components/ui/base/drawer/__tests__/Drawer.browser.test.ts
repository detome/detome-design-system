import { expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import { expectExists, expectNotExists } from '$lib/test-utils/browser-utils';
import DrawerHarness from './DrawerHarness.test.svelte';

test('is not in the document when closed', async () => {
	render(DrawerHarness, { open: false });
	await expectNotExists(page.getByTestId('content'));
});

// Regression test: Drawer's Dialog.Overlay/Dialog.Content weren't wrapped in
// Dialog.Portal (unlike the sibling Modal.svelte, which was already correct),
// so they rendered inline instead of at document.body.
test('renders when open and is portalled outside the local DOM tree', async () => {
	render(DrawerHarness, { open: true });
	await expectExists(page.getByTestId('content'));

	const content = page.getByTestId('content').element();
	const localRoot = page.getByTestId('local-root').element();

	expect(localRoot.contains(content)).toBe(false);
	expect(document.body.contains(content)).toBe(true);
});

test('applies the placement-specific position classes', async () => {
	render(DrawerHarness, { open: true, placement: 'right' });
	await expectExists(page.getByTestId('content'));

	const content = page.getByTestId('content').element();
	expect(content.parentElement?.className).toContain('right-0');
});
