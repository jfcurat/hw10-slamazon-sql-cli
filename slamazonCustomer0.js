// reroll attempt on customer app

const inquirer = require('inquirer');
const mysql = require('mysql');
const Table = require('cli-table2');

const HOST = 'localhost',
  PORT = 3306,
  USER = 'james',
  PASSWORD = 'james666',
  DATABASE = 'slamazon';

const connection = mysql.createConnection({
  host: HOST,
  port: PORT,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
});

connection.connect(err => {
  if (err) throw err;
  console.log(`Connected as id ${connection.threadId}`);

  makeInventoryTable()//.then(makeOrder()).catch(err => {console.error(err)});
  makeOrder();
  connection.end();
});

function makeInventoryTable() {
  let inventoryColumns = ['item_id', 'product_name', 'department_name', 'price', 'stock_quantity'];

  const query = connection.query('SELECT ?? FROM ??',
    [inventoryColumns, 'products'],
    (err, res) => {
      if (err) throw err;

      console.log(`\nInventory: `);

      let inventoryTable = new Table({
        head: inventoryColumns,
        colWidths: []
      });

      for (let i = 0; i < res.length; i++) {
        inventoryTable.push(
          [
            res[i].item_id,
            res[i].product_name,
            res[i].department_name,
            '\$' + parseFloat(res[i].price).toFixed(2),
            res[i].stock_quantity
          ]
        );
      }
      console.log(inventoryTable.toString());
    }
  );
  console.log(query.sql);

  return new Promise((resolve, reject) => {
    if (reject) {
      console.log(`promise rejected`);
    }
    console.log(resolve); // ??
  });
}

function makeOrder() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'Please enter ID of product you\'d like to buy:',
      name: 'productToBuy',
    },
    {
      type: 'input',
      message: 'How many would you like to buy?',
      name: 'amountToBuy',
    }
  ]).then(answers => {
    console.log(`\nfrom makeOrder, productToBuy: ${answers.productToBuy}, amountToBuy: ${answers.amountToBuy}`);

    var productToBuy = answers.productToBuy;
    var amountToBuy = Number(answers.amountToBuy);

    checkStock(productToBuy, amountToBuy);
  }).catch(err => {
    console.error(err);
  });
}

function checkStock(productToBuy, amountToBuy) {
  console.log(`\ndid it work? Buy ${productToBuy}. how many? ${amountToBuy}`);
}
