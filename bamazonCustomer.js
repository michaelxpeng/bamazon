var mysql = require("mysql");
var inquirer = require("inquirer");

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
    console.log("Product ID: " + res[i].item_id + "\nProduct name: " + res[i].product_name + "\nRestaurant: " + res[i].department_name + "\nPrice: $" + res[i].price + "\nStock quantity: " + res[i].stock_quantity + "\n--------------------");
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
      message: 'How many orders would you like?'
    }
  ]).then(function (answers) {
    var meal = answers.choice - 1;
    var quantity = answers.quantity;

    if (quantity <= res[meal].stock_quantity) {
      connection.query("UPDATE products SET ? WHERE ?"),
      [
        {
          stock_quantity: (res[meal].stock_quantity - quantity)
        },
        {
          item_id: meal
        }
      ],function(err, result) {
        if(err) throw err;
        console.log("Coming right up!");
        };
    } else{
      console.log("Sorry, we don't have enough left.");
    };
  });
  });
};