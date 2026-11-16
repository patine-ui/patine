// The MCP protocol over JSON-RPC 2.0: initialize, the tool list, and the three tools. Pure: a request in, a response out.
const { findPage, searchPages, summarize } = require('./docs');

const PROTOCOL_VERSION = '2025-06-18';

const TOOLS = [
  {
    name: 'list_components',
    description:
      'List every page of the Patine UI (patine-ui) docs: components, guides and recipes, each with a one-line summary. Call this first to see what exists.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'get_component_docs',
    description:
      'Get the full docs page for one Patine UI component or topic, as Markdown: props table, examples, accessibility and platform notes. E.g. "Button", "DatePicker", "BottomSheet", "Theming".',
    inputSchema: {
      type: 'object',
      properties: { name: { type: 'string', description: 'Component or page name, e.g. "Select"' } },
      required: ['name'],
    },
  },
  {
    name: 'search_docs',
    description:
      'Search the Patine UI docs for a prop, behaviour or task, e.g. "min nights date range" or "dark mode theme". Returns the best pages with a snippet.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string' },
        limit: { type: 'number', description: 'Default: 5' },
      },
      required: ['query'],
    },
  },
];

const text = (value, isError = false) => ({
  content: [{ type: 'text', text: value }],
  isError,
});

const callTool = (pages, name, args = {}) => {
  switch (name) {
    case 'list_components':
      return text(pages.map((p) => `- ${p.name}: ${summarize(p)}`).join('\n'));
    case 'get_component_docs': {
      const page = findPage(pages, String(args.name ?? ''));
      return page
        ? text(`# ${page.name}\n\n${page.body}`)
        : text(`No page named "${args.name}". Call list_components to see the names.`, true);
    }
    case 'search_docs': {
      const results = searchPages(pages, String(args.query ?? ''), Number(args.limit) || 5);
      return results.length > 0
        ? text(results.map((r) => `## ${r.page.name}\n${r.snippet}`).join('\n\n'))
        : text(`Nothing matched "${args.query}".`);
    }
    default:
      return null;
  }
};

/** The response to one JSON-RPC message, or `null` for a notification. */
const handle = (pages, version, message) => {
  const { id, method, params } = message;
  if (id === undefined || id === null) return null;
  const reply = (result) => ({
    jsonrpc: '2.0',
    id,
    result,
  });
  const fail = (code, msg) => ({
    jsonrpc: '2.0',
    id,
    error: {
      code,
      message: msg,
    },
  });
  switch (method) {
    case 'initialize':
      return reply({
        protocolVersion: params?.protocolVersion ?? PROTOCOL_VERSION,
        capabilities: { tools: {} },
        serverInfo: {
          name: 'patine',
          version,
        },
        instructions:
          'Patine UI (patine-ui) is a React Native component library for iOS, Android and the web. Before writing UI code with it, look the component up here instead of guessing props.',
      });
    case 'ping':
      return reply({});
    case 'tools/list':
      return reply({ tools: TOOLS });
    case 'tools/call': {
      const result = callTool(pages, params?.name, params?.arguments);
      return result ? reply(result) : fail(-32602, `Unknown tool: ${params?.name}`);
    }
    default:
      return fail(-32601, `Method not found: ${method}`);
  }
};

module.exports = {
  TOOLS,
  handle,
};
