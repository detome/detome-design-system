import { expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import { RadioGroup } from '$lib';

const options = [
	{ value: 'a', label: 'Option A' },
	{ value: 'b', label: 'Option B' }
];

// Regression test: `required` was used for the label asterisk but never
// forwarded to BitsRadioGroup.Root, so the hidden input never actually
// carried the `required` attribute needed for HTML5 form validation.
test('forwards the required prop to the underlying bits-ui radio group', async () => {
	const screen = render(RadioGroup, { options, name: 'plan', required: true, value: 'a' });

	const hiddenInput = screen.container.querySelector('input[name="plan"]');
	expect(hiddenInput).not.toBeNull();
	expect(hiddenInput).toHaveAttribute('required');
});

test('selects the option that is clicked', async () => {
	render(RadioGroup, { options, name: 'plan', value: 'a' });

	await page.getByRole('radio', { name: 'Option B' }).click();

	await expect.element(page.getByRole('radio', { name: 'Option B' })).toBeChecked();
});
