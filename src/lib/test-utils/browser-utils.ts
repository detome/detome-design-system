import type { Locator } from 'vitest/browser';
import { expect, vi } from 'vitest';

/** Waits for a locator to be removed from the DOM (e.g. after `{#if open}` closes). */
export async function expectNotExists(loc: Locator) {
	await vi.waitFor(() => expect(() => loc.element()).toThrow());
}

/** Waits for a locator to be mounted in the DOM. */
export async function expectExists(loc: Locator) {
	await expect.element(loc).toBeInTheDocument();
}
