import { expect, test, describe } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { Select, ComponentSize } from '$lib';

/**
 * Select-specific sizing. The cross-component contract (Select matching Button
 * at the same size) lives in tests/sizing/ControlHeights.browser.test.ts.
 */

function heightOf(id: string): number {
	const element = document.getElementById(id);
	if (!element) throw new Error(`#${id} not rendered`);
	return element.getBoundingClientRect().height;
}

const options = [{ value: 'a', label: 'Option A' }];

describe('Select sizing', () => {
	test('defaults to the medium height it had before the size prop existed', () => {
		// Guards every existing usage: omitting `size` must not move anything.
		render(Select, { id: 'default-select', options, value: 'a' });

		expect(heightOf('default-select')).toBe(40);
	});

	test('grows as the size increases', () => {
		render(Select, { id: 'xs-select', options, value: 'a', size: ComponentSize.XS });
		const extraSmall = heightOf('xs-select');
		document.body.innerHTML = '';

		render(Select, { id: 'xl-select', options, value: 'a', size: ComponentSize.XL });

		expect(heightOf('xl-select')).toBeGreaterThan(extraSmall);
	});

	test('still honours a caller-supplied class', () => {
		render(Select, { id: 'classy-select', options, value: 'a', class: 'h-20' });

		expect(heightOf('classy-select')).toBe(80);
	});
});
