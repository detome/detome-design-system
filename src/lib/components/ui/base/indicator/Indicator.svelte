<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { BadgeVariant, ComponentSize, IndicatorPlacement } from '../enums';
	import type { BadgeVariantType, ComponentSizeType, IndicatorPlacementType } from '../enums';

	/**
	 * Status indicator badge for notifications, alerts, and status markers.
	 * Absolute positioned dot with variant colors and flexible sizing.
	 *
	 * @example Default indicator (top-right)
	 * ```svelte
	 * <div class="relative">
	 *   <Button>Notifications</Button>
	 *   <Indicator />
	 * </div>
	 * ```
	 *
	 * @example Success variant
	 * ```svelte
	 * <div class="relative">
	 *   <span>Online</span>
	 *   <Indicator variant="success" placement="right" />
	 * </div>
	 * ```
	 *
	 * @example Error with border
	 * ```svelte
	 * <div class="relative">
	 *   <Avatar />
	 *   <Indicator variant="error" border />
	 * </div>
	 * ```
	 *
	 * @example Large indicator
	 * ```svelte
	 * <div class="relative">
	 *   <Card>
	 *     <h3>Title</h3>
	 *   </Card>
	 *   <Indicator variant="warning" size="xl" />
	 * </div>
	 * ```
	 *
	 * @example Centered placement
	 * ```svelte
	 * <div class="relative">
	 *   <img src="avatar.jpg" alt="Avatar" />
	 *   <Indicator variant="success" placement="center" />
	 * </div>
	 * ```
	 *
	 * @example Small indicator
	 * ```svelte
	 * <div class="relative">
	 *   <Badge>Badge</Badge>
	 *   <Indicator size="xs" />
	 * </div>
	 * ```
	 *
	 * @param {BadgeVariant | BadgeVariantType} variant - Color variant. Default: BadgeVariant.DEFAULT
	 *   Options: 'success' | 'error' | 'warning' | 'info' | 'default' | 'primary' | 'secondary'
	 * @param {ComponentSize | ComponentSizeType} size - Indicator size. Default: ComponentSize.MD
	 *   Sizes: 'xs' (8px), 'sm' (10px), 'md' (12px), 'lg' (14px), 'xl' (24px)
	 * @param {IndicatorPlacement | IndicatorPlacementType} placement - Position relative to parent. Default: IndicatorPlacement.TOP_RIGHT
	 *   Options: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
	 * @param {boolean} border - If true, adds white ring border around indicator. Default: false
	 * @param {string} class - Additional CSS classes to apply
	 *
	 * @see {@link Badge} - For text-based badges
	 * @see {@link Avatar} - For user avatars with status indicators
	 *
	 * @accessibility
	 * - aria-hidden="true" for decorative markers
	 * - High contrast colors for visibility
	 * - Optional border for better visibility on colored backgrounds
	 * - Small footprint for subtle notifications
	 */
	interface Props {
		variant?: BadgeVariant | BadgeVariantType;
		size?: ComponentSize | ComponentSizeType;
		placement?: IndicatorPlacement | IndicatorPlacementType;
		border?: boolean;
		class?: string;
	}

	let {
		variant = BadgeVariant.DEFAULT,
		size = ComponentSize.MD,
		placement = IndicatorPlacement.TOP_RIGHT,
		border = false,
		class: className
	}: Props = $props();

	// Map variants to colors
	const variantColors: Record<BadgeVariant, string> = {
		[BadgeVariant.SUCCESS]: 'bg-success-500',
		[BadgeVariant.ERROR]: 'bg-error-500',
		[BadgeVariant.WARNING]: 'bg-warning-500',
		[BadgeVariant.INFO]: 'bg-info-500',
		[BadgeVariant.DEFAULT]: 'bg-gray-500',
		[BadgeVariant.PRIMARY]: 'bg-primary-500',
		[BadgeVariant.SECONDARY]: 'bg-secondary-500'
	};

	const sizes: Record<ComponentSize, string> = {
		[ComponentSize.XS]: 'h-2 w-2',
		[ComponentSize.SM]: 'h-2.5 w-2.5',
		[ComponentSize.MD]: 'h-3 w-3',
		[ComponentSize.LG]: 'h-3.5 w-3.5',
		[ComponentSize.XL]: 'h-6 w-6'
	};

	const placements: Record<IndicatorPlacement, string> = {
		[IndicatorPlacement.TOP_LEFT]: '-top-1 -left-1',
		[IndicatorPlacement.TOP_CENTER]: '-top-1 left-1/2 -translate-x-1/2',
		[IndicatorPlacement.TOP_RIGHT]: '-top-1 -right-1',
		[IndicatorPlacement.CENTER_LEFT]: 'top-1/2 -left-1 -translate-y-1/2',
		[IndicatorPlacement.CENTER]: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
		[IndicatorPlacement.CENTER_RIGHT]: 'top-1/2 -right-1 -translate-y-1/2',
		[IndicatorPlacement.BOTTOM_LEFT]: '-bottom-1 -left-1',
		[IndicatorPlacement.BOTTOM_CENTER]: '-bottom-1 left-1/2 -translate-x-1/2',
		[IndicatorPlacement.BOTTOM_RIGHT]: '-bottom-1 -right-1'
	};

	const baseStyles = 'absolute rounded-full';
	const borderStyles = $derived(border ? 'ring-2 ring-white dark:ring-gray-900' : '');
</script>

<span
	class={cn(
		baseStyles,
		sizes[size] as string,
		placements[placement] as string,
		variantColors[variant] as string,
		borderStyles,
		className
	)}
	aria-hidden="true">
</span>
