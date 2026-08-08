/**
 * UI Component Enums
 *
 * Type-safe enums for component variants, sizes, and positioning.
 * Use these enums instead of string literals for better type safety and IDE autocomplete.
 *
 * @example
 * ```svelte
 * <Button variant={ButtonVariant.PRIMARY} size={ComponentSize.LG}>
 *   Click me
 * </Button>
 * ```
 */

// ============================================================================
// Component Variants
// ============================================================================

/**
 * Button component variants
 */
export enum ButtonVariant {
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
	OUTLINE = 'outline',
	GHOST = 'ghost',
	DANGER = 'danger',
	SUCCESS = 'success'
}

/**
 * Badge component variants
 */
export enum BadgeVariant {
	DEFAULT = 'default',
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
	SUCCESS = 'success',
	WARNING = 'warning',
	ERROR = 'error',
	INFO = 'info'
}

/**
 * Status variant for feedback components (Alert, Toast, AlertDialog, Helper)
 * Used for displaying status messages with semantic colors
 */
export enum StatusVariant {
	INFO = 'info',
	SUCCESS = 'success',
	WARNING = 'warning',
	ERROR = 'error'
}

/**
 * Accent variant for control components (Progressbar, Switch)
 * Used for control elements with semantic color accents
 */
export enum AccentVariant {
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
	SUCCESS = 'success',
	ERROR = 'error',
	WARNING = 'warning',
	INFO = 'info'
}

/**
 * Card component variants
 */
export enum CardVariant {
	DEFAULT = 'default',
	BORDERED = 'bordered',
	ELEVATED = 'elevated',
	FLAT = 'flat',
	GLASS = 'glass'
}

// ============================================================================
// Component Sizes
// ============================================================================

/**
 * Standard component size scale (xs, sm, md, lg, xl)
 * Used by Button, Badge, Input, and other form controls
 */
export enum ComponentSize {
	XS = 'xs',
	SM = 'sm',
	MD = 'md',
	LG = 'lg',
	XL = 'xl'
}

/**
 * Modal/Dialog size scale
 * Simplified to 5 essential sizes with XL being extra wide (1280px)
 */
export enum ModalSize {
	SM = 'sm',
	MD = 'md',
	LG = 'lg',
	XL = 'xl',
	FULL = 'full'
}

/**
 * Card padding scale
 */
export enum CardPadding {
	NONE = 'none',
	SM = 'sm',
	MD = 'md',
	LG = 'lg',
	XL = 'xl'
}

/**
 * Switch/Toggle component sizes
 */
export enum SwitchSize {
	SM = 'sm',
	MD = 'md',
	LG = 'lg'
}

// ============================================================================
// Typography
// ============================================================================

/**
 * Heading semantic tags (h1-h6)
 */
export enum HeadingTag {
	H1 = 'h1',
	H2 = 'h2',
	H3 = 'h3',
	H4 = 'h4',
	H5 = 'h5',
	H6 = 'h6'
}

/**
 * Text size scale
 */
export enum TextSize {
	XS = 'xs',
	SM = 'sm',
	BASE = 'base',
	LG = 'lg',
	XL = 'xl',
	XXL = '2xl',
	XXXL = '3xl'
}

/**
 * Font weight values
 */
export enum FontWeight {
	NORMAL = 'normal',
	MEDIUM = 'medium',
	SEMIBOLD = 'semibold',
	BOLD = 'bold'
}

/**
 * Text color semantic variants
 */
export enum TextColor {
	DEFAULT = 'default',
	MUTED = 'muted',
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
	SUCCESS = 'success',
	WARNING = 'warning',
	ERROR = 'error',
	INFO = 'info',
	BLUE = 'blue',
	GREEN = 'green',
	RED = 'red',
	YELLOW = 'yellow',
	PURPLE = 'purple'
}

// ============================================================================
// Positioning & Layout
// ============================================================================

/**
 * Positioning sides (for tooltips, popovers, dropdowns)
 */
export enum Side {
	TOP = 'top',
	RIGHT = 'right',
	BOTTOM = 'bottom',
	LEFT = 'left'
}

/**
 * Alignment options (for tooltips, popovers, dropdowns)
 */
export enum Align {
	START = 'start',
	CENTER = 'center',
	END = 'end'
}

/**
 * Drawer placement options
 */
export enum DrawerPlacement {
	LEFT = 'left',
	RIGHT = 'right',
	TOP = 'top',
	BOTTOM = 'bottom'
}

/**
 * Indicator placement (9 positions)
 */
export enum IndicatorPlacement {
	TOP_LEFT = 'top-left',
	TOP_CENTER = 'top-center',
	TOP_RIGHT = 'top-right',
	CENTER_LEFT = 'center-left',
	CENTER = 'center',
	CENTER_RIGHT = 'center-right',
	BOTTOM_LEFT = 'bottom-left',
	BOTTOM_CENTER = 'bottom-center',
	BOTTOM_RIGHT = 'bottom-right'
}

/**
 * Toast position on screen
 */
export enum ToastPosition {
	TOP_LEFT = 'top-left',
	TOP_CENTER = 'top-center',
	TOP_RIGHT = 'top-right',
	BOTTOM_LEFT = 'bottom-left',
	BOTTOM_CENTER = 'bottom-center',
	BOTTOM_RIGHT = 'bottom-right'
}

/**
 * Orientation for layout components
 */
export enum Orientation {
	HORIZONTAL = 'horizontal',
	VERTICAL = 'vertical'
}

// ============================================================================
// Type Aliases (for backward compatibility and convenience)
// ============================================================================

export type ButtonVariantType = `${ButtonVariant}`;
export type BadgeVariantType = `${BadgeVariant}`;
export type CardVariantType = `${CardVariant}`;
export type CardPaddingType = `${CardPadding}`;
export type ComponentSizeType = `${ComponentSize}`;
export type ModalSizeType = `${ModalSize}`;
export type SwitchSizeType = `${SwitchSize}`;
export type HeadingTagType = `${HeadingTag}`;
export type TextSizeType = `${TextSize}`;
export type FontWeightType = `${FontWeight}`;
export type SideType = `${Side}`;
export type AlignType = `${Align}`;
export type DrawerPlacementType = `${DrawerPlacement}`;
export type IndicatorPlacementType = `${IndicatorPlacement}`;
export type OrientationType = `${Orientation}`;
export type TextColorType = `${TextColor}`;
export type StatusVariantType = `${StatusVariant}`;
export type AccentVariantType = `${AccentVariant}`;
export type ToastPositionType = `${ToastPosition}`;
