# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2026-09-10

### Added

- **SegmentedControl**: Attached pill-style control for choosing exactly one option from a small set (e.g. AND/OR combinators, view switchers). Built on bits-ui RadioGroup so exactly one segment is always selected, with roving tabindex and arrow-key navigation. Supports `xs` through `xl` sizes, per-option `disabled`, `bind:value`, and `onChange`. Exported alongside a `SegmentedControlOption` type.

### Changed

- **Package renamed**: `@requify/requify-design-system` is now `@detome/detome-design-system`. Update your import specifier and `@source` CSS directive to the new package name; all component APIs are unchanged.

## [0.1.0] - 2025-01-01

### Added

- Initial release of Detome Design System (originally published as Requify Design System)
- 60+ UI components extracted from the Detome main application
- **Foundation Components**: Button, ButtonGroup, CloseButton, Input, Textarea, Label, Card, Badge, Spinner
- **Form Components**: Select, SelectItem, Checkbox, Switch, RadioGroup, RadioItem, Radio, Datepicker, DateRangePicker, Search
- **Modal & Dialog Components**: Modal, AlertDialog, Drawer, Hr
- **Alert & Toast Components**: Alert, Toast
- **Navigation Components**: Sidebar, SidebarWrapper, SidebarGroup, SidebarItem, SidebarDropdown, Breadcrumb, BreadcrumbItem
- **Complex Components**: Tabs, TabsList, TabsTrigger, TabsContent, Accordion, AccordionItem, Tooltip, Popover, Dropdown, DropdownItem, DropdownLink, DropdownDivider, DropdownHeader
- **Table Components**: Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell
- **Typography Components**: Heading, P, A, Blockquote
- **Progress & Skeleton**: Progressbar, ListPlaceholder, WidgetPlaceholder, StepIndicator, Indicator
- **Other Components**: Pagination, Listgroup, ListgroupItem, Toolbar, ToolbarButton, ToolbarGroup, Img, Helper
- Type-safe enums for all variants and sizes (ButtonVariant, ComponentSize, ModalSize, etc.)
- Comprehensive utility functions (cn, bits-ui-utils)

### Features

- Svelte 5 with runes-based reactivity ($props, $state, $derived)
- TypeScript strict mode with comprehensive type definitions
- Tailwind CSS 4 with customizable theme via CSS custom properties
- bits-ui primitives for accessibility-first headless components
- Full dark mode support with automatic theme detection
- Responsive design with Tailwind CSS breakpoints
- WCAG AA/AAA accessibility compliance
- Design system showcase page demonstrating all components

### Technical

- Scoped npm package: @detome/detome-design-system
- Trusted Publishing configuration via GitHub Actions
- Provenance support for npm registry
- Type definitions for full IDE support
- Separate dev server and library build configurations
