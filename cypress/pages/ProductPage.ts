class ProductPage {
  static visit(): void {
    cy.visit('/inventory.html')
  }

  static inventoryList(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.inventory_list')
  }

  static sortDropdown(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="product-sort-container"]')
  }

  static cartBadge(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="shopping-cart-badge"]')
  }

  static cartLink(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="shopping-cart-link"]')
  }

  static addToCartButton(productId: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(`[data-test="add-to-cart-${productId}"]`)
  }

  static sortBy(value: string): void {
    ProductPage.sortDropdown().select(value)
  }

  static getCartCount(): Cypress.Chainable<number> {
    return ProductPage.cartBadge().invoke('text').then((text) => parseInt(text, 10))
  }

  static goToCart(): void {
    ProductPage.cartLink().click()
  }
}

export default ProductPage
