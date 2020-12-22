describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.addUser({ name: 'supertestuser', username: 'supertestuser', password: 'supertestuser' })
        cy.addUser({ name: 'testuser', username: 'testuser', password: 'testuser' })
        cy.visit('http://localhost:3000')
      })

    it('login form can be opened', function() {
        cy.contains('login').click()
        
      })
      
    it('login succeed', function() {
        cy.contains('login').click()
        cy.get('#username').type('supertestuser')
        cy.get('#password').type('supertestuser')
        cy.get('#login-button').click()

        cy.contains('supertestuser is logged in')
      })

      describe('when logged in', function() {
        beforeEach(function() {
          cy.login({ username: 'supertestuser', password: 'supertestuser' })
        })
    
        it('a new blog can be created', function() {
          cy.createBlog({
            title:  'title',
            author: 'author',
            url:    'url'
          })
          cy.contains('title author')
        })

        it('like is possible', function() {
          cy.createBlog({
            title:  'title',
            author: 'author',
            url:    'url'
          })
          cy.contains('title author')
            .contains('show').click()
          cy.contains('0')
          cy.contains('like').click()
          cy.contains('1')
        })

        it('destroy is possible', function() {
          cy.createBlog({
            title:  'title',
            author: 'author',
            url:    'url'
          })
          cy.contains('title author')
            .contains('show').click()
          cy.contains('destroy').click()
          cy.on('window:confirm', () => true);
        })
        it('destroy dont rong user', function() {
          cy.createBlog({
            title:  'title',
            author: 'author',
            url:    'url'
          })
          cy.contains('title author')
            .contains('show').click()
          cy.contains('destroy')
          cy.logout()
          cy.login({ username: 'testuser', password: 'testuser' })
          cy.contains('title author')
            .contains('show').click()
          cy.contains('destroy').should('not.exist')
        
        })
      })
      
  })