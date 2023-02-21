# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index -> http://localhost:3000/storefront/products/ GET
- Show -> http://localhost:3000/storefront/products/:id GET
- Create [token required] -> http://localhost:3000/storefront/products/ POST
- [OPTIONAL] Top 5 most popular products -> update this if i decide to do it
- [OPTIONAL] Products by category (args: product category) -> update this if i decide to do it

#### Users
- Index [token required] -> http://localhost:3000/storefront/users GET 
- Show [token required] -> http://localhost:3000/storefront/users/:id GET
- Create N[token required] -> http://localhost:3000/storefront/users POST

#### Orders
- Current Order by user (args: user id)[token required] -> http://localhost:3000/storefront/users/:id/orders GET
- [OPTIONAL] Completed Orders by user (args: user id)[token required] -> update this if i decide to do it


## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

Table: Products (id:Primary Serial Key [foreign key to orders table], name:varchar, price:number)

#### User
- id
- firstName
- lastName
- password

Table: Users (id: Primary Serial Key[foreign key to orders table], first_name:varchar, last_name:varchar, user_name:varchar, password:text)

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

Table: Orders (id: Primary Serial Key, product_id:products(id), quantity:number, user_id:users(id), status:varchar)

