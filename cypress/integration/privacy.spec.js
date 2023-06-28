Cypress._.times(3, function(){
    it.only('testa a página da política', function(){
        cy.visit('./src/privacy.html')
        cy.contains('Talking About Testing').should('be.visible')
    })
})