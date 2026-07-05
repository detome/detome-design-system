import { expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';
import { expectExists, expectNotExists } from '../browser-utils';
import AlertDialogHarness from './AlertDialogHarness.svelte';

test('confirming calls onConfirm and closes the dialog', async () => {
	const onConfirm = vi.fn();
	render(AlertDialogHarness, { onConfirm });

	await page.getByTestId('opener').click();
	await expectExists(page.getByRole('alertdialog'));

	await page.getByRole('button', { name: 'Confirm' }).click();

	expect(onConfirm).toHaveBeenCalledOnce();
	await expectNotExists(page.getByRole('alertdialog'));
});

test('cancelling calls onCancel and closes the dialog', async () => {
	const onCancel = vi.fn();
	render(AlertDialogHarness, { onCancel });

	await page.getByTestId('opener').click();
	await expectExists(page.getByRole('alertdialog'));

	await page.getByRole('button', { name: 'Cancel' }).click();

	expect(onCancel).toHaveBeenCalledOnce();
	await expectNotExists(page.getByRole('alertdialog'));
});

test('Escape is treated as Cancel, not a silent dismiss', async () => {
	const onCancel = vi.fn();
	render(AlertDialogHarness, { onCancel });

	await page.getByTestId('opener').click();
	await expectExists(page.getByRole('alertdialog'));

	await userEvent.keyboard('{Escape}');

	expect(onCancel).toHaveBeenCalledOnce();
	await expectNotExists(page.getByRole('alertdialog'));
});

// Regression guard: critical confirmations must not be dismissible by
// clicking outside, unlike Modal.
test('clicking outside does not dismiss the dialog', async () => {
	render(AlertDialogHarness);

	await page.getByTestId('opener').click();
	await expectExists(page.getByRole('alertdialog'));

	const overlay = document.querySelector('[data-alert-dialog-overlay]') as HTMLElement;
	await page.elementLocator(overlay).click({ position: { x: 1, y: 1 } });

	await expectExists(page.getByRole('alertdialog'));
});
