{{- /* "Copy page" endpoint: the page as Markdown, fetched on click by
  assets/js/_copy.js via the CopyPage output format (hugo.yaml outputs.page).
  Same bytes the button always copied — title heading + raw source. */ -}}
{{- printf "# %s\n\n%s" .Title .RawContent -}}
