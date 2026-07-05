<script lang="ts">
	import { ModalSize, ComponentSize } from '$lib/components/ui/base/enums';
	import {
		Button,
		Card,
		Badge,
		Input,
		Label,
		Textarea,
		Select,
		Checkbox,
		Switch,
		Modal,
		AlertDialog,
		Alert,
		Table,
		TableHead,
		TableHeadCell,
		TableBody,
		TableBodyRow,
		TableBodyCell,
		Dropdown,
		DropdownItem,
		DropdownDivider,
		Tabs,
		TabsList,
		TabsTrigger,
		TabsContent,
		Accordion,
		AccordionItem,
		Tooltip,
		Popover,
		Drawer,
		DateRangePicker,
		Datepicker,
		Toast,
		Progressbar,
		Spinner,
		DetomeLogo,
		DetomeLogoLight,
		DetomeLogoDark,
		DetomeIcon,
		DetomeIconLight,
		DetomeIconDark
	} from '$lib/components/ui/base';
	import {
		CircleCheckBig,
		CircleX,
		TriangleAlert,
		Info,
		Save,
		SquarePen,
		Trash,
		Download,
		Settings,
		User,
		Mail,
		Lock,
		Search,
		ChevronDown,
		Plus,
		X,
		Calendar,
		ChevronLeft,
		ChevronRight
	} from '@lucide/svelte';

	let modalSmOpen = $state(false);
	let modalMdOpen = $state(false);
	let modalLgOpen = $state(false);
	let modalXlOpen = $state(false);
	let modalFullOpen = $state(false);
	let alertDialogOpen = $state(false);
	let inputValue = $state('');
	let textareaValue = $state('');
	let selectValue = $state('option1');
	let checkboxValue = $state(false);
	let switchValue = $state(false);
	let dateValue = $state<{ start?: Date; end?: Date }>({ start: new Date() });
	let singleDateValue = $state<Date | undefined>();
	let drawerOpen = $state(false);
	let drawerRightOpen = $state(false);
	let dropdownOpen = $state(false);

	const selectOptions = [
		{ value: 'option1', label: 'Option 1' },
		{ value: 'option2', label: 'Option 2' },
		{ value: 'option3', label: 'Option 3' }
	];
