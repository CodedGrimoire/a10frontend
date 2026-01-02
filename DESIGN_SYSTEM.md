# Design Tokens
- **Colors**:  
  - Primary: `--color-primary` `#0f766e`, strong `#0b5f57`  
  - Secondary: `--color-secondary` `#dc6b2f`  
  - Tertiary: `--color-tertiary` `#f59e0b`  
  - Neutrals: `--color-text` `#0f172a`, `--color-muted` `#4b5563`, surfaces `--color-surface` `#fff`, `--color-surface-muted` `#f5f3ef`, borders `--color-border` `#e2e8f0`, `--color-border-strong` `#cbd5e1`  
  - States: `--color-success` `#15803d`, `--color-danger` `#dc2626`  
  - Dark mode overrides on `[data-theme="dark"]` for surfaces/borders/text/shadows.
- **Shadows**: `--shadow-sm`, `--shadow-md`, `--shadow-lg`
- **Radius**: `--radius-sm` 8px, `--radius-md` 12px, `--radius-lg` 18px, `--radius-xl` 28px, `--radius-pill`
- **Spacing**: `--space-1..16` (4–64px) used for padding/gaps; `.section-shell`, `.ui-container` enforce consistent layout.
- **Typography**: `--text-xs..3xl` (12–42px), `--font-sans` stack.
- **Gradients**: Buttons use linear-gradient primary/secondary; hero/background use radial accents.
- **States**: Input/button success/error/disabled colors; focus rings use color-mix with primary/success/danger.
- **Theme persistence**: `ThemeProvider` stores `theme` in `localStorage` and sets `data-theme` on `<html>` for CSS variables to react; toggle in navbar via `useTheme()` toggles light/dark with strong contrast defaults.

# Component APIs (src/components/ui)
- **Button**  
  - Props: `variant` (`primary`|`secondary`|`ghost`|`muted`), `size` (`sm`|`md`|`lg`), `as` (element/component), `loading` (bool shows spinner + disables), `disabled`, `className`, `children`, passthrough props (e.g., `type`, `to`).  
  - Styles: radius `--radius-md`, consistent padding, hover lift, focus outline, disabled opacity, loading spinner.
- **Card**  
  - Props: `as`, `className`, `children`.  
  - Styles: surface/border/shadow + radius; no padding enforcement beyond `ui-card` base (sections apply).
- **Input**  
  - Props: `label`, `hint`, `error`, `success` (bool), `disabled`, `className`, passthrough to `<input>`.  
  - Styles: radius `--radius-md`, focus ring, success/error borders, disabled muted, aria-invalid set when `error`.
- **Badge**  
  - Props: `tone` (`info`|`warn`|`neutral`), `className`, `children`.
- **Skeleton**  
  - Props: `className`, `style`, `height` (default 14px). Uses shimmer animation.
- **Container**  
  - Props: `className`, `children`. Constrains width + responsive gutters.
- **SectionHeader**  
  - Props: `title`, `description`, `action`.
- **Layout**  
  - Wraps `Navbar` + `Footer` with `main` region, using `.app-shell`.

# Form & State Guidelines
- Use `Input error="message"` for validation errors; `success={true}` for success feedback; `disabled` to lock fields.  
- Use `Button loading` to show spinner during async actions; also set `disabled` when immutable.  
- Skeletons (`Skeleton`) are used for list/detail placeholders (latest books, top-rated, all books table, my books, detail page).  
- Spacing/padding: prefer `.section-shell`, `.ui-card`, `.ui-container`, `.stack`, `.card-grid`, `.form-grid` helpers for alignment.  
- Responsive: grids use `repeat(auto-fit, minmax(...))`; nav/footer/cards/tables adapt via existing CSS and container widths; all controls have comfortable hit areas and focus states for touch/keyboard.
