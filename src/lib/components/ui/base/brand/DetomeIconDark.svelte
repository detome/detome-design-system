<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import iconUrl from './detome-icon-dark.svg';

	/**
	 * Detome brand mark (the "d" icon) for use on dark backgrounds.
	 * White mark with blue accent on a transparent background.
	 *
	 * The SVG is imported from `detome-icon-dark.svg` (single source of truth).
	 *
	 * @example Default size
	 * ```svelte
	 * <DetomeIconDark />
	 * ```
	 *
	 * @example Large
	 * ```svelte
	 * <DetomeIconDark size="xl" />
	 * ```
	 *
	 * @example Custom size via class
	 * ```svelte
	 * <DetomeIconDark class="h-20 w-20" />
	 * ```
	 *
	 * @example Decorative (hide from screen readers)
	 * ```svelte
	 * <DetomeIconDark alt="" />
	 * ```
	 *
	 * @param {'sm' | 'md' | 'lg' | 'xl' | string} size - Icon size (square).
	 *   Named sizes: 'sm' (24px), 'md' (40px), 'lg' (64px), 'xl' (96px). Default: 'md'.
	 *   Any other string is applied as a Tailwind class (e.g. 'h-12 w-12').
	 * @param {string} alt - Alt text for accessibility. Default: 'detome'.
	 *   Pass an empty string (`alt=""`) when paired with visible text.
	 * @param {string} class - Additional CSS classes to apply.
	 *
	 * @see {@link DetomeIconLight} - For light backgrounds.
	 * @see {@link DetomeIcon} - Auto-switching wrapper.
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
		sm: 'h-6 w-6',
		md: 'h-10 w-10',
		lg: 'h-16 w-16',
		xl: 'h-24 w-24'
	};

	const sizeClass = $derived(sizes[sizeProp] ?? sizeProp);
	const computedClass = $derived(cn(sizeClass, className));
</script>

<img src={iconUrl} {alt} class={computedClass} {...restProps} />
