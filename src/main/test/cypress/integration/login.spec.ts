describe('Login', () => {
  it('Should load with correct initial state', () => {
    cy.visit('login')
    cy.get('data-testid="email-status"').should('have.attr', 'title', 'Campo obrigatório')
  })
})
