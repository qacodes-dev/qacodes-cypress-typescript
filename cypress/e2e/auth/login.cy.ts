import LoginPage from '../../pages/LoginPage'

describe('Authentication', () => {
  it('logs in with valid credentials', () => {
    LoginPage.visit()
    LoginPage.username().type('standard_user')
    LoginPage.password().type('secret_sauce')
    LoginPage.loginButton().click()
    cy.url().should('include', '/inventory.html')
    cy.get('.inventory_list').should('be.visible')
  })

  it('shows error for wrong credentials', () => {
    LoginPage.visit()
    LoginPage.username().type('standard_user')
    LoginPage.password().type('wrong_password')
    LoginPage.loginButton().click()
    LoginPage.error().should('contain.text', 'Username and password do not match')
  })

  it('shows error for locked-out user', () => {
    cy.visit('/', { timeout: 90000 })
    LoginPage.username().type('locked_out_user')
    LoginPage.password().type('secret_sauce')
    LoginPage.loginButton().click()
    LoginPage.error().should('contain.text', 'Sorry, this user has been locked out')
  })
})
