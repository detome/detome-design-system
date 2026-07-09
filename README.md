# Detome Design System

A professional, customizable design system built with Svelte 5, Tailwind CSS, and bits-ui.

## Features

- **60+ UI Components**: Buttons, forms, navigation, feedback elements, and more
- **Type-Safe**: Built with TypeScript and enums for variant and size options
- **Customizable**: CSS variables for easy color theming
- **Dark Mode**: Full dark mode support out of the box
- **Accessible**: Built with accessibility best practices
- **Modern**: Svelte 5 with runes for reactive programming

## Installation

### Prerequisites

Before installing this package, ensure you have set up:

- **Tailwind CSS 4+** with `@tailwindcss/typography` plugin
- CSS custom properties in your global CSS file

```bash
npm install @requify/requify-design-system
# or
yarn add @requify/requify-design-system
# or
pnpm add @requify/requify-design-system
```

### Tailwind CSS Setup

1. Install Tailwind CSS and the typography plugin:

   ```bash
   npm install -D tailwindcss @tailwindcss/typography
   ```

   2. Add CSS variables to your global CSS (e.g., `app.css`):

   ```css
   @import 'tailwindcss';

   /* Import design system styles - REQUIRED for components to work properly */
   @source '../node_modules/@requify/requify-design-system/**/*.{svelte,js}';

   @layer base {
   	:root {
   		/* Override primary brand color */
   		--color-primary-500: #your-brand-color;
   		--color-primary-600: #your-darker-brand-color;

   		/* Override secondary/accent colors */
   		--color-secondary-500: #your-accent-color;

   		/* Override semantic colors */
   		--color-success-500: #your-green;
   		--color-error-500: #your-red;
   		--color-warning-500: #your-yellow;
   		--color-info-500: #your-blue;
   	}
   }
   ```

2. Configure Tailwind with your project needs (see Tailwind CSS docs for setup)

## Usage

### Import Components

```typescript
// In your Svelte component
import { Button, Card, Input, Label } from '@requify/requify-design-system';
import { ButtonVariant } from '@requify/requify-design-system';
```

### Example Components

```svelte
<script lang="ts">
	import { Button, Card, Input, Label } from 'requify-design-system';
	import { ButtonVariant, ComponentSize } from 'requify-design-system';

	let inputValue = '';
</script>

<Card variant="default">
	<h3>Example Card</h3>
	<p>This is a sample card component.</p>
	<Label for="input">Enter text:</Label>
	<Input id="input" bind:value={inputValue} placeholder="Type something..." />
	<Button variant={ButtonVariant.PRIMARY} size={ComponentSize.MD}>Submit</Button>
</Card>
```

## Theming

The design system uses CSS variables for colors, making it easy to customize the theme. Override the default variables in your global CSS:

```css
:root {
	--color-primary-500: #your-color;
	--color-secondary-500: #your-color;
	/* ... other color variables */
}
```

### Default Color Palette

- **Primary**: Cognac Brown (bookish, timeless)
- **Secondary**: Warm Amber (action, energy)
- **Accent**: Vibrant Teal (success undertones)
- **Semantic**: Success, Error, Warning, Info colors

## Available Components

### Foundation

- Button, ButtonGroup, CloseButton
- Input, Textarea, Label
- Card, Badge, Spinner

### Form Components

- Select, Checkbox, Switch, Radio
- Datepicker, DateRangePicker
- Search

### Navigation

- Sidebar, Breadcrumb, Dropdown, Tabs, Accordion, Pagination

### Feedback

- Alert, Toast, Modal, Drawer, Tooltip, Popover

### Data Display

- Table, Progressbar, Indicator

### Typography

- Heading, P, A, Blockquote

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build:lib

# Type check
pnpm run check

# Format code
pnpm run format
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
