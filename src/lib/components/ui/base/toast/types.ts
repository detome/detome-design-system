import type { StatusVariant } from '../enums';

export interface ToastData {
	id: string;
	variant?: StatusVariant;
	message?: string;
}
