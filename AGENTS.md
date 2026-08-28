# AGENTS.md

Guidance for AI agents and contributors working on this repository.

## Project Overview

Hugo blog theme **ferro** with **Tailwind CSS v4** (CSS-first configuration).

- Style entrypoint: `assets/css/main.css` (`@theme` tokens, base layer, custom utilities)
- Component styles: `assets/css/components/*.css`, imported via `_components.css`
- Class detection: `@source "hugo_stats.json"` **plus** v4 auto-detection (plain-text scan of `layouts/`) — note that dev-only markup under `_partials/_dev/` therefore leaks its utilities into production CSS unless excluded
- Dark mode: `[color-scheme]` attribute on `<html>`; semantic tokens re-mapped in `:root[color-scheme="dark"]`

## Hugo Template Changes — Mandatory Skill Review

Any change under `layouts/` (templates, partials, render hooks, shortcodes) must be reviewed and validated with the **`hugo-template-dev`** skill before it is considered done.

**Why:** a passing `hugo` build only proves template syntax; runtime errors (nil field access, wrong method signatures, unsupported resource types, …) only surface when pages actually render.

### How to use the skill correctly

1. **Load it first, before editing anything under `layouts/`** — use the `skill` tool with name `hugo-template-dev`, don't rely on memory of its contents.
2. **Apply its data-access patterns while writing templates**, not just at test time:
   - Hyphenated or variable keys require `index`: `{{ index .Site.Data "my-key" $k }}` — dot notation fails on non-identifier keys.
   - Guard nested access with `with` / `isset`; remember `{{ if $data }}` passes for empty maps `{}` — check specific keys instead.
   - Never type-assert blindly on `interface{}` values from data/scratch files.
3. **Keep separation of concerns**: templates bind structure/data; behavior goes in JS assets (no inline `<script>` in templates except critical-path init); pass data to JS via `data-*` attributes.
4. **Runtime-test every change** per the skill's protocol (adapted to this repo):
   ```bash
   rm -f /tmp/hugo-ferro.log
   npx hugo server --port 1315 >/tmp/hugo-ferro.log 2>&1 &
   sleep 5
   grep -Ei "(error|fail)" /tmp/hugo-ferro.log | head -20
   curl -s -o /dev/null -w "%{http_code}" http://localhost:1315/PATH/TO/PAGE/
   pkill -f "hugo server --port 1315"
   ```
   Fetch every affected page template (home, single, list, taxonomy, 404…) and confirm HTTP 200 + zero errors in the log. For render hooks, exercise every branch with real content (e.g. bundle raster images, SVGs, pinned dimensions).
5. **Never declare done on `hugo --quiet` alone** — it only checks syntax.

## Git Commits — Ask First

Never run `git commit` (or any commit-creating command) without presenting the
proposed commit message and file list to the user and receiving explicit
approval first. Staging (`git add`) alone is fine only when the user has asked
for changes to be committed.

## Commit Message Convention — Angular Style

Follow the [Angular commit message convention](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#-commit-message-format):

```
<type>(<scope>): <subject>

<body>

<footer>
```

- **type** (required): `feat` | `fix` | `docs` | `style` | `refactor` | `perf` | `test` | `build` | `ci` | `chore` | `revert`
- **scope** (optional): the area touched, e.g. `layouts`, `css`, `exampleSite`, `docs`, `ci`
- **subject**: imperative mood, start lowercase, no trailing period, ≤ 72 chars
- **body** (optional): *what* and *why*, wrapped at 72 chars
- **footer** (optional): `BREAKING CHANGE: <description>` (or mark with `!` after type/scope), issue references like `Closes #123`

Examples from this repo's history:

```
feat: CJK-aware word count and official per-language reading time
refactor: unify widescreen breakpoint and tighten layout per 2026-08 review
chore: bump Pages workflow actions to Node 24 runtimes
feat(ci): manual GitHub Pages deploy for exampleSite
```

## Code Simplicity — No Over-Engineering

When a one-liner satisfies the requirement, ship the one-liner. Do not add abstractions, configuration options, extra branches, or speculative generality that no current requirement asks for. Complexity must be justified by a concrete, present need — not by what might be needed later.

## Comments

Comments carry **why**, never restate **what**. Follow the repo's existing patterns:

1. **Purpose blocks on significant partials** — partials that are special, important, or referenced from more than one place open with a short `{{/* ... */}}` stating what they render and the context/dict keys they expect (see `_partials/head/meta.html`, `_partials/home/post_rows.html`). Trivial, self-explanatory, or single-caller fragments may skip it.
2. **Comment decisions at the definition site** — non-obvious logic, workarounds, Hugo quirks and derived magic numbers get an inline `{{/* ... */}}` where they live (e.g. the sticky `top-24` header-offset math in `baseof.html`, the date-desc sort rationale in `home.html`).
3. **Config files explain themselves** — any non-default or surprising-looking setting in `hugo.yaml` carries a one-line reason (e.g. goldmark `wrapStandAloneImageWithinParagraph`, the `cachebusters` entries).
4. **No commented-out code, no debug leftovers** — dead code lives in git history; temporary `printf "%#v"` template dumps and `console.log` calls never survive into a commit.
5. **Keep comments true** — update or delete a comment in the same change that alters the code it describes; a stale comment is worse than none. Write comments in English (repo convention).
6. **Keep comments short** — a line or two is the norm; no essay-style explanatory blocks. If a comment needs paragraphs, the code it describes usually needs refactoring first.

## Styling Placement — Decision Rules

Default to **inline utilities in markup**. Escalate only per Tailwind's official duplication ladder (`styling-with-utility-classes` → *Managing duplication*):

1. **Utilities in the template** — always start here. Repeating a class list twice across files is not yet a problem.
2. **Extract a Hugo partial** — when structure *and* styles repeat across templates and you expect coordinated changes (rule of thumb: extract at the third usage, or earlier if the block churns often). A partial keeps one source of truth while utilities stay visible at the definition site. Do **not** reach for a CSS class first.
3. **Component class in `assets/css/components/`** — legitimate only when:
   - the DOM is created by JS or state is toggled by JS (`.search-result*`, `.code-copy`, `.is-active`)
   - the markup is generated by Markdown/Hugo and not template-controlled (`.page-section`, `.chroma pre`, `#TableOfContents`)
   - it is a true cross-file primitive that doubles as the theme's public override API (`.tag`, `.side-pane`, `.pagination`)
4. **`@utility` in `main.css`** — low-level, non-semantic, reusable behaviors (existing examples: `dim`, `show-md`).

### Anti-patterns (do not do)

- Single-use structural wrapper classes (e.g. the former `.single-header`, `.centered-container`). Page layout belongs in the template's markup.
- Coupling CSS selectors to utility classes used in markup (e.g. `.site-shell--docs > .flex.grow` — fragile if markup changes).
- Dynamically concatenated utility class names; dynamic classes must be complete string literals or they will not be detected/generated.
- Raw color values outside the `@theme` palette block — components reference semantic tokens only (`bg-bg`, `text-fg`, `text-muted`, `text-accent`, `border-border`, …).

### Conventions inside component CSS

- `@apply` is an adapter for composing semantic-token utilities inside component/state classes; prefer native nesting + `var(--token)` for new plain-CSS rules.
- Keep component classes small, stable, and overridable (they sit in `@layer components`, so utilities win).
- Repeated arbitrary values (≥3 occurrences) should be promoted to `@theme` tokens.
