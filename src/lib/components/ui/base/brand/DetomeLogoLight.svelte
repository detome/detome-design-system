<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import logoUrl from './detome-logo-light.svg';

	/**
	 * Detome wordmark logo for use on light backgrounds.
	 * Espresso text with cognac accent on a transparent background.
	 *
	 * The SVG is imported from `detome-logo-light.svg` (single source of truth).
	 * Both the dark and light wordmarks share an identical aspect ratio, so
	 * switching themes produces no layout shift.
	 *
	 * @example Default size
	 * ```svelte
	 * <DetomeLogoLight />
	 * ```
	 *
	 * @example Large
	 * ```svelte
	 * <DetomeLogoLight size="xl" />
	 * ```
	 *
	 * @example Custom size via class
	 * ```svelte
	 * <DetomeLogoLight class="h-16" />
	 * ```
	 *
	 * @example Decorative (hide from screen readers)
	 * ```svelte
	 * <DetomeLogoLight alt="" />
	 * ```
	 *
	 * @param {'sm' | 'md' | 'lg' | 'xl' | string} size - Logo size (height-based; width scales by aspect ratio).
	 *   Named sizes: 'sm' (16px), 'md' (24px), 'lg' (32px), 'xl' (48px). Default: 'md'.
	 *   Any other string is applied as a Tailwind class (e.g. 'h-20').
	 * @param {string} alt - Alt text for accessibility. Default: 'detome'.
	 *   Pass an empty string (`alt=""`) when paired with visible text.
	 * @param {string} class - Additional CSS classes to apply.
	 *
	 * @see {@link DetomeLogoDark} - For dark backgrounds.
	 * @see {@link DetomeLogo} - Auto-switching wrapper.
	 *
	 * @accessibility
	 * - Rendered as an `<img>` with `alt="detome"` by default.
	 * - Pass `alt=""` (or `aria-hidden="true"`) when paired with visible text.
	 */
	interface Props {
		size?: 'sm' | 'md' | 'lg' | 'xl' | string;
		class?: string;
		alt?: string;
	}

	let { size: sizeProp = 'md', class: className, alt = 'detome', ...restProps }: Props = $props();

	const sizes: Record<string, string> = {
		sm: 'h-4',
		md: 'h-6',
		lg: 'h-8',
		xl: 'h-12'
	};

	const sizeClass = $derived(sizes[sizeProp] ?? sizeProp);
	const computedClass = $derived(cn(sizeClass, 'w-auto', className));
</script>

<img src={logoUrl} {alt} class={computedClass} {...restProps} />
