describe('Should be able to add and delete time entry', () => {
  it('passes', () => {
    // Navigate to page
    cy.visit('http://localhost:3000/')

    // Open form
    cy.get('[data-testid="add-time-entry-button"]').click()
    
    // Fill form
    cy.get('[data-testid="task-name-input"]').click().type('Task Name')

    // Submit form
    cy.get('[data-testid="submit-time-entry-button"]').click()

    // The new entry should be visible
    cy.get('.task-in-a-day').should('be.visible')

    // Click the delete button
    cy.get('[data-testid="delete-time-entry-button"]').click()

    // The entry should no longer be visible
    cy.get('.task-in-a-day').should('not.exist')
  })
})
