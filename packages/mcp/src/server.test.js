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

  it('lists the three tools', () => {
    expect(call('tools/list').result.tools.map((t) => t.name)).toEqual(['list_components', 'get_component_docs', 'search_docs']);
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

  it('reports a missing page and unknown methods', () => {
    expect(call('tools/call', { name: 'get_component_docs', arguments: { name: 'Gantt' } }).result.isError).toBe(true);
    expect(call('tools/call', { name: 'nope' }).error.code).toBe(-32602);
    expect(call('resources/list').error.code).toBe(-32601);
  });
});
