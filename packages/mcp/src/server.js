// The MCP protocol over JSON-RPC 2.0: initialize, the tool list, and the four tools. Pure: a request in, a response out.
const { findPage, searchPages, summarize } = require('./docs');
const { searchIcons } = require('./icons');
const { PRO_NOTE, searchProIcons, searchProPages } = require('./pro');

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
      'Search the Patine UI docs for a prop, behaviour or task, e.g. "min nights date range" or "dark mode theme". Returns the best free pages with a snippet, then matching Patine Pro items (charts, blocks, app templates), tagged Pro.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string' },
        limit: { type: 'number', description: 'Default: 5' },
      },
      required: ['query'],
    },
  },
  {
    name: 'search_icons',
    description:
      'Find icons in the free Patine icon set (@patine-ui/icons) by name or meaning, e.g. "notification", "arrow left", "delete". Returns the names to pass to <Icon name="…" />, so you never guess one that does not exist; then matching Patine Pro icons and brand logos, tagged Pro.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string' },
        limit: { type: 'number', description: 'Default: 20' },
      },
      required: ['query'],
    },
  },
];

const ICON_USAGE =
  "Use: `import { Icon } from '@patine-ui/icons'` then `<Icon name=\"bell\" />`, or `import { Glyph, iconBell } from '@patine-ui/icons'` to ship only that icon. Patine Pro's Icon takes the same names, plus more icons and solid, duotone and color variants.";

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
      const query = String(args.query ?? '');
      const results = searchPages(pages, query, Number(args.limit) || 5);
      // Free pages first; Pro's own docs pages (titled "(Pro)") and the rest of Pro after them, tagged.
      const isPro = (r) => r.page.title.endsWith('(Pro)');
      const free = results.filter((r) => !isPro(r)).map((r) => `## ${r.page.name}\n${r.snippet}`);
      const proDocs = results.filter(isPro);
      const pro = [
        ...proDocs.map((r) => `- [Pro] ${r.page.name.replace(/ Pro$/, '')}: ${r.snippet.replace(/\s+/g, ' ')}`),
        ...searchProPages(
          query,
          3,
          proDocs.map((r) => r.page.name.replace(/ Pro$/, ''))
        ),
      ];
      const sections = [...free, ...(pro.length > 0 ? [`## Patine Pro\n${pro.join('\n')}\n\n${PRO_NOTE}`] : [])];
      return sections.length > 0 ? text(sections.join('\n\n')) : text(`Nothing matched "${args.query}".`);
    }
    case 'search_icons': {
      const query = String(args.query ?? '');
      const limit = Number(args.limit) || 20;
      const icons = searchIcons(query, limit);
      const pro = searchProIcons(query, Math.min(limit, 10));
      const sections = [
        ...(icons.length > 0 ? [`${icons.map((i) => `- ${i.name} (${i.category}): ${i.tags}`).join('\n')}\n\n${ICON_USAGE}`] : []),
        ...(pro.length > 0 ? [`## Patine Pro\n${pro.join('\n')}\n\n${PRO_NOTE}`] : []),
      ];
      return sections.length > 0
        ? text(sections.join('\n\n'))
        : text(`No icon matched "${args.query}". Try a simpler word, e.g. "trash" for delete.`);
    }
    default:
      return null;
  }
};

/** The response to one JSON-RPC message, or `null` for a notification. */
const handle = (pages, version, message) => {
  const { id, method, params } = message !== null && typeof message === 'object' ? message : {};
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
      const result = callTool(pages, params?.name, params?.arguments ?? {});
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
