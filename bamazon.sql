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
("Roasted Turkey & Avocado BLT", "Panera Bread", 8.99, 10),
("A dozen donuts", "Dunkin' Donuts", 9.99, 20),
("Build-your-own bowl", "Chipotle", 7.50, 15),
("Sweet Onion Chicken Teriyaki sandwich", "Subway", 7.75, 18),
("Bacon Cheeseburger", "Five Guys", 8.69, 15),
("20-piece Chicken McNuggets", "McDonald's", 5, 10),
("Jumbo Jack Cheeseburger", "Jack in the Box", 5.99, 12);

SELECT * FROM products;