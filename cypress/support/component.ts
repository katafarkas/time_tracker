import './commands'

import { mount } from 'cypress/vue'

Cypress.Commands.add('mount', mount)

// Example use:
// cy.mount(MyComponent)