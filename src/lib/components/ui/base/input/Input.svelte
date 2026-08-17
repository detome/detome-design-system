<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { X } from '@lucide/svelte';
	import { LucideIconSize } from '../enums';
	import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	import { ComponentSize } from '$lib/components/ui/base/enums';
	import type { ComponentSizeType } from '$lib/components/ui/base/enums';

	/**
	 * Text input with error states, icon slots, and clearable functionality.
	 * Extends HTML input attributes for full compatibility.
	 *
	 * @example Basic usage
	 * <Input placeholder="Enter text..." bind:value={text} />
	 *
	 * @example With left icon
	 * <Input placeholder="Search...">
	 *   {#snippet left()}
	 *     <Search class="h-4 w-4" />
	 *   {/snippet}
	 * </Input>
	 *
	 * @example With error state
	 * <Input error="This field is required" bind:value={email} />
	 *
	 * @example Clearable input
	 * <Input clearable placeholder="Type something..." bind:value={search} />
	 *
	 * @example Small size
	 * <Input size={ComponentSize.SM} placeholder="Small input" />
	 *
	 * @param {ComponentSize | ComponentSizeType} size - Input size affecting height and padding. Default: ComponentSize.MD
	 *   Options: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
	 * @param {string} error - Error message to display below input. Triggers error styling
	 * @param {boolean} clearable - If true, shows X button to clear value when not empty. Default: false
	 * @param {Snippet} left - Left icon slot (displayed before input text)
	 * @param {Snippet} right - Right icon slot (displayed after input text)
	 * @param {string} class - Additional CSS classes to apply
	 * @param {string} value - Input value (bindable)
	 * @param {boolean} disabled - Disables input. Default: false
	 * @param {string} id - HTML id for label association
	 * @param {string} placeholder - Placeholder text
	 * @param {string} name - HTML name attribute
	 * @param {string} type - HTML input type. Default: 'text'
	 * @param {string} autocomplete - HTML autocomplete attribute
	 *
	 * @see {@link Label} - Use with Label for proper form structure
	 * @see {@link Helper} - Add helper text below input
	 *
	 * @accessibility
	 * - Requires Label with matching for/id for proper screen reader support
	 * - Error state announced to screen readers via aria-describedby
	 * - Keyboard navigation: Enter, Escape
	 * - Clearable button has proper aria-label
	 * - Visible focus ring for keyboard navigation
	 */
	interface Props extends Omit<HTMLInputAttributes, 'size'> {
		size?: ComponentSize | ComponentSizeType;
		error?: string;
		clearable?: boolean;
		left?: Snippet;
		right?: Snippet;
		class?: string;
		value?: string;
		disabled?: boolean;
		id?: string;
		placeholder?: string;
		name?: string;
		type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
		autocomplete?: HTMLInputAttributes['autocomplete'];
	}

	let {
		size = ComponentSize.MD,
		error,
		clearable = false,
		disabled = false,
		value = $bindable(),
		left,
		right,
		class: className,
		type = 'text',
		id,
		placeholder,
		name,
		autocomplete,
		...restProps
	}: Props = $props();

	const generatedErrorId = $props.id();
	const errorId = $derived(id ? `${id}-error` : generatedErrorId);

	const baseStyles =
		'w-full rounded-md border-[1.5px] bg-surface text-fg-default transition-all duration-200 placeholder:text-fg-faint focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 shadow-[0_1px_2px_0_rgb(0_0_0/0.02),inset_0_1px_2px_0_rgb(0_0_0/0.02)]';

	const sizes = {
		[ComponentSize.XS]: 'h-7 px-2.5 text-xs',
		[ComponentSize.SM]: 'h-8 px-3 text-sm',
		[ComponentSize.MD]: 'h-10 px-4 text-base',
		[ComponentSize.LG]: 'h-12 px-5 text-lg',
		[ComponentSize.XL]: 'h-14 px-6 text-xl'
	};

	const errorStyles = $derived(
		error
			? 'border-transparent shadow-[0_0_0_3px_rgba(220,38,38,0.1),0_2px_4px_0_rgb(220_38_38/0.1)] focus:border-transparent focus:bg-[linear-gradient(var(--color-surface),var(--color-surface))_padding-box,linear-gradient(90deg,rgb(220_38_38),rgb(239_68_68))_border-box] focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1),0_2px_4px_0_rgb(220_38_38/0.1)]'
			: 'border-border-strong focus:border-transparent focus:bg-[linear-gradient(var(--color-surface),var(--color-surface))_padding-box,linear-gradient(90deg,var(--color-primary-500),var(--color-accent-500))_border-box] focus:shadow-[0_0_0_3px_rgba(57,97,145,0.1),0_2px_4px_0_rgb(0_0_0/0.04)]'
	);

	const computedClass = $derived(
		cn(
			baseStyles,
			sizes[size] as string,
			errorStyles,
			left && 'pl-10',
			(right || clearable) && 'pr-10',
			className
		)
	);

	function handleClear() {
		value = '';
	}
</script>

<div class="relative w-full">
	{#if left}
		<div class="text-fg-faint absolute top-1/2 left-3 -translate-y-1/2">
			{@render left()}
		</div>
	{/if}

	<input
		class={computedClass}
		bind:value
		{disabled}
		{type}
		{id}
		aria-describedby={error ? errorId : undefined}
		{placeholder}
		{name}
		{autocomplete}
		{...restProps} />

	{#if right}
		<div class="text-fg-faint absolute top-1/2 right-3 -translate-y-1/2">
			{@render right()}
		</div>
	{:else if clearable && value}
		<button
			type="button"
			class="text-fg-faint hover:text-fg-muted absolute top-1/2 right-3 -translate-y-1/2"
			onclick={handleClear}
			aria-label="Clear input">
			<X size={LucideIconSize.MD} />
		</button>
	{/if}
</div>

{#if error}
	<p id={errorId} class="text-error-600 dark:text-error-400 mt-1 text-sm">{error}</p>
{/if}
