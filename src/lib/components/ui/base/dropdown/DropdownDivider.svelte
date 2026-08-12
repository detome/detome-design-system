<script lang="ts">
	import { DropdownMenu } from 'bits-ui';
	import { cn } from '$lib/utils/cn';

	/**
	 * Visual separator between dropdown sections.
	 * Wraps bits-ui.DropdownMenu.Separator.
	 *
	 * @example Basic usage
	 * ```svelte
	 * <Dropdown trigger={triggerSnippet}>
	 *   <DropdownItem>Action 1</DropdownItem>
	 *   <DropdownItem>Action 2</DropdownItem>
	 *   <DropdownDivider />
	 *   <DropdownHeader>More Options</DropdownHeader>
	 *   <DropdownItem>Action 3</DropdownItem>
	 * </Dropdown>
	 * ```
	 *
	 * @example Multiple dividers
	 * ```svelte
	 * <Dropdown trigger={triggerSnippet}>
	 *   <DropdownHeader>Edit</DropdownHeader>
	 *   <DropdownItem>Cut</DropdownItem>
	 *   <DropdownItem>Copy</DropdownItem>
	 *   <DropdownItem>Paste</DropdownItem>
	 *   <DropdownDivider />
	 *   <DropdownHeader>Format</DropdownHeader>
	 *   <DropdownItem>Bold</DropdownItem>
	 *   <DropdownItem>Italic</DropdownItem>
	 * </Dropdown>
	 * ```
	 *
	 * @param {string} class - Additional CSS classes to apply
	 *
	 * @see {@link Dropdown} - Parent dropdown component
	 * @see {@link DropdownHeader} - Use with dividers for section headers
	 *
	 * @accessibility
	 * - Decorative separator (not interactive)
	 * - Properly styled for visual grouping
	 */
	interface Props {
		class?: string;
	}

	let { class: className, ...restProps }: Props = $props();
</script>

<DropdownMenu.Separator class={cn('bg-border-default -mx-1 my-1 h-px', className)} {...restProps} />
