// Component tests render components directly (no SvelteKit routing/layout),
// so the global stylesheet has to be pulled in explicitly for Tailwind's
// generated utility classes (including dark: variants) to actually apply.
import '../src/app.css';

// app.css hides <html> until app.html's inline script marks the theme as
// resolved (FOUC prevention). That script never runs here, so set the
// attribute directly or every element would be reported as not visible.
document.documentElement.setAttribute('data-theme-loaded', 'true');
