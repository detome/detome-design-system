<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import DetomeLogoLight from './DetomeLogoLight.svelte';
	import DetomeLogoDark from './DetomeLogoDark.svelte';

	/**
	 * Auto-switching Detome wordmark logo.
	 * Renders the light variant by default and the dark variant when a `.dark`
	 * class is present on a parent (typically `<html>`).
	 *
	 * Uses CSS stacking (both variants render, toggled via `hidden`/`dark:block`)
	 * so there is no runtime flash, no hydration mismatch, and it works in SSR.
	 *
	 * @example Default
	 * ```svelte
	 * <DetomeLogo />
	 * ```
	 *
	 * @example Sized
	 * ```svelte
	 * <DetomeLogo size="xl" />
	 * ```
	 *
	 * @param {'sm' | 'md' | 'lg' | 'xl' | string} size - Logo size. Default: 'md'.
	 * @param {string} alt - Alt text for accessibility. Default: 'detome'.
	 *   Pass an empty string (`alt=""`) when paired with visible text.
	 * @param {string} class - Additional CSS classes applied to both variants.
	 *
	 * @see {@link DetomeLogoLight} - Explicit light variant.
	 * @see {@link DetomeLogoDark} - Explicit dark variant.
	 *
	 * @accessibility
	 * - Only the visible variant is exposed to assistive tech (the hidden one uses display:none).
	 * - `alt="detome"` by default (override via props).
	 *
	 * @remarks The light and dark wordmarks share an identical aspect ratio, so
	 * theme switching produces no layout shift.
	 */
	interface Props {
		size?: 'sm' | 'md' | 'lg' | 'xl' | string;
		class?: string;
		alt?: string;
	}

	let { size = 'md', class: className, alt = 'detome', ...restProps }: Props = $props();
</script>

<DetomeLogoLight {size} {alt} class={cn('dark:hidden', className)} {...restProps} />
<DetomeLogoDark {size} {alt} class={cn('hidden dark:block', className)} {...restProps} />
