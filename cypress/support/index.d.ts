declare namespace Cypress {
  interface Chainable {
    /**
     * Select DOM element by data-test-id attribute.
     * @example cy.testID('component-x')
    */
    testID(value: string): Chainable<Element>,
    /**
     * Dismiss initial privacy notice banner
     * @example cy.dismissCookiesBanner()
    */
    dismissCookiesBanner(): Chainable<Element>,
  }
}
