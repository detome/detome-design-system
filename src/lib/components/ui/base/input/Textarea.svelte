<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	/**
	 * Multi-line text input with error state support.
	 * Extends HTML textarea attributes for full compatibility.
	 *
	 * @example Basic textarea
	 * ```svelte
	 * <Textarea placeholder="Enter your message..." bind:value={message} />
	 * ```
	 *
	 * @example With error state
	 * ```svelte
	 * <Textarea error="Message must be at least 10 characters" bind:value={message} />
	 * ```
	 *
	 * @example Custom rows
	 * ```svelte
	 * <Textarea rows={10} placeholder="Long form content" bind:value={description} />
	 * ```
	 *
	 * @example Disabled
	 * ```svelte
	 * <Textarea disabled placeholder="Disabled textarea" value="Can't edit this" />
	 * ```
	 *
	 * @param {string} error - Error message to display below textarea. Triggers error styling
	 * @param {string} class - Additional CSS classes to apply
	 * @param {boolean} disabled - Disables textarea. Default: false
	 * @param {string} value - Textarea value (bindable)
	 * @param {number} rows - Number of visible rows. Default: 4
	 *
	 * @see {@link Label} - Use with Label for proper form structure
	 * @see {@link Input} - Use Input for single-line text
	 * @see {@link Helper} - Add helper text below textarea
	 *
	 * @accessibility
	 * - Requires Label with matching for/id for proper screen reader support
	 * - Error state announced to screen readers via aria-describedby
	 * - Resizable with drag handle (visual indicator)
	 * - Keyboard navigation: Enter, Tab
	 * - Visible focus ring
	 */
	interface Props extends HTMLTextareaAttributes {
		error?: string;
		class?: string;
		id?: string;
	}

	let {
		error,
		disabled = false,
		value = $bindable(),
		class: className,
		id,
		rows = 4,
		...restProps
	}: Props = $props();

	const generatedErrorId = $props.id();
	const errorId = $derived(id ? `${id}-error` : generatedErrorId);

	const baseStyles =
		'w-full rounded-md border bg-white text-gray-900 transition-all duration-200 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:text-gray-100 px-4 py-3 text-base resize-y min-h-[100px]';

	const errorStyles = $derived(
		error ? 'border-error-500 focus-visible:ring-error-400' : 'border-gray-300 dark:border-gray-600'
	);

	const computedClass = $derived(cn(baseStyles, errorStyles, className));
</script>

<div class="w-full">
	<textarea
		class={computedClass}
		bind:value
		{disabled}
		{id}
		aria-describedby={error ? errorId : undefined}
		{rows}
		{...restProps}>
	</textarea>

	{#if error}
		<p id={errorId} class="text-error-600 dark:text-error-400 mt-1 text-sm">{error}</p>
	{/if}
</div>
