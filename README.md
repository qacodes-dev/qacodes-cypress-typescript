# qacodes-cypress-typescript

A practical Cypress + TypeScript test suite for [Sauce Demo](https://www.saucedemo.com) — a UI-only static site purpose-built for QA practice. Covers login flows, product listing, and end-to-end checkout with typed custom commands, Page Objects, fixtures, and Mochawesome HTML reports.

---

## Overview

This project demonstrates real-world Cypress patterns against the Sauce Demo storefront. Because Sauce Demo is a static frontend with no backend API, all tests drive the browser directly — there are no HTTP mocks or programmatic login shortcuts. `cy.session()` caches authenticated state within each spec to keep suites fast without repeating the login UI flow.

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 18 or later |
| npm | 9 or later |
| Git | any recent version |
| Chrome | optional (for `cy:run:chrome`) |

---

## Folder structure

```
qacodes-cypress-typescript/
├── cypress/
│   ├── e2e/
│   │   ├── auth/
│   │   │   └── login.cy.ts
│   │   └── shop/
│   │       ├── product-listing.cy.ts
│   │       └── checkout.cy.ts
│   ├── fixtures/
│   │   ├── users.json
│   │   ├── products.json
│   │   └── orders.json
│   ├── pages/
│   │   ├── LoginPage.ts
│   │   ├── ProductPage.ts
│   │   └── CheckoutPage.ts
│   └── support/
│       ├── commands.ts
│       └── e2e.ts
├── .github/
│   └── workflows/
│       └── cypress.yml
├── cypress.config.ts
├── cypress.env.json.example
├── package.json
└── tsconfig.json
```

---

## Setup & run

```bash
# 1. Clone the repository
git clone https://github.com/qacodes-dev/qacodes-cypress-typescript.git
cd qacodes-cypress-typescript

# 2. Install dependencies
npm install

# 3. Copy the example env file (credentials already filled in for Sauce Demo)
cp cypress.env.json.example cypress.env.json

# 4. Open Cypress Test Runner (interactive)
npm run cy:open

# 5. Or run headlessly
npm run cy:run
```

---

## Environment

Credentials are read from `cypress.env.json` (gitignored). Copy the example file to get started — the defaults work against the public Sauce Demo site without any additional setup.

| Variable | Default | Description |
|----------|---------|-------------|
| `BASE_URL` | `https://www.saucedemo.com` | Target site URL |
| `TEST_USER_USERNAME` | `standard_user` | Login username |
| `TEST_USER_PASSWORD` | `secret_sauce` | Login password |

---

## Commands

| Command | What it does |
|---------|-------------|
| `npm run cy:open` | Open interactive Test Runner |
| `npm run cy:run` | Run all specs headlessly (Electron) |
| `npm run cy:run:chrome` | Run all specs in Chrome |
| `npm run typecheck` | TypeScript type-check without emitting |
| `npm run report` | Merge per-spec JSON files and generate HTML report |

**Run a single spec:**
```bash
npx cypress run --spec "cypress/e2e/auth/login.cy.ts"
```

**Override credentials at runtime:**
```bash
npx cypress run --env TEST_USER_USERNAME=problem_user,TEST_USER_PASSWORD=secret_sauce
```

**Generate the Mochawesome HTML report** (after a run):
```bash
npm run report
# Opens: cypress/cypress-report.html
```

---

## CI/CD

GitHub Actions runs the full suite on every push to `main` and on all pull requests using [`cypress-io/github-action@v6`](https://github.com/cypress-io/github-action). Test results, videos, and screenshots are uploaded as artifacts retained for 14 days. Override credentials via repository secrets (`BASE_URL`, `TEST_USER_USERNAME`, `TEST_USER_PASSWORD`) — the workflow falls back to the public Sauce Demo defaults if secrets are not set.

---

## Common issues

**Tests fail with "Username and password do not match"** — Sauce Demo only accepts specific usernames. Check `cypress.env.json` and make sure `TEST_USER_USERNAME` is one of the valid values listed in `cypress/fixtures/users.json`.

**`cy.session()` not restoring state** — This can happen when the Cypress cache is stale. Run `npx cypress cache clear` and retry.

**Chrome not found in CI** — The GitHub Actions workflow uses `browser: chrome` with `cypress-io/github-action`, which pre-installs Chrome on the runner. Locally, ensure Chrome is installed or switch to `npm run cy:run` (Electron).

**Mochawesome report shows no tests** — The `npm run report` script expects JSON files in `cypress/results/`. Run `npm run cy:run` first to generate per-spec results, then run the report command.

---

## Learn more

Full walkthrough and course context: [qa.codes/practice/project-samples/cypress-typescript](https://qa.codes/practice/project-samples/cypress-typescript)

---

## License

MIT
