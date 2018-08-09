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
  checkInventory();
});

function checkInventory() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: ["View Products for Sale",
      "View Low Inventory",
      "Add to Inventory",
      "Add New Product",]
    }
  ]).then(function(answer) {
    switch(answer.choice){
      case "View Products for Sale": viewProducts();
      break;
      case "View Low Inventory": viewLowInventory();
      break;
      case "Add to Inventory": addInventory();
      break;
      case "Add New Product": addNewProduct();
      break;
     };
  });
};

function viewProducts() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      console.log("Product ID: " + res[i].item_id + 
        "\nProduct name: " + res[i].product_name + 
        "\nRestaurant: " + res[i].department_name + 
        "\nPrice: $" + res[i].price + 
        "\nStock quantity: " + res[i].stock_quantity + 
        "\n--------------------");
    };
  });
  connection.end();
};

function viewLowInventory() {
  connection.query("SELECT * FROM products GROUP BY item_id HAVING stock_quantity < 5", function (err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      console.log("Product ID: " + res[i].item_id + 
        "\nProduct name: " + res[i].product_name + 
        "\nRestaurant: " + res[i].department_name + 
        "\nStock quantity: " + res[i].stock_quantity + 
        "\n--------------------");
    };
  });
};

function addInventory() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    var mealArr = [];
    for (var i = 0; i < res.length; i++) {
      mealArr.push(res[i].product_name.toString());
    };

  inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'Which meal would you like to add?',
      choices: mealArr
    },
    {
      type: 'input',
      name: 'quantity',
      message: 'How many orders would you like to add?',
      validate: function(value) {
        if (isNaN(value) || parseInt(value) < 0) {
          return false,
          console.log("\nPlease enter a positive integer.");
        } else {
          return true;
        }
      }
    }
  ]).then(function(answer) {
    var currentQuantity;
    for (var i = 0; i < res.length; i++) {
      if (res[i].product_name === answer.choice) {
        currentQuantity = res[i].stock_quantity;
      }
    };

    connection.query("UPDATE products SET ? WHERE ?", 
    [
      {
        stock_quantity: currentQuantity + answer.quantity
      },
      {
        product_name: answer.choice
      }
    ], function(err, res) {
      if(err) throw err;
      console.log("You've added " + answer.quantity + " orders of " + answer.choice + " to the inventory.");
      // \nThe current inventory is: " + res[0].stock_quantity);
    }
    )
  });
  });
  connection.end();
};

function addNewProduct() {
  var department = [];
  
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      department.push(res[i].department_name);
    };
  });

  inquirer.prompt([
    {
      type: "input",
      name: "product",
      message: "What's the meal name?"
    },
    {
      type: "input",
      name: "restaurant",
      message: "What restaurant is this meal from?"
    },
    {
      type: "input",
      name: "price",
      message: "How much is this meal?",
      validate: function(value) {
        if (isNaN(value) || parseInt(value) < 0) {
          return false,
          console.log("\nPlease enter a positive number.");
        } else {
          return true;
        }
      }
    },
    {
      type: "input",
      name: "quantity",
      message: "How many orders would you like to add?",
      validate: function(value) {
        if (isNaN(value) || parseInt(value) < 0) {
          return false,
          console.log("\nPlease enter a positive integer.");
        } else {
          return true;
        }
      }
    },
  ]).then(function(answer) {
    connection.query("INSERT INTO products SET ?",
    {
      product_name: answer.product,
      department_name: answer.restaurant,
      price: answer.price,
      stock_quantity: answer.quantity
    }, function(err, res){
      if(err) throw err;
      console.log("You've added " + answer.quantity + " orders of " + answer.product + " to the inventory.");
    })
  });
  connection.end();
};