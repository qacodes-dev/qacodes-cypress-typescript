declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>
      addToCart(productName: string): Chainable<void>
      fillCheckout(info: {
        firstName: string
        lastName: string
        postalCode: string
      }): Chainable<void>
    }
  }
}

export {}

// Logs in via the UI. Visits /, fills credentials, submits, and confirms /inventory.html.
// Each call performs a fresh login — Sauce Demo's auth state lives in sessionStorage
// which is per-test, so per-test login is the simplest correct approach.
Cypress.Commands.add('login', (username: string, password: string) => {
  cy.visit('/')
  cy.get('[data-test="username"]').type(username)
  cy.get('[data-test="password"]').type(password)
  cy.get('[data-test="login-button"]').click()
  cy.url().should('include', '/inventory.html')
})

Cypress.Commands.add('addToCart', (productName: string) => {
  cy.contains('.inventory_item', productName)
    .find('[data-test^="add-to-cart"]')
    .click()
})

Cypress.Commands.add(
  'fillCheckout',
  (info: { firstName: string; lastName: string; postalCode: string }) => {
    cy.get('[data-test="firstName"]').type(info.firstName)
    cy.get('[data-test="lastName"]').type(info.lastName)
    cy.get('[data-test="postalCode"]').type(info.postalCode)
  }
)
