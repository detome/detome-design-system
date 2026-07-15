import { expect, test, describe } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { ComponentSize } from '$lib';
import ControlHeightsHarness from './ControlHeightsHarness.svelte';

/**
 * `size` is a cross-component contract: a Button and a Select of the same size
 * must be the same height, whatever the variant, so toolbars line up without
 * per-caller nudging.
 *
 * These measure real laid-out boxes in a browser. Class-string assertions
 * wouldn't catch this, because the old heights came from padding and
 * line-height overshooting `min-h-*` rather than from any one class.
 */

/** Nominal height of each size, in px. */
const expectedHeights: Record<string, number> = {
	[ComponentSize.XS]: 28,
	[ComponentSize.SM]: 32,
	[ComponentSize.MD]: 40,
	[ComponentSize.LG]: 44,
	[ComponentSize.XL]: 48
};

const ids = ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success', 'select'] as const;

function heightOf(id: string): number {
	const element = document.getElementById(id);
	if (!element) throw new Error(`#${id} not rendered`);
	return element.getBoundingClientRect().height;
}

describe('control heights', () => {
	test.for(Object.keys(expectedHeights))('every control is the same height at size %s', (size) => {
		render(ControlHeightsHarness, { size: size as ComponentSize });

		const measured = Object.fromEntries(ids.map((id) => [id, heightOf(id)]));
		const expected = Object.fromEntries(ids.map((id) => [id, expectedHeights[size]]));

		// Compared as one object so a failure reports every control at once.
		expect(measured).toEqual(expected);
	});

	test('a wrapping label still grows the button past the minimum', () => {
		// Padding was tightened to hit the nominal height; buttons must still
		// expand for labels that wrap rather than clipping them.
		render(ControlHeightsHarness, { size: ComponentSize.MD, longLabel: true });

		expect(heightOf('primary')).toBeGreaterThan(expectedHeights[ComponentSize.MD]!);
	});
});
