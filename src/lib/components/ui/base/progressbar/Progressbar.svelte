<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { ComponentSize, AccentVariant } from '../enums';
	import type { AccentVariantType } from '../enums';

	/**
	 * Progress bar component for displaying completion percentage.
	 * Supports multiple colors, sizes, and label positions.
	 *
	 * @example Basic progress
	 * ```svelte
	 * <Progressbar progress={50} />
	 * ```
	 *
	 * @example With success color
	 * ```svelte
	 * <Progressbar progress={75} color={AccentVariant.SUCCESS} />
	 * ```
	 *
	 * @example Small size with label outside
	 * ```svelte
	 * <Progressbar progress={30} size={ComponentSize.SM} labelOutside />
	 * ```
	 *
	 * @example Large size with label inside
	 * ```svelte
	 * <Progressbar progress={60} size={ComponentSize.LG} labelInside />
	 * ```
	 *
	 * @example Error progress
	 * ```svelte
	 * <Progressbar progress={90} color={AccentVariant.ERROR} labelOutside />
	 * ```
	 *
	 * @example Custom size
	 * ```svelte
	 * <Progressbar progress={45} size="h-1" />
	 * ```
	 *
	 * @param {number} progress - Percentage value (0-100). Default: 0
	 * @param {ComponentSize | string} size - Progress bar height. Default: ComponentSize.MD
	 *   Named: 'xs' (4px), 'sm' (6px), 'md' (10px), 'lg' (16px), 'xl' (24px)
	 *   Custom: pass Tailwind height class (e.g., 'h-1')
	 * @param {AccentVariant | AccentVariantType} color - Color variant. Default: AccentVariant.PRIMARY
	 *   Options: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
	 * @param {boolean} labelInside - If true, shows percentage inside bar. Default: false
	 * @param {boolean} labelOutside - If true, shows percentage above bar. Default: false
	 * @param {string} class - Additional CSS classes to apply
	 *
	 * @see {@link Spinner} - For loading indicators without progress
	 *
	 * @accessibility
	 * - ARIA: Should be wrapped with aria-label and aria-valuenow
	 * - Screen reader: Use labelInside or labelOutside for visibility
	 * - Smooth transition for visual updates
	 * - High contrast colors for all variants
	 */
	interface Props {
		progress?: number;
		size?: ComponentSize | string;
		color?: AccentVariant | AccentVariantType;
		labelInside?: boolean;
		labelOutside?: boolean;
		class?: string;
	}

	let {
		progress = 0,
		size = ComponentSize.MD,
		color = AccentVariant.PRIMARY,
		labelInside = false,
		labelOutside = false,
		class: className,
		...restProps
	}: Props = $props();

	const colorStyles: Record<AccentVariant, string> = {
		[AccentVariant.PRIMARY]: 'bg-primary-600 dark:bg-primary-500',
		[AccentVariant.SECONDARY]: 'bg-secondary-500 dark:bg-secondary-400',
		[AccentVariant.SUCCESS]: 'bg-success-600 dark:bg-success-500',
		[AccentVariant.ERROR]: 'bg-error-600 dark:bg-error-500',
		[AccentVariant.WARNING]: 'bg-warning-400 dark:bg-warning-300',
		[AccentVariant.INFO]: 'bg-info-600 dark:bg-info-500'
	};

	const sizeStyles: Record<string, string> = {
		[ComponentSize.XS]: 'h-1',
		[ComponentSize.SM]: 'h-1.5',
		[ComponentSize.MD]: 'h-2.5',
		[ComponentSize.LG]: 'h-4',
		[ComponentSize.XL]: 'h-6'
	};

	const sizeClass = $derived(sizeStyles[size] ?? size);
	const barBg = 'bg-gray-200 dark:bg-gray-700';
	const progressValue = $derived(Math.min(Math.max(progress, 0), 100));
</script>

<div class="w-full">
	{#if labelOutside}
		<div class="mb-1 flex justify-between">
			<span class="text-sm font-medium text-gray-700 dark:text-gray-300">{progressValue}%</span>
		</div>
	{/if}
	<div
		class={cn('w-full overflow-hidden rounded-full', barBg, sizeClass, className)}
		{...restProps}>
		<div
			class={cn('h-full transition-all duration-300', colorStyles[color] as string)}
			style="width: {progressValue}%">
			{#if labelInside && size === 'lg'}
				<span class="flex h-full items-center justify-center text-xs font-medium text-white">
					{progressValue}%
				</span>
			{/if}
		</div>
	</div>
</div>
