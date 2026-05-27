class CheckoutPage {
  static firstName(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="firstName"]')
  }

  static lastName(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="lastName"]')
  }

  static postalCode(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="postalCode"]')
  }

  static continueButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="continue"]')
  }

  static finishButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="finish"]')
  }

  static completeHeader(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="complete-header"]')
  }
}

export default CheckoutPage
