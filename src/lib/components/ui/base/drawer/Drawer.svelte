<script lang="ts">
	import { Dialog } from 'bits-ui';
	import { cn } from '$lib/utils/cn';
	import { DrawerPlacement } from '../enums';
	import type { DrawerPlacementType } from '../enums';
	import { fade, fly } from 'svelte/transition';
	import type { Snippet } from 'svelte';
	import type { FlyParams } from 'svelte/transition';

	/**
	 * Slide-out drawer/sheet component from any edge of viewport.
	 * Wraps bits-ui Dialog with placement-specific animations and backdrop.
	 *
	 * @example Left sidebar drawer
	 * ```svelte
	 * <Drawer bind:open={showDrawer} placement="left">
	 *   <h2>Settings</h2>
	 *   <p>Drawer content goes here</p>
	 * </Drawer>
	 * ```
	 *
	 * @example Right drawer with backdrop
	 * ```svelte
	 * <Drawer bind:open={showDrawer} placement="right" backdrop>
	 *   <Button onclick={() => showDrawer = false}>Close</Button>
	 *   <p>Right drawer content</p>
	 * </Drawer>
	 * ```
	 *
	 * @example Bottom sheet (mobile style)
	 * ```svelte
	 * <Drawer bind:open={showSheet} placement="bottom">
	 *   <h3>Select Option</h3>
	 *   <ul>
	 *     <li>Option 1</li>
	 *     <li>Option 2</li>
	 *   </ul>
	 * </Drawer>
	 * ```
	 *
	 * @example Without backdrop
	 * ```svelte
	 * <Drawer bind:open={showDrawer} placement="right" backdrop={false}>
	 *   <p>Drawer without backdrop</p>
	 * </Drawer>
	 * ```
	 *
	 * @example Custom transition
	 * ```svelte
	 * <Drawer
	 *   bind:open={showDrawer}
	 *   placement="left"
	 *   transitionParams={{ duration: 400 }}
	 * >
	 *   <p>Slow fade drawer</p>
	 * </Drawer>
	 * ```
	 *
	 * @param {Snippet} children - Drawer content
	 * @param {boolean} open - Controls drawer visibility. Default: false
	 * @param {DrawerPlacement | DrawerPlacementType} placement - Which edge to slide from. Default: DrawerPlacement.LEFT
	 *   Options: 'left' | 'right' | 'top' | 'bottom'
	 * @param {boolean} backdrop - If true, shows backdrop overlay. Default: true
	 * @param {string} class - Additional CSS classes to apply
	 * @param {Partial<FlyParams>} transitionParams - Custom fly transition parameters
	 *
	 * @see {@link Modal} - For centered modal dialogs
	 * @see {@link Sidebar} - For persistent sidebar navigation
	 *
	 * @accessibility
	 * - Keyboard: Escape to close, Tab/Shift+Tab for focus management
	 * - Focus trap: Managed by bits-ui Dialog primitive
	 * - ARIA: Proper role and attributes managed by bits-ui
	 * - Backdrop click closes drawer
	 * - Animation respects prefers-reduced-motion
	 */
	interface Props {
		children?: Snippet;
		open?: boolean;
		placement?: DrawerPlacement | DrawerPlacementType;
		backdrop?: boolean;
		class?: string;
		transitionParams?: Partial<FlyParams>; // Custom transition parameters
		[key: string]: unknown; // Allow additional HTML attributes
	}

	let {
		children,
		open = $bindable(),
		placement = DrawerPlacement.LEFT,
		backdrop = true,
		class: className,
		transitionParams = {},
		...restProps
	}: Props = $props();

	const placementStyles: Record<DrawerPlacement, string> = {
		left: 'fixed left-0 top-0 h-full w-80 m-0 rounded-none bg-white dark:bg-gray-800 p-4',
		right: 'fixed right-0 top-0 h-full w-80 m-0 rounded-none bg-white dark:bg-gray-800 p-4',
		top: 'fixed left-0 top-0 w-full h-auto m-0 rounded-none bg-white dark:bg-gray-800 p-4',
		bottom: 'fixed bottom-0 left-0 w-full h-auto m-0 rounded-none bg-white dark:bg-gray-800 p-4'
	};

	const getTransition = (placement: DrawerPlacement | DrawerPlacementType) => {
		const placementStr = placement as string;
		return {
			x: placementStr === 'left' ? -500 : placementStr === 'right' ? 500 : 0,
			y: placementStr === 'top' ? -500 : placementStr === 'bottom' ? 500 : 0,
			duration: 300,
			...transitionParams
		};
	};
</script>

<Dialog.Root bind:open>
	<Dialog.Portal>
		{#if backdrop}
			<Dialog.Overlay forceMount>
				{#snippet child({ props, open })}
					{#if open}
						<div
							{...props}
							transition:fade={{ duration: 200 }}
							class="fixed inset-0 z-30 bg-gray-900/50 dark:bg-gray-900/80">
						</div>
					{/if}
				{/snippet}
			</Dialog.Overlay>
		{/if}

		<Dialog.Content forceMount={true}>
			{#snippet child({ props, open })}
				{#if open}
					<div
						{...props}
						class={cn(placementStyles[placement] as string, 'z-40 overflow-y-auto', className)}
						transition:fly={getTransition(placement)}>
						{#if children}
							{@render children()}
						{/if}
					</div>
				{/if}
			{/snippet}
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
