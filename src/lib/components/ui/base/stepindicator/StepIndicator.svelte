<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Check } from '@lucide/svelte';
	import type { Snippet } from 'svelte';

	/**
	 * Step indicator for multi-step workflows and wizards.
	 * Visual progress tracker with numbered steps and connecting lines.
	 *
	 * @example Basic 3-step indicator
	 * ```svelte
	 * <StepIndicator currentStep={1} steps={['Step 1', 'Step 2', 'Step 3']} />
	 * ```
	 *
	 * @example With custom steps
	 * ```svelte
	 * <StepIndicator
	 *   currentStep={2}
	 *   steps={['Personal Info', 'Address', 'Confirmation']}
	 * />
	 * ```
	 *
	 * @example With glow effect
	 * ```svelte
	 * <StepIndicator currentStep={2} steps={['A', 'B', 'C']} glow />
	 * ```
	 *
	 * @example 5-step wizard
	 * ```svelte
	 * <StepIndicator
	 *   currentStep={3}
	 *   steps={['Upload', 'Process', 'Review', 'Approve', 'Complete']}
	 * />
	 * ```
	 *
	 * @example With custom step content
	 * ```svelte
	 * <StepIndicator currentStep={1} steps={['Step 1', 'Step 2']}>
	 *   {#snippet children({ step, label })}
	 *     <Icon class="h-4 w-4" />
	 *   {/snippet}
	 * </StepIndicator>
	 * ```
	 *
	 * @example With custom styling
	 * ```svelte
	 * <StepIndicator
	 *   currentStep={2}
	 *   steps={['Start', 'Middle', 'End']}
	 *   class="py-8"
	 * />
	 * ```
	 *
	 * @param {number} currentStep - Current active step (1-indexed). Default: 1
	 * @param {string[]} steps - Array of step labels. Default: ['Step 1', 'Step 2', 'Step 3']
	 * @param {boolean} glow - If true, adds glow effect to current step. Default: false
	 * @param {string} class - Additional CSS classes to apply
	 * @param {Snippet<[{step: number, label: string}]>} children - Custom step content snippet
	 *
	 * @see {@link Progressbar} - For linear progress without steps
	 * @see {@link Spinner} - For loading indicators
	 *
	 * @accessibility
	 * - Semantic ordered list (ol)
	 * - Visual distinction between completed, current, and pending steps
	 * - Checkmark icon for completed steps
	 * - High contrast colors
	 * - Screen reader announces current step position
	 */
	interface Props {
		currentStep?: number;
		steps?: string[];
		glow?: boolean;
		class?: string;
		children?: Snippet<[{ step: number; label: string }]>;
	}

	let {
		currentStep = 1,
		steps = ['Step 1', 'Step 2', 'Step 3'],
		glow = false,
		class: className,
		children
	}: Props = $props();

	function isCompleted(stepIndex: number): boolean {
		return stepIndex < currentStep - 1;
	}

	function isCurrent(stepIndex: number): boolean {
		return stepIndex === currentStep - 1;
	}
</script>

<ol class={cn('flex w-full items-center text-center text-sm font-medium', className)}>
	{#each steps as step, i}
		<li
			aria-current={isCurrent(i) ? 'step' : undefined}
			class={cn(
				'flex items-center',
				i < steps.length - 1 ? 'w-full' : '',
				i < steps.length - 1
					? "after:mx-6 after:inline-block after:h-1 after:w-full after:border-b-2 after:content-[''] md:after:mx-10"
					: '',
				isCompleted(i) || isCurrent(i)
					? 'after:border-primary-600 dark:after:border-primary-500'
					: 'after:border-gray-200 dark:after:border-gray-700'
			)}>
			<div class="flex w-full flex-col items-center">
				<span
					class={cn(
						'flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm',
						isCompleted(i)
							? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400'
							: isCurrent(i)
								? 'bg-primary-600 ring-primary-100 dark:bg-primary-500 dark:ring-primary-900 text-white ring-4'
								: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
						isCurrent(i) && glow ? 'shadow-primary-500/50 shadow-lg' : ''
					)}>
					{#if isCompleted(i)}
						<Check class="h-5 w-5" />
					{:else if children}
						{@render children({ step: i + 1, label: step })}
					{:else}
						{i + 1}
					{/if}
				</span>
				<span
					class={cn(
						'mt-2 hidden text-sm sm:inline-block',
						isCurrent(i)
							? 'text-primary-600 dark:text-primary-400 font-semibold'
							: isCompleted(i)
								? 'text-gray-700 dark:text-gray-300'
								: 'text-gray-500 dark:text-gray-400'
					)}>
					{step}
				</span>
			</div>
		</li>
	{/each}
</ol>
