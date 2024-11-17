import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // Specify the test file you want to run (cy.js)
    specPattern: 'cypress/e2e/addAndDeleteTimeEntry.cy.js',  // Update this path if needed
    baseUrl: 'http://localhost:3000', // Optional: Define your app's base URL
  },
});