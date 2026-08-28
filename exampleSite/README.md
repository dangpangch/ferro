# exampleSite

Demo site for the [ferro](https://github.com/dangpangch/ferro) Hugo theme — bilingual English (`/`) and Simplified Chinese (`/zh/`).

## How the theme is wired in

`hugo.yaml` imports the theme as a Hugo module (`github.com/dangpangch/ferro`), and
`go.mod` replaces it with this repository's checkout:

```
replace github.com/dangpangch/ferro => ../
```

The demo therefore always runs against the parent directory: theme edits under
`layouts/`, `assets/`, `i18n/`, and the root `hugo.yaml` are picked up immediately
by a running `hugo server` (live reload). Nothing to copy, and `hugo mod get -u`
is never needed locally.

## Prerequisites

- Hugo ≥ 0.159.0 with the Go toolchain (Hugo modules)
- Node.js — run `npm install` once in this directory; the Tailwind CSS CLI used
  by `css.TailwindCSS` is resolved from here (declared via the
  `packages/hugoautogen` workspace)

## Run

```sh
# from the repository root
hugo server --source exampleSite

# or from this directory
hugo server
```

Production build:

```sh
hugo --source exampleSite    # or: cd exampleSite && hugo
```

## Content

`content/en/` and `content/zh/` mirror each other; pages at the same path are
linked as translations and the navbar language switcher jumps between them.
