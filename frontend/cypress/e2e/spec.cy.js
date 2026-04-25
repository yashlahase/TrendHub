describe('TrendHub E2E tests', () => {
  it('visits the app root url', () => {
    cy.visit('/')
    // We expect something to render on the page
    cy.get('body').should('exist')
  })
})
