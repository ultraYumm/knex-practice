require('dotenv').config()
const knex = require('knex')
const moment = require('moment');


const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
})

/*knexInstance.from('shopping_list').select('*')
.then(result => {
    console.log(result)
})*/

function searchByName(searchTerm) {
    knexInstance
        .select('name_')
        .from('shopping_list')
        .where('name_', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
        console.log(result)
        })
    }
    
searchByName('pepper')

function paginateItems(page) {
    const itemsPerPage = 6
    const offset = itemsPerPage * (page - 1)
    knexInstance
      .select('id', 'name_', 'price', 'category', 'checked', 'date_added')
      .from('shopping_list')
      .limit(itemsPerPage)
      .offset(offset)
      .then(result => {
        console.log(result)
      })
  }

  paginateItems(1)

  function productsAddedDaysAgo(daysAgo) {
    knexInstance
      .select('id', 'name_', 'price', 'date_added', 'checked', 'category')
      .from('shopping_list')
      .where(
        'date_added',
        '>',
        knexInstance.raw(`now() - '?? days':: INTERVAL`, daysAgo)
      )
      .then(results => {
        console.log('PRODUCTS ADDED DAYS AGO')
        console.log(results)
      })
  }
  
  productsAddedDaysAgo(100)

function groupbyCat() {
    knexInstance
    .select('category')
     .sum ('price')
     .from('shopping_list')
     .groupBy ('category')
     .then(result => {
         
       console.log(result)})
     }

groupbyCat()


