Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Gabriel')
    cy.get('#lastName').type('Recouso')
    cy.get('#email').type('gabriel.recouso@gmail.com')
    cy.get('#open-text-area').type('Teste')


    cy.clock()
    cy.contains('button[type="submit"]', 'Enviar').click()
    cy.get('.success').should('be.visible')
    

})