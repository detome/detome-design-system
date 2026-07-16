import { expect, test, describe, afterEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { Select } from '$lib';
import SelectRowHarness from './SelectRowHarness.svelte';

/**
 * The trigger's label, measured in a real browser with real Tailwind.
 *
 * The trigger is a fixed `h-*` (unlike Button, which is `min-h-*` precisely
 * because its label may wrap). That height is only safe while the label really
 * is one line, so these cover what happens when it's squeezed narrower than its
 * own text — in a toolbar row, and at a width the caller pinned.
 */

/** Height of one line of the trigger's label, in px, at the default size. */
const LINE_HEIGHT = 20;

/** A row too narrow for its selects: measured to wrap the labels if they can. */
const SQUEEZED_ROW = 200;

afterEach(() => {
	document.body.innerHTML = '';
});

function trigger(id: string): HTMLElement {
	const element = document.getElementById(id);
	if (!element) throw new Error(`#${id} not rendered`);
	return element;
}

/** The span the trigger renders its selected option's label into. */
function label(id: string): HTMLElement {
	const span = trigger(id).querySelector('span');
	if (!span) throw new Error(`#${id} has no label span`);
	return span;
}

describe('Select label rendering', () => {
	test('keeps a squeezed label on one line', () => {
		// Left to wrap, "Move to" collapses to the width of "Move" and breaks over
		// two lines. The second one falls outside a trigger that can't grow, which
		// is what "the label is cut off" looks like on screen.
		render(SelectRowHarness, { width: SQUEEZED_ROW });

		const span = label('action-select');
		expect(span.textContent?.trim()).toBe('Move to');
		expect(span.getBoundingClientRect().height).toBe(LINE_HEIGHT);
	});

	test('does not spill a squeezed label outside the trigger', () => {
		render(SelectRowHarness, { width: SQUEEZED_ROW });

		const element = trigger('action-select');
		expect(element.scrollHeight).toBeLessThanOrEqual(element.clientHeight);
		expect(element.scrollWidth).toBeLessThanOrEqual(element.clientWidth);
	});

	test('keeps the neighbouring select in the row readable too', () => {
		// One squeezed select doesn't get to be fixed at the next one's expense.
		render(SelectRowHarness, { width: SQUEEZED_ROW });

		const span = label('state-select');
		expect(span.textContent?.trim()).toBe('In Progress');
		expect(span.getBoundingClientRect().height).toBe(LINE_HEIGHT);
	});

	test('holds a caller-fixed width against an over-long label', () => {
		// Filter bars pin selects to a width so the row stays aligned, and their
		// labels can come from data (audit log actions), so length is unbounded.
		// Such a label has to give way to the width, not the other way round.
		render(Select, {
			id: 'fixed-select',
			class: 'w-48',
			options: [{ value: 'a', label: 'Organization membership updated by administrator' }],
			value: 'a'
		});

		const element = trigger('fixed-select');
		expect(element.getBoundingClientRect().width).toBe(192);
		expect(element.scrollWidth).toBeLessThanOrEqual(element.clientWidth);
	});

	test('ellipsises an over-long label instead of clipping it mid-glyph', () => {
		render(Select, {
			id: 'fixed-select',
			class: 'w-48',
			options: [{ value: 'a', label: 'Organization membership updated by administrator' }],
			value: 'a'
		});

		const span = label('fixed-select');
		expect(getComputedStyle(span).textOverflow).toBe('ellipsis');
		expect(span.getBoundingClientRect().height).toBe(LINE_HEIGHT);
	});
});
