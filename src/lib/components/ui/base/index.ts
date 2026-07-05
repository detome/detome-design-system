// Core wrapper components for the Detome design system

// Enum exports - Type-safe component variants and sizes
export * from './enums.js';

// Type exports
export type SizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Phase 1: Foundation
export { default as Button } from './button/Button.svelte';
export { default as ButtonGroup } from './button/ButtonGroup.svelte';
export { default as CloseButton } from './button/CloseButton.svelte';
export { default as Input } from './input/Input.svelte';
export { default as Textarea } from './input/Textarea.svelte';
export { default as Label } from './input/Label.svelte';
export { default as Card } from './card/Card.svelte';
export { default as Badge } from './badge/Badge.svelte';
export { default as Spinner } from './spinner/Spinner.svelte';

// Phase 2: Form Components
export { default as Select } from './select/Select.svelte';
export type { SelectOption } from './select/Select.svelte';
export { default as SelectItem } from './select/SelectItem.svelte';
export { default as Checkbox } from './checkbox/Checkbox.svelte';
export { default as Switch } from './switch/Switch.svelte';
export { default as RadioGroup } from './radio/RadioGroup.svelte';
export { default as RadioItem } from './radio/RadioItem.svelte';
export { default as Datepicker } from './datepicker/Datepicker.svelte';
export { default as DateRangePicker } from './datepicker/DateRangePicker.svelte';
export { default as Search } from './search/Search.svelte';

// Phase 3: Modals & Dialogs
export { default as Modal } from './modal/Modal.svelte';
export { default as AlertDialog } from './modal/AlertDialog.svelte';
export { default as Drawer } from './drawer/Drawer.svelte';
export { default as Hr } from './separator/Hr.svelte';

// Phase 4: Alerts & Toasts
export { default as Alert } from './alert/Alert.svelte';
export { default as Toast } from './toast/Toast.svelte';
export { default as ToastProvider } from './toast/ToastProvider.svelte';

// Phase 5: Navigation components
export { default as Sidebar } from './navigation/Sidebar.svelte';
export { default as SidebarWrapper } from './navigation/SidebarWrapper.svelte';
export { default as SidebarGroup } from './navigation/SidebarGroup.svelte';
export { default as SidebarItem } from './navigation/SidebarItem.svelte';
export { default as SidebarDropdown } from './navigation/SidebarDropdown.svelte';
export { default as Breadcrumb } from './breadcrumb/Breadcrumb.svelte';
export { default as BreadcrumbItem } from './breadcrumb/BreadcrumbItem.svelte';

// Phase 6: Complex Components (Tabs, Accordion, Tooltip, Dropdown)
export { default as Tabs } from './tabs/Tabs.svelte';
export { default as TabsList } from './tabs/TabsList.svelte';
export { default as TabsTrigger } from './tabs/TabsTrigger.svelte';
export { default as TabsContent } from './tabs/TabsContent.svelte';
export { default as Accordion } from './accordion/Accordion.svelte';
export { default as AccordionItem } from './accordion/AccordionItem.svelte';
export { default as Tooltip } from './tooltip/Tooltip.svelte';
export { default as Popover } from './popover/Popover.svelte';
export { default as Dropdown } from './dropdown/Dropdown.svelte';
export { default as DropdownItem } from './dropdown/DropdownItem.svelte';
export { default as DropdownLink } from './dropdown/DropdownLink.svelte';
export { default as DropdownDivider } from './dropdown/DropdownDivider.svelte';
export { default as DropdownHeader } from './dropdown/DropdownHeader.svelte';

// Table components
export { default as Table } from './table/Table.svelte';
export { default as TableHead } from './table/TableHead.svelte';
export { default as TableHeadCell } from './table/TableHeadCell.svelte';
export { default as TableBody } from './table/TableBody.svelte';
export { default as TableBodyRow } from './table/TableBodyRow.svelte';
export { default as TableBodyCell } from './table/TableBodyCell.svelte';

// Typography components
export { default as Heading } from './typography/Heading.svelte';
export { default as P } from './typography/P.svelte';
export { default as A } from './typography/A.svelte';
export { default as Blockquote } from './typography/Blockquote.svelte';

// Image component
export { default as Img } from './image/Img.svelte';

// Progress & Skeleton components
export { default as Progressbar } from './progressbar/Progressbar.svelte';
export { default as ListPlaceholder } from './skeleton/ListPlaceholder.svelte';
export { default as WidgetPlaceholder } from './skeleton/WidgetPlaceholder.svelte';
export { default as StepIndicator } from './stepindicator/StepIndicator.svelte';
export { default as Pagination } from './pagination/Pagination.svelte';
export { default as Indicator } from './indicator/Indicator.svelte';

// List components
export { default as Listgroup } from './listgroup/Listgroup.svelte';
export { default as ListgroupItem } from './listgroup/ListgroupItem.svelte';

// Toolbar components
export { default as Toolbar } from './toolbar/Toolbar.svelte';
export { default as ToolbarButton } from './toolbar/ToolbarButton.svelte';
export { default as ToolbarGroup } from './toolbar/ToolbarGroup.svelte';

// Form helper
export { default as Helper } from './form/Helper.svelte';

// Brand assets
export { default as DetomeLogoLight } from './brand/DetomeLogoLight.svelte';
export { default as DetomeLogoDark } from './brand/DetomeLogoDark.svelte';
export { default as DetomeLogo } from './brand/DetomeLogo.svelte';
export { default as DetomeIconLight } from './brand/DetomeIconLight.svelte';
export { default as DetomeIconDark } from './brand/DetomeIconDark.svelte';
export { default as DetomeIcon } from './brand/DetomeIcon.svelte';

// Legacy aliases for compatibility
export { default as TabItem } from './tabs/TabsContent.svelte';
