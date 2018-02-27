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

  makeInventoryTable();
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

      makeOrder();
    }
  );
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
    var productToBuy = Number(answers.productToBuy);
    var amountToBuy = Number(answers.amountToBuy);

    checkStock(productToBuy, amountToBuy);
  }).catch(err => {
    console.error(err);
  });
}

function checkStock(productToBuy, amountToBuy) {
  let stockCheckColumns = ['item_id', 'price', 'stock_quantity'];

  const queryStockCheck = connection.query(
    'SELECT ?? FROM ?? WHERE ?',
    [stockCheckColumns, 'products', { item_id: productToBuy }],
    (err, res) => {
      if (err) throw err;

      var stockAvailable = res[0].stock_quantity;
      var unitPrice = res[0].price;
      var stockRemaining = stockAvailable - amountToBuy;

      if (stockRemaining >= 0) {
        console.log(`\nThe item is in stock.`);

        updateStock(productToBuy, amountToBuy, unitPrice, stockRemaining);
      } else {
        console.log(`\nSorry, that item is out of stock.`);
        console.log(`Returning to main inventory list...`);

        setTimeout(() => makeInventoryTable(), 1666);
      }
    }
  );
}

function updateStock(productToBuy, amountToBuy, unitPrice, stockRemaining) {
  var totalCost = amountToBuy * unitPrice;

  const stockUpdateQuery = connection.query(
    'UPDATE ?? SET ? WHERE ?',
    ['products', { stock_quantity: stockRemaining }, {item_id: productToBuy}],
    (err, res) => {
      if (err) throw err;
      console.log(`\nYour total cost is \$${totalCost}`);

      setTimeout(() => console.log(`\nThank you! Come again!`), 1666);

      setTimeout(() => connection.end(), 2666);
    }
  );
}
