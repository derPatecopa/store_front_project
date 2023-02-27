# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index -> http://localhost:3000/products/ GET
- Show -> http://localhost:3000/products/:id GET
- Create [token required] -> http://localhost:3000/products/ POST
- [OPTIONAL] Top 5 most popular products -> update this if i decide to do it
- [OPTIONAL] Products by category (args: product category) -> update this if i decide to do it

#### Users
- Index [token required] -> http://localhost:3000/users GET 
- Show [token required] -> http://localhost:3000/users/:id GET
- Create [token required] -> http://localhost:3000/users POST
There is a seperate authenticate endpoint at -> http://localhost:3000/authenticate

#### Orders
- Current Order by user (args: user id)[token required] -> http://localhost:3000/users/:id/orders GET
- [OPTIONAL] Completed Orders by user (args: user id)[token required] -> update this if i decide to do it

#### Order_product
- Index http://localhost:3000/orderproducts GET
- Show http://localhost:3000/orderproducts/:id GET
- Create http://localhost:3000/orderproducts POST

## Data Shapes
#### Product
-  id: Number
- name: String -> VARCHAR(200)
- price: Number
- [OPTIONAL] category

Table: Products (id:Primary Serial Key [foreign key to orders table], name:varchar, price:number)

#### User
- id: Number    
- firstName: String -> VARCHAR(250)
- lastName: String -> VARCHAR(250)
- password: String -> TEXT

Table: Users (id: Primary Serial Key[foreign key to orders table], first_name:varchar, last_name:varchar, user_name:varchar, password:text)

#### Orders
- id: Number
- id of each product in the order: Number
- quantity of each product in the order: Number
- user_id: Number
- status of order (active or complete): String -> VARCHAR(100)


Table: Orders (id: Primary Serial Key, product_id:products(id), quantity:number, user_id:users(id), order_status order_status DEFAULT 'active')

#### Order_Product
- id: Number
- order_id: Number
- product_id: Number
- quantity: Number,
- user_id: Number

Table: order_products (id SERIAL PRIMARY KEY, order_id INT REFERENCES orders(id), product_id INT REFERENCES products(id), quantity INT, user_id INT REFERENCES user(id));