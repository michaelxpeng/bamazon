# bamazon

## Overview

In this homework assignment for Rutgers Coding Bootcamp, students were asked to create an Amazon-like storefront with MySQL. The app will take in orders from customers and deplete stock from the store's inventory. As a bonus task, students can program their app to track product sales across their store's departments and then provide a summary of the highest-grossing departments in the store.

My version of the app includes the signature meals from top fast-food restaurants across the country.

## What each command should do
1. node bamazonCustomer.js
  * Running this application will first display all of the meals available for sale. Include the ids, names, and prices of meals for sale.
  * The app should then prompt users with two messages.
    * The first should ask them the ID of the meal they would like to buy.
    * The second message should ask how many orders of the meal they would like to buy.
  * Once the customer has placed the order, the application should check if the restaurant has enough of the meal to meet the customer's request.
    * If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
  * If the restaurant does have enough of the meal, the app should fulfill the customer's order.
    * This means updating the SQL database to reflect the remaining quantity.
    * Once the update goes through, show the customer the total cost of their purchase.
2. node bamazonManager.js.
  * Running this application will:
    * List a set of menu options:
      * View Products for Sale
      * View Low Inventory
      * Add to Inventory
      * Add New Product
  * If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
  * If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
  * If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
  * If a manager selects Add New Product, it should allow the manager to add a completely new meal to the restaurant.