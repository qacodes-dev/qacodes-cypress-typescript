import ProductPage from '../../pages/ProductPage'

describe('Product Listing', () => {
  beforeEach(() => {
    const username = Cypress.env('TEST_USER_USERNAME') || 'standard_user'
    const password = Cypress.env('TEST_USER_PASSWORD') || 'secret_sauce'
    cy.login(username, password)
  })

  it('sorts products by price low to high', () => {
    ProductPage.sortBy('lohi')

    cy.get('.inventory_item_price').then(($prices) => {
      const prices = [...$prices].map((el) =>
        parseFloat(el.textContent?.replace('$', '') ?? '0')
      )
      expect(prices[0]).to.be.lte(prices[1])
    })
  })

  it('sorts products by name Z to A', () => {
    ProductPage.sortBy('za')

    cy.get('.inventory_item_name').first().invoke('text').then((name) => {
      expect(name.trim()).to.match(/^T/)
    })
  })
})
