describe('SPA Main Page', () => {
    
    it('Executes All Components', () => {
        
        cy.visit('https://spa-5semestre.herokuapp.com/')      //Goes into the SPA main page
        cy.contains('Nodes').click()            //Clicks dropdown meny Nodes
        
        cy.contains('Create New Node').click()  //and then clicks 'Create New Node'
            it('Types in key value'), () => {
                cy.get('#Key:').type('Key:1 Test').should('Key:1 Test')
            }
            it('Types in Name value'), () => {
                cy.get('#Name:').type('Casa da Música').should('Casa da Música')
            }
            it('Types in ShortName value'), () => {
                cy.get('#ShortName:').type('CDM').should('CDM')
            }
            it('Types in Latitude value'), () => {
                cy.get('#Latitude:').type(12.1).should(12.1)
            }
            it('Types in Longitude value'), () => {
                cy.get('#Longitude:').type(8.8).should(8.8)
            }
            it('Defines if it is Depot'), () => {
                cy.get('#isDepot?').type(true).should(true)
            }
            it('Defines if it is ReliefPoint'), () => {
                cy.get('#isRelief Point?').type(true).should(true)
            }
        //PATHNODES
        cy.contains('Create New PathNode').click()
            it('Types in key value'), () => {
                cy.get('#Key:').type('Key:1 Test').should('Key:1 Test')
            }
            it('Chooses Node'), () => {
                cy.get('#Node:').type('BALTAR').should('BALTAR')
            }
            it('Chooses duration'), () => {
                cy.get('#Duration:').type(66).should(66)
            }
            it('Chooses distance'), () => {
                cy.get('#Distance:').type(300).should(300)
            }
        //LINES
        cy.contains('Lines').click()
        cy.contains('Create New Line').click()
            it('Types in key value'), () => {
                cy.get('#Key:').type('Key:1 Test').should('Key:1 Test')
            }
            it('Types in name value'), () => {
                cy.get('#Name:').type('BALTAR-PAREDES').should('BALTAR-PAREDES')
            }
            it('Chooses color'), () => {
                cy.get('#Color:').type([1,2,3]).should([1,2,3])
            }
            it('Chooses linePaths'), () => {
                cy.get('#Line Paths:').type(['linepath:1', 'linepath:2']).should(['linepath:1', 'linepath:2'])
            }
        //LINEPATHS
        cy.contains('Create New LinePath').click()
            it('Types in key value'), () => {
                cy.get('#Key:').type('KeyTeste:5').should('KeyTeste:5')
            }
            it('Chooses path'), () => {
                cy.get('#Path:').type('LinePath:3').should('LinePath:3')
            }
            it('Chooses orientation'), () => {
                cy.get('#Orientation:').type('Go').should('Go')
            }
        //PATH
        cy.contains('Path').click()
        cy.contains('Create New Path').click()
            it('Types in key value'), () => {
                cy.get('#Key:').type('KeyTeste:5').should('KeyTeste:5')
            }
            it('Is path empty'), () => {
                cy.get('#Is Path Empty:').type(false).should(false)
            }
            it('Chooses pathNodes'), () => {
                cy.get('#PathNodes:').type(['lp:1','lp:2','lp:3']).should(['lp:1','lp:2','lp:3'])
            }
        
        //DRIVER TYPES
        cy.contains('Driver Types').click()
        cy.contains('Create New DriverType').click()
            it('Types in key value'), () => {
                cy.get('#Key:').type('DT:5').should('DT:5')
            }
            it('Types in name value'), () => {
                cy.get('#Name:').type('Valentino Rossi').should('Valentino Rossi')
            }
            it('Types in description value'), () => {
                cy.get('#Description:').type('GOAT').should('GOAT')
            }
        
        //VEHICLE TYPES
        cy.contains('Vehicle Types').click()
        cy.contains('Create New VehicleType').click()
            it('Types in key value'), () => {
                cy.get('#Key:').type('VT:1').should('VT:1')
            }
            it('Types in name value'), () => {
                cy.get('#Name:').type('bus').should('bus')
            }
            it('defines autonomy'), () => {
                cy.get('#Autonomy:').type(500000).should(500000)
            }
            it('defines cost'), () => {
                cy.get('#Cost:').type(10).should(10)
            }
            it('defines average speed'), () => {
                cy.get('#Average Speed:').type(30).should(30)
            }
            it('defines energy source'), () => {
                cy.get('#Energy Source:').type(23).should(23)
            }
            it('defines consumption'), () => {
                cy.get('#Consumption:').type(11).should(11)
            }
            it('defines emissions'), () => {
                cy.get('#Emissions:').type(555).should(555)
            }
        //Importer
        cy.contains('Importer').click()
        cy.contains('Import GLX File').click()

        cy.contains('Consult Tables').click()
        cy.contains('Algorithm Solutions').click()

        cy.contains('Map Viewer').click()
        cy.contains('View Map').click()
    })
})

