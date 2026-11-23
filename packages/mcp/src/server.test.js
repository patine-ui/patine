const { parsePages } = require('./docs');
const { handle } = require('./server');

const pages = parsePages(
  '## React Native Button\n\n## Button\n\nA pressable button.\n\n## Theming React Native\n\n## Theming\n\nColors and dark mode.\n'
);
const call = (method, params) =>
  handle(pages, '1.0.0', {
    jsonrpc: '2.0',
    id: 1,
    method,
    params,
  });

describe('handle', () => {
  it('initializes with the tools capability', () => {
    expect(call('initialize', { protocolVersion: '2025-03-26' }).result).toMatchObject({
      protocolVersion: '2025-03-26',
      capabilities: { tools: {} },
      serverInfo: { name: 'patine', version: '1.0.0' },
    });
  });

  it('ignores notifications', () => {
    expect(handle(pages, '1.0.0', { jsonrpc: '2.0', method: 'notifications/initialized' })).toBeNull();
  });

  it('lists the four tools', () => {
    expect(call('tools/list').result.tools.map((t) => t.name)).toEqual([
      'list_components',
      'get_component_docs',
      'search_docs',
      'search_icons',
    ]);
  });

  it('finds icons and says how to use them', () => {
    const found = call('tools/call', { name: 'search_icons', arguments: { query: 'notification' } }).result.content[0].text;
    expect(found).toContain('- bell (communication)');
    expect(found).toContain("from '@patine-ui/icons'");
    expect(call('tools/call', { name: 'search_icons', arguments: { query: 'zzzz' } }).result.content[0].text).toContain('No icon matched');
  });

  it('serves a page, a list and search results', () => {
    expect(call('tools/call', { name: 'get_component_docs', arguments: { name: 'button' } }).result.content[0].text).toContain(
      'A pressable button.'
    );
    expect(call('tools/call', { name: 'list_components' }).result.content[0].text).toBe(
      '- Button: A pressable button.\n- Theming: Colors and dark mode.'
    );
    expect(call('tools/call', { name: 'search_docs', arguments: { query: 'dark mode' } }).result.content[0].text).toContain('## Theming');
  });

  it('lists free results first, then Pro ones tagged Pro with how to get them', () => {
    const docs = call('tools/call', { name: 'search_docs', arguments: { query: 'dark mode kanban' } }).result.content[0].text;
    expect(docs.indexOf('## Theming')).toBeLessThan(docs.indexOf('## Patine Pro'));
    expect(docs).toContain('[Pro block] Kanban');
    expect(docs).toContain('https://patine.dev/pricing');
    const icons = call('tools/call', { name: 'search_icons', arguments: { query: 'github' } }).result.content[0].text;
    expect(icons).toContain('[Pro brand logo] github');
  });

  it('reports a missing page and unknown methods', () => {
    expect(call('tools/call', { name: 'get_component_docs', arguments: { name: 'Gantt' } }).result.isError).toBe(true);
    expect(call('tools/call', { name: 'nope' }).error.code).toBe(-32602);
    expect(call('resources/list').error.code).toBe(-32601);
  });

  it('survives malformed messages', () => {
    expect(handle(pages, '1.0.0', null)).toBeNull();
    expect(handle(pages, '1.0.0', 42)).toBeNull();
    expect(call('tools/call', { name: 'search_docs', arguments: null }).result.isError).toBe(false);
  });
});
