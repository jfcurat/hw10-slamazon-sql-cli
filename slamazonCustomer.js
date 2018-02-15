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
const cliTable = require('cli-table2');

const USER = 'testUser'; // create tester later to post?
const PASSWORD = 'testPassword'; // create tester later to post?
const DATABASE = 'slamazon';

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,

  user: USER,
  password: PASSWORD,
  database: DATABASE
});

connection.connect(function (error) {
  if (error) {
    console.log(error);
  }
  console.log(`Connect as id ${connection.threadId}`);

  inquisition();
});

function displayStuff() {
  console.log(`Display stuff here later`);
}

// ask for ID 
function inquisition() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: "Please enter ID of product you'd like to buy",
        name: 'productToBuy'
      }
    ]).then(answer => {
      console.log(`productToBuy: ${answer.productToBuy}`);
    }).catch(error => {
      console.error(error);
    });
}
