# Plan: @types/node 20 → 25 Major Bump

## Current State

| Item | Value |
|------|-------|
| Current | `@types/node@^20` (20.19.10) |
| Target | `@types/node@25.2.3` |
| CI Node | 20 (all workflows) |
| Runtime | Node 20 (GitHub Actions) |

## Alignment Consideration

**@types/node** versions map to **Node.js** versions:
- `@types/node@20` → Node.js 20.x APIs
- `@types/node@25` → Node.js 25.x APIs

Your CI and likely local dev use **Node 20**. Using `@types/node@25` means type-checking against Node 25 APIs, which can surface deprecations or new types that don't exist in Node 20. This may cause no issues, or it may flag valid Node 20 code.

## Options

### Option A: Stay on @types/node@^20 (recommended for now)

- Keeps types aligned with Node 20 runtime
- No risk of type mismatches
- Close PR #13 and add to [Dependabot ignore](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file#ignore) if desired:

```yaml
# dependabot.yml
updates:
  - package-ecosystem: "npm"
    directory: "/site"
    ignore:
      - dependency-name: "@types/node"
        update-types: ["version-update:semver-major"]
```

### Option B: Upgrade to @types/node@25

**Prerequisites:**
1. Upgrade CI to Node 22 LTS (or Node 25 if you prefer bleeding edge)
2. Update `package.json`: `"@types/node": "^25"`
3. Run `npm install` and `npm run build`
4. Fix any new type errors in the codebase

**Steps:**
1. Update `.github/workflows/*.yml` – change `node-version: 20` → `node-version: "22"` (or `"25"`)
2. Merge PR #13 (or manually bump in package.json)
3. Run `npm ci && npm run build && npm run lint` locally
4. Address any TypeScript errors
5. Commit, push, verify CI

### Option C: Defer and reassess

- Close PR #13
- Revisit when upgrading Node.js in CI (e.g. when Node 22 is required or Node 20 goes EOL)

## Recommendation

**Option A** – Stay on `@types/node@^20` until you upgrade Node.js in CI. Add the Dependabot ignore to stop repeated PRs for this major version.

## Merge the simple PRs first

Merge these manually at https://github.com/jkeychan/jkeychan.github.io/pulls:

1. **#16** – typescript 5.9.2 → 5.9.3
2. **#15** – @tailwindcss/postcss 4.1.11 → 4.1.18  
3. **#14** – @eslint/eslintrc 3.3.1 → 3.3.3

Then either close **#13** and add the Dependabot ignore, or follow Option B if you want to upgrade.
