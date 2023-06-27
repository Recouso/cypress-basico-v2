Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Gabriel')
    cy.get('#lastName').type('Recouso')
    cy.get('#email').type('gabriel.recouso@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button[type="submit"]', 'Enviar').click()
})