</script>

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
	<header class="mb-8">
		<h1 class="text-4xl font-bold text-gray-900 dark:text-gray-50">Detome Design System</h1>
		<p class="mt-2 text-base text-gray-500 dark:text-gray-400">
			Professional, customizable UI components built with Svelte 5, Tailwind CSS, and bits-ui
		</p>

		<nav class="mt-6 flex flex-wrap gap-2">
			<a
				href="#colors"
				class="bg-primary-100 text-primary-700 hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800 rounded-full px-3 py-1 text-sm font-medium">
				Colors
			</a>
			<a
				href="#buttons"
				class="bg-primary-100 text-primary-700 hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800 rounded-full px-3 py-1 text-sm font-medium">
				Buttons
			</a>
			<a
				href="#forms"
				class="bg-primary-100 text-primary-700 hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800 rounded-full px-3 py-1 text-sm font-medium">
				Forms
			</a>
			<a
				href="#alerts"
				class="bg-primary-100 text-primary-700 hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800 rounded-full px-3 py-1 text-sm font-medium">
				Alerts
			</a>
			<a
				href="#modal"
				class="bg-primary-100 text-primary-700 hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800 rounded-full px-3 py-1 text-sm font-medium">
				Modal
			</a>
			<a
				href="#overlays"
				class="bg-primary-100 text-primary-700 hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800 rounded-full px-3 py-1 text-sm font-medium">
				Overlays
			</a>
			<a
				href="#tabs"
				class="bg-primary-100 text-primary-700 hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800 rounded-full px-3 py-1 text-sm font-medium">
				Tabs
			</a>
			<a
				href="#brand"
				class="bg-primary-100 text-primary-700 hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800 rounded-full px-3 py-1 text-sm font-medium">
				Brand
			</a>
		</nav>
	</header>

	<div class="space-y-12">
		<section id="colors">
			<h2 class="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-50">Color Palette</h2>

			<div class="space-y-6">
				<Card variant="default">
					<h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
						Primary - Deep Slate Blue
					</h3>
					<div class="grid grid-cols-5 gap-2 sm:grid-cols-10">
						<div class="text-center">
							<div class="bg-primary-50 h-16 rounded-md border border-gray-200"></div>
							<p class="mt-1 text-xs text-gray-600 dark:text-gray-400">50</p>
						</div>
						<div class="text-center">
							<div class="bg-primary-100 h-16 rounded-md"></div>
							<p class="mt-1 text-xs text-gray-600 dark:text-gray-400">100</p>
						</div>
						<div class="text-center">
							<div class="bg-primary-200 h-16 rounded-md"></div>
							<p class="mt-1 text-xs text-gray-600 dark:text-gray-400">200</p>
						</div>
						<div class="text-center">
							<div class="bg-primary-300 h-16 rounded-md"></div>
							<p class="mt-1 text-xs text-gray-600 dark:text-gray-400">300</p>
						</div>
						<div class="text-center">
							<div class="bg-primary-400 h-16 rounded-md"></div>
							<p class="mt-1 text-xs text-gray-600 dark:text-gray-400">400</p>
						</div>
						<div class="text-center">
							<div class="bg-primary-500 h-16 rounded-md"></div>
							<p class="mt-1 text-xs text-gray-600 dark:text-gray-400">500</p>
						</div>
						<div class="text-center">
							<div class="bg-primary-600 h-16 rounded-md"></div>
							<p class="mt-1 text-xs text-white">600</p>
						</div>
						<div class="text-center">
							<div class="bg-primary-700 h-16 rounded-md"></div>
							<p class="mt-1 text-xs text-white">700</p>
						</div>
						<div class="text-center">
							<div class="bg-primary-800 h-16 rounded-md"></div>
							<p class="mt-1 text-xs text-white">800</p>
						</div>
						<div class="text-center">
							<div class="bg-primary-900 h-16 rounded-md"></div>
							<p class="mt-1 text-xs text-white">900</p>
						</div>
					</div>
				</Card>
			</div>
		</section>

		<section id="buttons">
			<h2 class="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-50">Buttons</h2>

			<div class="space-y-6">
				<Card variant="default">
					<h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Variants</h3>
					<div class="flex flex-wrap gap-3">
						<Button variant="primary">Primary</Button>
						<Button variant="secondary">Secondary</Button>
						<Button variant="outline">Outline</Button>
						<Button variant="ghost">Ghost</Button>
						<Button variant="danger">Danger</Button>
						<Button variant="success">Success</Button>
					</div>
				</Card>

				<Card variant="default">
					<h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Sizes</h3>
					<div class="flex flex-wrap items-center gap-3">
						<Button size={ComponentSize.XS}>Extra Small</Button>
						<Button size={ComponentSize.SM}>Small</Button>
						<Button size={ComponentSize.MD}>Medium</Button>
						<Button size={ComponentSize.LG}>Large</Button>
						<Button size={ComponentSize.XL}>Extra Large</Button>
					</div>
				</Card>

				<Card variant="default">
					<h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">States</h3>
					<div class="flex flex-wrap gap-3">
						<Button variant="primary">Normal</Button>
						<Button variant="primary" loading>Loading</Button>
						<Button variant="primary" disabled>Disabled</Button>
						<Button variant="primary" fullWidth>Full Width</Button>
					</div>
				</Card>

				<Card variant="default">
					<h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">As Links</h3>
					<div class="flex flex-wrap gap-3">
						<Button variant="primary" href="#buttons">Primary Link</Button>
						<Button variant="secondary" href="#forms">Secondary Link</Button>
						<Button variant="outline" href="https://github.com" target="_blank" rel="noopener">
							External Link
						</Button>
					</div>
					<p class="mt-3 text-sm text-gray-500 dark:text-gray-400">
						Buttons with `href` render as anchor tags - Test by clicking above
					</p>
				</Card>
			</div>
		</section>

		<section id="forms">
			<h2 class="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-50">Form Components</h2>

			<div class="space-y-6">
				<Card variant="default">
					<h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Inputs</h3>
					<div class="space-y-4">
						<div>
							<Label for="input-basic">Basic Input</Label>
							<Input id="input-basic" bind:value={inputValue} placeholder="Enter text..." />
						</div>

						<div>
							<Label for="input-icon-left">Input with Left Icon</Label>
							<Input id="input-icon-left" placeholder="Search...">
								{#snippet left()}
									<Search class="h-4 w-4" />
								{/snippet}
							</Input>
						</div>

						<div>
							<Label for="input-error">Input with Error</Label>
							<Input id="input-error" error="This field is required" />
						</div>
					</div>
				</Card>

				<Card variant="default">
					<h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
						Other Form Controls
					</h3>
					<div class="space-y-4">
						<div>
							<Label for="select">Select</Label>
							<Select id="select" bind:value={selectValue} options={selectOptions} />
						</div>

						<div class="flex items-center gap-6">
							<div class="flex items-center gap-2">
								<Checkbox id="checkbox" bind:checked={checkboxValue} />
								<Label for="checkbox">Checkbox</Label>
							</div>

							<div class="flex items-center gap-2">
								<Switch id="switch" bind:checked={switchValue} />
								<Label for="switch">Switch</Label>
							</div>
						</div>
					</div>
				</Card>
			</div>
		</section>

		<section id="alerts">
			<h2 class="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-50">Alerts</h2>

			<div class="space-y-4">
				<Alert variant="info">
					{#snippet icon()}
						<Info class="h-5 w-5" />
					{/snippet}
					This is an informational alert with additional context.
				</Alert>

				<Alert variant="success">
					{#snippet icon()}
						<CircleCheckBig class="h-5 w-5" />
					{/snippet}
					Operation completed successfully!
				</Alert>

				<Alert variant="warning">
					{#snippet icon()}
						<TriangleAlert class="h-5 w-5" />
					{/snippet}
					Please review this important warning before proceeding.
				</Alert>

				<Alert variant="error" dismissible>
					{#snippet icon()}
						<CircleX class="h-5 w-5" />
					{/snippet}
					An error occurred. This alert is dismissible.
				</Alert>
			</div>
		</section>

		<section id="modal">
			<h2 class="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-50">Modal Sizes</h2>

			<Card variant="default">
				<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
					<Button variant="outline" onclick={() => (modalSmOpen = true)}>SM Modal</Button>
					<Button variant="outline" onclick={() => (modalMdOpen = true)}>MD Modal</Button>
					<Button variant="outline" onclick={() => (modalLgOpen = true)}>LG Modal</Button>
					<Button variant="outline" onclick={() => (modalXlOpen = true)}>XL Modal</Button>
					<Button variant="outline" onclick={() => (modalFullOpen = true)}>Full Modal</Button>
				</div>

				<Modal bind:open={modalSmOpen} title="Small Modal" size={ModalSize.SM}>
					<p class="text-sm text-gray-700 dark:text-gray-200">
						This is a SM (Small) modal with max-width of 384px. Perfect for compact dialogs and
						confirmations.
					</p>
					{#snippet footer()}
						<Button variant="outline" onclick={() => (modalSmOpen = false)}>Cancel</Button>
						<Button variant="primary" onclick={() => (modalSmOpen = false)}>Confirm</Button>
					{/snippet}
				</Modal>

				<Modal bind:open={modalMdOpen} title="Medium Modal" size={ModalSize.MD}>
					<p class="text-gray-700 dark:text-gray-200">
						This is a MD (Medium) modal with max-width of 448px. This is the default modal size and
						works well for most use cases.
					</p>
					{#snippet footer()}
						<Button variant="outline" onclick={() => (modalMdOpen = false)}>Cancel</Button>
						<Button variant="primary" onclick={() => (modalMdOpen = false)}>Confirm</Button>
					{/snippet}
				</Modal>

				<Modal bind:open={modalLgOpen} title="Large Modal" size={ModalSize.LG}>
					<p class="text-gray-700 dark:text-gray-200">
						This is a LG (Large) modal with max-width of 512px. Good for forms with multiple fields
						or content that needs more breathing room.
					</p>
					{#snippet footer()}
						<Button variant="outline" onclick={() => (modalLgOpen = false)}>Cancel</Button>
						<Button variant="primary" onclick={() => (modalLgOpen = false)}>Confirm</Button>
					{/snippet}
				</Modal>

				<Modal bind:open={modalXlOpen} title="Extra Large Modal" size={ModalSize.XL}>
					<p class="text-gray-700 dark:text-gray-200">
						This is an XL (Extra Large) modal with max-width of 576px. Useful for content-dense
						dialogs like multi-column forms.
					</p>
					{#snippet footer()}
						<Button variant="outline" onclick={() => (modalXlOpen = false)}>Cancel</Button>
						<Button variant="primary" onclick={() => (modalXlOpen = false)}>Confirm</Button>
					{/snippet}
				</Modal>

				<Modal bind:open={modalFullOpen} title="Full Screen Modal" size={ModalSize.FULL}>
					<p class="text-gray-700 dark:text-gray-200">
						This is a Full modal that spans nearly the entire viewport. Best for immersive workflows
						or complex editors.
					</p>
					{#snippet footer()}
						<Button variant="outline" onclick={() => (modalFullOpen = false)}>Cancel</Button>
						<Button variant="primary" onclick={() => (modalFullOpen = false)}>Confirm</Button>
					{/snippet}
				</Modal>
			</Card>
		</section>

		<section id="alert-dialog">
			<h2 class="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-50">Alert Dialog</h2>

			<Card variant="default">
				<Button variant="danger" onclick={() => (alertDialogOpen = true)}>Delete Account</Button>

				<AlertDialog
					bind:open={alertDialogOpen}
					variant="error"
					title="Delete Account"
					description="This action cannot be undone. All of your data will be permanently removed."
					confirmText="Delete"
					onConfirm={() => (alertDialogOpen = false)} />
			</Card>
		</section>

		<section id="overlays">
			<h2 class="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-50">Overlays</h2>

			<div class="space-y-6">
				<Card variant="default">
					<h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Popover</h3>
					<Popover>
						{#snippet trigger({ props })}
							<Button variant="outline" {...props}>Open Popover</Button>
						{/snippet}
						<div class="w-64">
							<h4 class="text-sm font-semibold text-gray-900 dark:text-white">Popover Title</h4>
							<p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
								Rich, interactive content that stays open until you click outside or press Escape.
							</p>
						</div>
					</Popover>
				</Card>

				<Card variant="default">
					<h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Drawer</h3>
					<div class="flex flex-wrap gap-3">
						<Button variant="outline" onclick={() => (drawerOpen = true)}>Open Left Drawer</Button>
						<Button variant="outline" onclick={() => (drawerRightOpen = true)}>
							Open Right Drawer
						</Button>
					</div>

					<Drawer bind:open={drawerOpen} placement="left">
						<h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Left Drawer</h3>
						<p class="text-sm text-gray-600 dark:text-gray-400">
							Slides in from the left edge of the viewport with a backdrop.
						</p>
						<div class="mt-6">
							<Button variant="outline" onclick={() => (drawerOpen = false)}>Close</Button>
						</div>
					</Drawer>

					<Drawer bind:open={drawerRightOpen} placement="right">
						<h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Right Drawer</h3>
						<p class="text-sm text-gray-600 dark:text-gray-400">
							Slides in from the right edge of the viewport with a backdrop.
						</p>
						<div class="mt-6">
							<Button variant="outline" onclick={() => (drawerRightOpen = false)}>Close</Button>
						</div>
					</Drawer>
				</Card>
			</div>
		</section>

		<section id="tabs">
			<h2 class="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-50">Tabs</h2>

			<Card variant="default">
				<Tabs value="tab1">
					<TabsList>
						<TabsTrigger value="tab1">Overview</TabsTrigger>
						<TabsTrigger value="tab2">Settings</TabsTrigger>
						<TabsTrigger value="tab3">Advanced</TabsTrigger>
					</TabsList>

					<TabsContent value="tab1">
						<div class="py-4">
							<h4 class="text-lg font-semibold text-gray-900 dark:text-white">Overview</h4>
							<p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
								This is the overview tab content. It contains general information and statistics.
							</p>
						</div>
					</TabsContent>

					<TabsContent value="tab2">
						<div class="py-4">
							<h4 class="text-lg font-semibold text-gray-900 dark:text-white">Settings</h4>
							<p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
								Configure your preferences and options in this section.
							</p>
						</div>
					</TabsContent>

					<TabsContent value="tab3">
						<div class="py-4">
							<h4 class="text-lg font-semibold text-gray-900 dark:text-white">Advanced</h4>
							<p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
								Advanced configuration options for power users.
							</p>
						</div>
					</TabsContent>
				</Tabs>
			</Card>
		</section>

		<section id="brand">
			<h2 class="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-50">Brand Assets</h2>

			<div class="space-y-6">
				<Card variant="default">
					<h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
						Auto-switching (follows theme)
					</h3>
					<p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
						<code>&lt;DetomeLogo /&gt;</code>
						and
						<code>&lt;DetomeIcon /&gt;</code>
						render the light variant by default and swap to dark when a
						<code>.dark</code>
						class is present.
					</p>
					<div class="flex flex-wrap items-center gap-8">
						<DetomeLogo size="xl" />
						<DetomeIcon size="xl" />
					</div>
				</Card>

				<Card variant="default">
					<h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
						Explicit variants
					</h3>
					<div class="grid gap-4 sm:grid-cols-2">
						<div class="rounded-lg border border-gray-200 bg-gray-50 p-6">
							<p class="mb-3 text-xs font-medium tracking-wide text-gray-500 uppercase">
								Light backgrounds
							</p>
							<div class="flex flex-wrap items-center gap-6">
								<DetomeLogoLight size="lg" />
								<DetomeIconLight size="lg" />
							</div>
						</div>
						<div class="bg-primary-900 rounded-lg p-6">
							<p class="text-primary-300 mb-3 text-xs font-medium tracking-wide uppercase">
								Dark backgrounds
							</p>
							<div class="flex flex-wrap items-center gap-6">
								<DetomeLogoDark size="lg" />
								<DetomeIconDark size="lg" />
							</div>
						</div>
					</div>
				</Card>

				<Card variant="default">
					<h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Sizes</h3>
					<div class="flex flex-wrap items-end gap-6">
						<div class="flex flex-col items-center gap-2">
							<DetomeIcon size="sm" />
							<span class="text-xs text-gray-500">sm</span>
						</div>
						<div class="flex flex-col items-center gap-2">
							<DetomeIcon size="md" />
							<span class="text-xs text-gray-500">md</span>
						</div>
						<div class="flex flex-col items-center gap-2">
							<DetomeIcon size="lg" />
							<span class="text-xs text-gray-500">lg</span>
						</div>
						<div class="flex flex-col items-center gap-2">
							<DetomeIcon size="xl" />
							<span class="text-xs text-gray-500">xl</span>
						</div>
					</div>
				</Card>
			</div>
		</section>
	</div>
</div>
