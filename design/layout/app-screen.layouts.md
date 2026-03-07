# App Screen Layout Patterns

Canonical app-screen layouts for authenticated product surfaces.

## Layout A1 - Settings Screen

Sections:

1. App header with page title + actions
2. Main split layout:
   - left: form/settings groups
   - right: account/plan/usage summary panels
3. Notifications/preferences controls
4. Danger zone actions

## Layout A2 - Workspace Detail

Sections:

1. Title + breadcrumb row
2. Primary content panel(s)
3. Secondary side rail with metadata/actions
4. Inline feedback states (success/error)

## Form and A11y Baseline

- grouped fieldsets with clear labels/help text
- focus-visible and keyboard reachability for all controls
- destructive actions separated and clearly labeled

## Responsive Rules

- 360px: single column; side rail moves below main form
- 768px: optional 2-column split for secondary panel
- 1280px: stable two-column app shell
