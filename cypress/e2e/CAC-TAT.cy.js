describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(()=>{
    cy.visit('./src/index.html')
  })
  
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    
  })

    it('preenche os campos obrigatórios e envia o formulário', () => {
    
      const longtext = `Este é um texto muito longo que queremos digitar rapidamente no campo de texto
    para testar o comportamento do Cypress sem delay...`

    cy.get('input[name="firstName"]').type('João'); 
    cy.get('input[name="lastName"]').type('Silva'); 
    cy.get('input[type="email"]').type('teste@example.com');
    cy.get('#open-text-area').type(longtext, { delay: 10 });
    cy.contains('button', 'Enviar').click();

   cy.get('span.success strong', { timeout: 10000 }).should('contain', 'Mensagem enviada com sucesso');
  })
  
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('input[type="email"]').type('forçar o erro');
    cy.get('.error > strong', { timeout: 100 }).should('contain', 'Valide os campos obrigatórios!');
})

it('não deve aceitar caracteres não numéricos', () => {
    cy.get('#phone').type('NÃO ACEITA LETRA').should('have.value', '')
  })

it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () =>{
cy.get('#phone-checkbox').check();
cy.contains('button', 'Enviar').click();
})
it('preenche os campos obrigatórios e envia o formulário', () => {
    
      const longtext = `Este é um texto muito longo que queremos digitar rapidamente no campo de texto
    para testar o comportamento do Cypress sem delay...`

    cy.get('input[name="firstName"]').type('João').clear('').type('Pedro').should('have.value', 'Pedro'); 
    cy.get('input[name="lastName"]').type('Silva').clear('').type('Oliveira').should('have.value', 'Oliveira'); 
    cy.get('input[type="email"]').type('teste@example.com');
    cy.get('#open-text-area').type(longtext, { delay: 10 });
    cy.contains('button', 'Enviar').click();

   cy.get('span.success strong', { timeout: 10000 }).should('contain', 'Mensagem enviada com sucesso');
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
   
   const dado = {
    firstname: 'João',
    lastname: 'Pedro',
    email: 'joaopcpsn@gmail.com',
    text:'Testeeeee' 
   }
   
    cy.fillMandatoryFieldsAndSubmit(dado)
    
    cy.get('.success').should('be.visible')
  })

  it('CLICA NOS BOTÕES', () =>{

  cy.get('select').select('Blog').should('have.value', 'blog');
  cy.get('select').select('Cursos').should('have.value', 'cursos');
  cy.get('select').select('Mentoria').should('have.value', 'mentoria');
  cy.get('select').select('YouTube').should('have.value', 'youtube');

})

it('seleciona um produto (Blog) por seu índice', () => {
  cy.get('select')
    .select(1)  
    .should('have.value', 'blog');
});

it('marca o tipo de atendimento "Feedback"', () => {
  
  cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('be.checked')
    .and('have.value', 'feedback');
});


it('marca cada tipo de atendimento', () => {
  
  cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('be.checked')
    .and('have.value', 'feedback');

     cy.get('input[type="radio"][value="ajuda"]')
    .check()
    .should('be.checked')
    .and('have.value', 'ajuda');

cy.get('input[type="radio"][value="elogio"]')
    .check()
    .should('be.checked')
    .and('have.value', 'elogio');

    

});

it('marca ambos checkboxes, depois desmarca o último', () => {
  
  cy.get('#email-checkbox')
  .check()
  .should('be.checked');
  cy.get('#phone-checkbox')
  .check()
  .should('be.checked')
  ;

 cy.get('input[type="checkbox"]').last()
    .uncheck()
    .should('not.be.checked') 


   cy.get('input[type="checkbox"]').first()
    .should('be.checked')
  ;
  
});

it('marca ambos checkboxes, depois desmarca o último', () => {
  
  cy.get('#email-checkbox')
  .check()
  .should('be.checked');
  cy.get('#phone-checkbox')
  .check()
  .should('be.checked')
  ;

 cy.get('input[type="checkbox"]').last()
    .uncheck()
    .should('not.be.checked') 


   cy.get('input[type="checkbox"]').first()
    .should('be.checked')
  ;
  
});

it('faz upload de um arquivo e verifica se o nome é persistido', () => {
  
  cy.get('input[type="file"]')
    .selectFile('cypress/fixtures/example.json')
    .then(input => {
      
      expect(input[0].files[0].name).to.equal('example.json')
    })
})

it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
  cy.fixture('example.json').as('sampleFile')
  cy.get('input[type="file"]')
    .selectFile('@sampleFile')
    .should(input => {
      
      expect(input[0].files[0].name).to.equal('example.json')
    })
})

it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
  
  cy.get('a')
  .should('have.attr', 'target', '_blank')

})

it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
  
  cy.get('a')
  .invoke('removeAttr', 'target')

})



})