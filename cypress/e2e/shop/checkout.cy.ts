import CheckoutPage from '../../pages/CheckoutPage'

describe('Checkout', () => {
  beforeEach(() => {
    const username = Cypress.env('TEST_USER_USERNAME') || 'standard_user'
    const password = Cypress.env('TEST_USER_PASSWORD') || 'secret_sauce'
    cy.login(username, password)
  })

  it('completes a full checkout flow', () => {
    cy.addToCart('Sauce Labs Backpack')
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.get('[data-test="checkout"]').click()

    cy.fillCheckout({
      firstName: 'Jane',
      lastName: 'Doe',
      postalCode: '12345',
    })

    CheckoutPage.continueButton().click()
    CheckoutPage.finishButton().click()
    CheckoutPage.completeHeader().should('contain.text', 'Thank you for your order!')
  })
})
