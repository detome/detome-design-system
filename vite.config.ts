import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, type Plugin } from 'vite';
import { playwright } from '@vitest/browser-playwright';

// Vitest's browser mode runs Svelte/bits-ui in an actual browser, so module
// resolution needs the "browser" package export condition (matches bits-ui's
// own test setup: https://github.com/huntabyte/bits-ui/blob/main/tests/vite.config.ts).
const vitestBrowserConditionPlugin: Plugin = {
	name: 'vitest-browser-condition',
	config({ resolve }) {
		if (process.env.VITEST) {
			resolve ??= {};
			resolve.conditions = ['browser', ...(resolve.conditions ?? [])];
		}
	}
};

/** @type {import('vite').UserConfig} */
const config = defineConfig({
	plugins: [sveltekit() as any, tailwindcss(), vitestBrowserConditionPlugin],
	test: {
		include: ['tests/**/*.browser.test.ts'],
		setupFiles: ['vitest-browser-svelte', './tests/setup.ts'],
		browser: {
			enabled: true,
			headless: true,
			provider: playwright(),
			instances: [{ browser: 'chromium' }]
		}
	}
});

export default config;
