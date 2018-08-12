var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "!Mp920506",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  initialize();
});

function initialize() {
  var mealArr = [];
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      mealArr.push(res[i].item_id.toString());
      console.table([
        {
          Meal_ID: res[i].item_id,
          Meal_Name: res[i].product_name,
          Restaurant: res[i].department_name,
          Price: res[i].price,
          Stock_Quantity: res[i].stock_quantity
        }
      ]);
    };

    inquirer.prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'Which meal would you like?',
        choices: mealArr
      },
      {
        type: 'input',
        name: 'quantity',
        message: 'How many orders would you like?',
        validate: function (value) {
          if (isNaN(value) || parseInt(value) < 0) {
            return false,
              console.log("\nPlease enter a positive integer.");
          } else {
            return true;
          }
        }
      }
    ]).then(function (answers) {
      var meal = answers.choice;
      var quantity = parseInt(answers.quantity);
      var totalCost = parseFloat(((res[meal - 1].price) * quantity).toFixed(2));

      if (quantity <= res[meal - 1].stock_quantity) {
        connection.query("UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: (res[meal - 1].stock_quantity - quantity)
            },
            {
              item_id: meal
            }
          ],
          function (err) {
            if (err) throw err;
            console.log("Your total is $" + totalCost + ".\n" +
              quantity + " orders of " + res[meal - 1].product_name + " from " + res[meal - 1].department_name + " coming right up!");
            connection.end();
          });
      } else {
        console.log("Sorry, we don't have enough left.");
        connection.end();
      };
    });
  });
};