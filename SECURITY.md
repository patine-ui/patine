# Security policy

## Supported versions

Fixes land on the latest release only. Upgrade to the newest version before reporting.

## Reporting a vulnerability

Please don't open a public issue. Report it privately through [GitHub's private vulnerability reporting](https://github.com/patine-ui/patine/security/advisories/new) instead.

Include the version, the platform (iOS, Android or web) and a minimal reproduction. You'll get an answer within 7 days. Once a fix is released, the advisory is published with credit to you, unless you'd rather stay anonymous.

## Scope

`patine-ui` is pure JavaScript with no runtime dependencies and no network access of its own. The most likely issues are in how it renders data you pass to it.

`@patine-ui/mcp` runs on developers' machines and feeds docs into coding agents, so content injection or anything that makes it read or fetch something other than the Patine docs is in scope.

The docs site (patine.dev) and the example app (`apps/example/`) are not published to npm, but reports about them are welcome too.

Every release is published from GitHub Actions through npm Trusted Publishing with provenance. A version of `patine-ui` without a provenance attestation on npm did not come from this repo: please report it.
