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
  checkDepartments();
});

function checkDepartments() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: ["View Product Sales by Department",
        "Create New Department"]
    }
  ]).then(function (answer) {
    switch (answer.choice) {
      case "View Product Sales by Department": viewSales();
        break;
      case "Create New Department": createDepartment();
        break;
    };
  });
};

function viewSales() {
  connection.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      console.table([
        {
          Restaurant_ID: res[i].department_id,
          Restaurant_Name: res[i].department_name,
          Overhead_Costs: (res[i].over_head_costs).toFixed(2)
        }
      ]);
    };
  });
  connection.end();
};

function createDepartment(){
  inquirer.prompt([
  {
    type: "input",
    name: "name",
    message: "What is the name of the restaurant?"
  },
  {
    type: "input",
    name: "overheadCost",
    message: "What is the overhead cost?",
    validate: function (value) {
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
    name: "productSale",
    message: "What is the product sale?",
    validate: function (value) {
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
    name: "totalProfit",
    message: "What is the total profit?",
    validate: function (value) {
      if (isNaN(value) || parseInt(value) < 0) {
        return false,
          console.log("\nPlease enter a positive number.");
      } else {
        return true;
      }
    }
  }
  ]).then(function(answer){
    connection.query("INSERT INTO departments SET ?",
    {
      department_name: answer.name,
      over_head_costs: answer.overheadCost,
      product_sales: answer.prodSales,
      total_profit: answer.totalProfit
    }, function(err, res) {
      if(err) throw err;
      console.log("You've added " + answer.name + "!");
    })
  });
}