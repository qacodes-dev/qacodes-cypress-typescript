import './commands'

// Two intercepts that prevent Sauce Demo's external resources from blocking the
// page `load` event across repeated test visits:
//
// 1. /service-worker.js — Sauce Demo ships a Workbox SW with skipWaiting + clients.claim.
//    After Cypress testIsolation clears its CacheStorage and navigates to about:blank,
//    the SW's precache fetch handler can hang on the next navigation request, preventing
//    the load event from firing. Replacing it with a no-op body means the browser
//    installs a harmless SW with no fetch handler.
//
// 2. fonts.googleapis.com — a render-blocking <link rel="stylesheet"> that can stall
//    the load event on CI when the CDN is slow.
beforeEach(() => {
  cy.intercept('/service-worker.js', {
    statusCode: 200,
    body: '/* noop — disabled for Cypress tests */',
    headers: { 'Content-Type': 'application/javascript' },
  })
  cy.intercept('https://fonts.googleapis.com/**', { statusCode: 200, body: '' })
  cy.intercept('https://fonts.gstatic.com/**', { statusCode: 200, body: '' })
})

// Cross-origin script errors from third-party resources surface as "Script error."
// with no useful stack; suppress them so they don't abort unrelated tests.
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('Script error')) {
    return false
  }
  return undefined
})
