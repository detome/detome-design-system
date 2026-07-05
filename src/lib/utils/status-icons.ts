import { CircleAlert, CircleCheckBig, Info, TriangleAlert, type LucideIcon } from '@lucide/svelte';
import { StatusVariant } from '$lib/components/ui/base/enums';

/**
 * Shared icon-per-variant map used by Toast, Alert, and AlertDialog so the
 * mapping stays in sync across all status-variant surfaces.
 */
export const statusIcons: Record<StatusVariant, LucideIcon> = {
	[StatusVariant.INFO]: Info,
	[StatusVariant.SUCCESS]: CircleCheckBig,
	[StatusVariant.WARNING]: TriangleAlert,
	[StatusVariant.ERROR]: CircleAlert
};
