require('dotenv').config()

const knex = require('knex')
const ShoppingListService = require('../src/shopping-list-service')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
})

// use all the ArticlesService methods!!
ShoppingListService.getAllProducts(knexInstance)
  .then(products => console.log(products))
  .then(() =>
  ShoppingListService.insertProduct(knexInstance, {
   
      name_: 'Test new product',
      price: '12.00',
      category: 'Breakfast',
      checked: false, 
      date_added: new Date('2029-01-22T16:28:32.615Z')
   
    })
  )
  .then(newProduct => {
    console.log(newProduct)
    return ShoppingListService.updateProduct(
      knexInstance,
      newProduct.id,
      { name_: 'updated product' }
    ).then(() => ShoppingListService.getById(knexInstance, newProduct.id))
  })
  .then(product => {
    console.log(product)
    return ShoppingListService.deleteProduct(knexInstance, product.id)
  })