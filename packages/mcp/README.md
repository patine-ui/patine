# @patine-ui/mcp

An [MCP](https://modelcontextprotocol.io) server that gives coding agents the [Patine UI](https://github.com/patine-ui/patine)
docs: list the components, read a component's page, search them, and find icons by meaning. It reads `llms-full.txt` from the `patine-ui` installed in
your project, so answers match your version and work offline. Zero dependencies.

## Add it

Claude Code:

```sh
claude mcp add patine -- npx -y @patine-ui/mcp
```

Cursor, Windsurf, VS Code and others (`mcp.json`):

```json
{
  "mcpServers": {
    "patine": { "command": "npx", "args": ["-y", "@patine-ui/mcp"] }
  }
}
```

## Tools

| Tool | Does |
|---|---|
| `list_components` | Every docs page with a one-line summary |
| `get_component_docs` | One page as Markdown, e.g. `{ "name": "DatePicker" }` |
| `search_docs` | The best pages for a query, with a snippet; then matching Patine Pro charts, blocks and app templates |
| `search_icons` | Icons in the free set ([`@patine-ui/icons`](../icons)) by name or meaning, e.g. `{ "query": "notification" }`; then matching Pro icons and brand logos |

Set `PATINE_DOCS=/path/to/llms-full.txt` to read another copy. Without `patine-ui` installed it fetches the docs site's copy.

Free results always come first. Anything only in [Patine Pro](https://patine.dev/pricing) comes after them under
"Patine Pro", each tagged `[Pro]` with a one-line description, its docs link and how to get it.

## Maintainers

`src/pro.json`, the list of what only Pro has, is generated: run `pnpm --filter @patine-ui/mcp pro` on a machine with the
private repo after Pro's pages, icons or brand logos change. Don't edit it by hand.
