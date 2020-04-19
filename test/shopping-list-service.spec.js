const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex')

describe(`Shopping list object`, function() {
    let db
    let testProducts = [
            {
              id: 1,
              name_: 'First test product!',
              price: '5.00',
              category: 'Main',
              checked: false, 
              date_added: new Date('2029-01-22T16:28:32.615Z')
            },
             {
              id: 2,
              name_: 'Second test product!',
              price: '10.00',
              category: 'Breakfast',
              checked: false, 
              date_added: new Date('2029-01-22T16:28:32.615Z')
             },
             {
              id: 3,
              name_: 'Third test product!',
              price: '15.00',
              category: 'Lunch',
              checked: false, 
              date_added: new Date('2029-01-22T16:28:32.615Z')
            },
           ]


    before(() => {
        db = knex({
        client: 'pg',
        connection: process.env.TEST2_DB_URL,
        })
    })
    
    before(() => db('shopping_list').truncate())

    afterEach(() => db('shopping_list').truncate())
    
    after(() => db.destroy())
       
    context(`Given ''shopping_list' has data`, () => {
        beforeEach(() => {
         return db
          .into('shopping_list')
          .insert(testProducts)
          })

    it(`getAllProducts() resolves all products from 'shopping_list' table`, () => {
        return ShoppingListService.getAllProducts(db)
        .then(actual => {
            expect(actual).to.eql(testProducts)
              })
    })

    it(`getById() resolves a product by id from 'shopping_list' table`, () => {
        const thirdId = 3
        const thirdTestProduct = testProducts[thirdId - 1]
        
        return ShoppingListService.getById(db, thirdId)
          .then(actual => {
              expect(actual).to.eql({
                 id: thirdId,
                 name_: thirdTestProduct.name_,
                 price: thirdTestProduct.price,
                 category: thirdTestProduct.category,
                 checked: thirdTestProduct.checked,
                 date_added: thirdTestProduct.date_added,
               })
             })
         })
    it(`deleteProduct() removes a product by id from 'shopping_list' table`, () => {
        const productId = 3
        return ShoppingListService.deleteProduct(db, productId)
            .then(() => ShoppingListService.getAllProducts(db))
            .then(allProducts => {
                // copy the test articles array without the "deleted" article
            const expected = testProducts.filter(product => product.id !== productId)
                expect(allProducts).to.eql(expected)
            })
        })
    
    it(`updateProduct () updates a product from the 'shopping_list' table`, () => {
        const idOfProductToUpdate = 3
        const newProductData = {
        name_: 'updated product',
        price: '8.00',
        category: 'Main',
        checked: false,
        date_added: new Date(),

        }
        return ShoppingListService.updateProduct(db, idOfProductToUpdate, newProductData)
        .then(() => ShoppingListService.getById(db, idOfProductToUpdate))
        .then(product => {
            expect(product).to.eql({
            id: idOfProductToUpdate,
            ...newProductData,
            })
        })
    })     


  })

  context(`Given 'shopping_list' has no data`, () => {
    it(`getAllProducts() resolves an empty array`, () => {
         return ShoppingListService.getAllProducts(db)
         .then(actual => {
         expect(actual).to.eql([])
           })
      })
     })

    it(`insertProduct() inserts a new product and resolves the new product with an 'id'`, () => {
        const newProduct = {
        name_: 'Test new product',
        price: '12.00',
        category: 'Breakfast',
        checked: false, 
        date_added: new Date('2029-01-22T16:28:32.615Z')
            }

        return ShoppingListService.insertProduct(db, newProduct)
        .then(actual => {
            expect(actual).to.eql({
                id: 1,
                name_: newProduct.name_,
                price: newProduct.price,
                category: newProduct.category,
                checked: newProduct.checked,
                date_added: newProduct.date_added,
            })
        })
    })




})


