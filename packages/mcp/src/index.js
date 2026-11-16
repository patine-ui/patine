#!/usr/bin/env node
// Patine UI's MCP server over stdio. Reads the docs from the patine-ui installed in the current project (so they match its
// version), from PATINE_DOCS if set, or from the docs site as a last resort.
const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');

const { parsePages } = require('./docs');
const { handle } = require('./server');

const DOCS_URL = 'https://patine.dev/llms-full.txt';
const { version } = require('../package.json');

const localDocs = () => {
  if (process.env.PATINE_DOCS) return fs.readFileSync(process.env.PATINE_DOCS, 'utf8');
  try {
    const pkg = require.resolve('patine-ui/package.json', { paths: [process.cwd()] });
    return fs.readFileSync(path.join(path.dirname(pkg), 'llms-full.txt'), 'utf8');
  } catch {
    return null;
  }
};

const loadDocs = async () => {
  const local = localDocs();
  if (local) return local;
  const response = await fetch(DOCS_URL);
  if (!response.ok) throw new Error(`Couldn't load the Patine docs: ${response.status} from ${DOCS_URL}`);
  return response.text();
};

const main = async () => {
  const pages = parsePages(await loadDocs());
  const input = readline.createInterface({ input: process.stdin });
  input.on('line', (line) => {
    if (!line.trim()) return;
    let message;
    try {
      message = JSON.parse(line);
    } catch {
      process.stdout.write(`${JSON.stringify({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } })}\n`);
      return;
    }
    const response = handle(pages, version, message);
    if (response) process.stdout.write(`${JSON.stringify(response)}\n`);
  });
};

main().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exit(1);
});
