// customer action

/* 
* instructions:
* 1. display all items available for sale,
* include ids, names, prices of products.
* 2. ask how many units of product to buy.
* 3. after order, check if stock actually available
* throw warning & cancel order if insufficient stock.
* if sufficient stock, remove amount from stock_quantity
* 4. after update, show customer their cost.
*/

const inquirer = require('inquirer');
const mysql = require('mysql');
const Table = require('cli-table2');

const USER = 'james'; // create tester later to post?
const PASSWORD = 'james666'; // create tester later to post?
const DATABASE = 'slamazon';

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,

  user: USER,
  password: PASSWORD,
  database: DATABASE
});

connection.connect(function (error) {
  if (error) throw error;
  console.log(`Connected as id ${connection.threadId}`);
  getItemsList();
  inquisition();

  connection.end();
});

// ask for ID & amount to buy
function inquisition() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'Please enter ID of product you\'d like to buy',
        name: 'productToBuy',
      },
      {
        type: 'input',
        message: 'How many would you like to buy?',
        name: 'amountToBuy',
      }
    ]).then(answer => {
      console.log(`productToBuy: ${answer.productToBuy}\namountToBuy: ${answer.amountToBuy}`);
      // inquisition();
    }).catch(error => {
      console.error(error);
    });
}

function getItemsList() {
  const inventoryColumns = ['item_id', 'product_name', 'department_name', 'price'];
  const query = connection.query('SELECT ?? FROM ??', [inventoryColumns, 'products'], function (error, results, fields) {
    if (error) throw error;
    console.log(`\nInventory: `);// \nitem id | name | department | price`)
    // for (var i = 0; i < results.length; i++) {
    //   console.log(`${results[i].item_id} | ${results[i].product_name} | ${results[i].department_name} | \$${parseFloat(results[i].price).toFixed(2)}`);
    // }
    const inventoryTable = new Table({
      head: inventoryColumns,
      colWidths: [10, 45, 25, 10]
    });
    for (let i = 0; i < results.length; i++) {
      inventoryTable.push(
        [results[i].item_id, results[i].product_name, results[i].department_name, parseFloat(results[i].price).toFixed(2)],
        // ['First value', 'Second value', '3rd', '4th']
      );
    }
    console.log(inventoryTable.toString());
  });
  console.log(query.sql);

  // const query0 = connection.query('SELECT item_id, product_name, price FROM products', function (err, res) {
  //   if (err) throw err;
  //   for (var i = 0; i < res.length; i++) {
  //     console.log(`${res[i].item_id} | ${res[i].product_name} | ${res[i].price}`);
  //   }
  //   // display inventory table w/ cli-table2 later
  //   const availableStockTable = new Table({
  //     head: ['item id', 'name', 'price'],
  //     colWidths: [100, 100, 100]
  //   });
  // });
  // console.log(query0.sql);
}
