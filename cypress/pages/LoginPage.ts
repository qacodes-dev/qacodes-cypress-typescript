class LoginPage {
  static visit(): void {
    cy.visit('/')
  }

  static username(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="username"]')
  }

  static password(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="password"]')
  }

  static loginButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="login-button"]')
  }

  static error(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="error"]')
  }
}

export default LoginPage
