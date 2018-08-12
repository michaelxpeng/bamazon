DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT(10) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR (50) NOT NULL,
    price DECIMAL (10,2) NOT NULL,
    stock_quantity INTEGER (10) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("5-piece tenders combo", "Popeyes", 9.29, 10),
("Double-Double burger", "In-N-Out", 3.45, 15),
("8-piece family meal", "KFC", 14.99, 12),
("roasted turkey & avocado BLT", "Panera Bread", 8.99, 10),
("a dozen donuts", "Dunkin' Donuts", 9.99, 20),
("build-your-own bowl", "Chipotle", 7.50, 15),
("sweet onion chicken teriyaki sandwich", "Subway", 7.75, 18),
("bacon cheeseburger", "Five Guys", 8.69, 15),
("20-piece Chicken McNuggets", "McDonald's", 5, 10),
("Jumbo Jack Cheeseburger", "Jack in the Box", 5.99, 12);

SELECT * FROM products;

CREATE TABLE departments(
	department_id INT(10) NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(50) NOT NULL,
    over_head_costs DECIMAL(20,2) NOT NULL,
    PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Popeyes", 500.00),
("In-N-Out", 725.00),
("KFC", 550.00),
("Panera Bread", 450.00),
("Dunkin' Donuts", 750.00),
("Chipotle", 525.00),
("Subway", 475.00),
("Five Guys", 525.00),
("McDonald's", 800.00),
("Jack in the Box", 600.00);

SELECT * FROM departments;