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

  makeInventoryTable();

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
}
