/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function() {
    cy.visit('./src/index.html')
  })

  // Teste 1
    it('verifica o título da aplicação', function() {        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

  // Teste 2
    it('preenche os campos obrigatórios e envia o formulário', function(){
      cy.get('#firstName').type('Gabriel')
      cy.get('#lastName').type('Recouso')
      cy.get('#email').type('gabriel.recouso@gmail.com')
      cy.get('#open-text-area').type('Testando 1, 2, 3.Testando 1, 2, 3.Testando 1, 2, 3.Testando 1, 2, 3.Testando 1, 2, 3.Testando 1, 2, 3.Testando 1, 2, 3.Testando 1, 2, 3.Testando 1, 2, 3.', { delay: 0 })
      
      cy.clock()
      
      cy.contains('button[type="submit"]', 'Enviar').click()
      
      cy.get('.success').should('be.visible')
      cy.tick(3000)
      cy.get('.success').should('not.be.visible')
    })

  // Teste 3
    it('exibe mensagem de erro ao submenter o formulário com um email com formatação inválida', function(){
      cy.get('#firstName').type('Gabriel')
      cy.get('#lastName').type('Recouso')
      cy.get('#email').type('gabriel.recouso.gmail.com')
      cy.get('#open-text-area').type('Testando 1, 2, 3.Testando 1, 2, 3.Testando 1, 2, 3.Testando 1, 2, 3.Testando 1, 2, 3.Testando 1, 2, 3.Testando 1, 2, 3.Testando 1, 2, 3.Testando 1, 2, 3.', { delay: 0 })
      
      
      cy.clock()
      cy.contains('button[type="submit"]', 'Enviar').click()
      cy.get('.error').should('be.visible')
      
      cy.tick(3000)

      cy.get('.error').should('not.be.visible')

      

    })
  
  
  // Teste 4
    it('campo telefone continua vazio quando preenchido com valor não-numérico', function(){
      cy.get('#phone')
        .type('abcdefghij')
        .should('have.value', '')
    })  

  // Teste 5
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
      cy.get('#firstName').type('Gabriel')
      cy.get('#lastName').type('Recouso')
      cy.get('#email').type('gabriel.recouso@gmail.com')      
      cy.get('#phone-checkbox').check()
      cy.get('#open-text-area').type('Testando 1, 2, 3.')
      
      
      cy.clock()
      cy.contains('button[type="submit"]', 'Enviar').click()
      cy.get('.error').should('be.visible')
      cy.tick(3000)      
      cy.get('.error').should('not.be.visible')
  })

  // Teste 6
    it('preenche e limpa os campos, nome, sobrenome, email e telefone', function(){
      cy.get('#firstName').type('Gabriel')
        .should('have.value', 'Gabriel')
        .clear().should('have.value', '')
      cy.get('#lastName').type('Recouso')
        .should('have.value', 'Recouso')
        .clear().should('have.value', '')
      cy.get('#email').type('gabriel.recouso@gmail.com')
        .should('have.value', 'gabriel.recouso@gmail.com')
        .clear().should('have.value', '')
      cy.get('#phone').type('13974054321')  
        .should('have.value', '13974054321')
        .clear().should('have.value', '')   
        
        
        cy.clock()
        cy.contains('button[type="submit"]', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(3000)      
      cy.get('.error').should('not.be.visible')
     })

  // Teste 7

     it('exibe mensagem de erro ao submenter o formulário sem preencher os campos obrigatórios.', function(){
      
      
      cy.clock()
    
      cy.contains('button[type="submit"]', 'Enviar').click()
      cy.get('.error').should('be.visible')
      cy.tick(3000)      
      cy.get('.error').should('not.be.visible')
     })

  // Teste 8

     it('envia o formulário com sucesso usando um comando customizado', function(){
      cy.fillMandatoryFieldsAndSubmit()
     
       
      cy.tick(3000)
      cy.get('.success').should('not.be.visible')   
     })

  // Teste 9
     
     it('seleciona um produto (Youtube) por seu texto', function(){
      cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
     })
  
  // Teste 10
     it('seleciona um produto (Mentoria) por seu valor (value)', function(){
      cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
     })

  // Teste 11
     it('seleciona um produto (Blog) por seu índice', function(){
      cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
     })

  // Teste 12
  it('marca o tipo de atendimento "Feedback', function(){
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')
  })

  // Teste 13
  it('marca o tipo de atendimento', function(){
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function($radio){
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  // Teste 14
  it('marca ambos checkboxes, depois desmarca o último', function(){
    cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')
  })

  // Teste 15
  it('seleciona um arquivo da pasta fixtures', function(){
    cy.get('#file-upload')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json')
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  // Teste 16
  it('seleciona um arquivo simulando um drag-and-drop', function(){
    cy.get('#file-upload')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  // Teste 17
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  // Teste 18
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })

  // Teste 19
  it('acessa a página de política de privacidade, removendo o target e clicando no link', function(){
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('Talking About Testing').should('be.visible')
  })

  // Teste 20

  it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  // Teste 21
  it('preenche area de texto usando o .invoke', () => {
    const longText = Cypress._.repeat('0123456789', 20)

    cy.get('#open-text-area')
      .invoke('val', longText)
      .should('have.value', longText)
   })
  
  // Teste 22
   it('faz uma requisição HTTP', function(){
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
      .should(function(response){
        const { status, statusText, body } = response
        expect(status).to.equal(200)
        expect(statusText).to.equal('OK')
        expect(body).to.include('CAC TAT')
      })
   })

   // Teste 23

  it.only('exibe o gato usando o .invoke', () => {
    cy.get('#cat')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', '🐈')      
  })

    })
