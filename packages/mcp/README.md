# @patine-ui/mcp

An [MCP](https://modelcontextprotocol.io) server that gives coding agents the [Patine UI](https://github.com/patine-ui/patine)
docs: list the components, read a component's page, and search. It reads `llms-full.txt` from the `patine-ui` installed in
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
| `search_docs` | The best pages for a query, with a snippet |

Set `PATINE_DOCS=/path/to/llms-full.txt` to read another copy. Without `patine-ui` installed it fetches the docs site's copy.
