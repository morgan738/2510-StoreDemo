const client = require("./client");
const { createProduct } = require("./products");
const { createUser } = require("./users");
const { fetchOrders, updateOrder } = require("./orders");
const { createLineItem, updateLineItem } = require("./lineItems");

const seed = async () => {
  const SQL = `
    DROP TABLE IF EXISTS line_items;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;

    CREATE TABLE users(
      id UUID PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100)
    );

    CREATE TABLE products(
      id UUID PRIMARY KEY,
      name VARCHAR(100) UNIQUE NOT NULL,
      price INTEGER NOT NULL
    );

    CREATE TABLE orders(
      id UUID PRIMARY KEY,
      is_cart BOOLEAN NOT NULL DEFAULT true,
      user_id UUID REFERENCES users(id) NOT NULL
    );

    CREATE TABLE line_items(
      id UUID PRIMARY KEY,
      order_id UUID REFERENCES orders(id) NOT NULL,
      product_id UUID REFERENCES products(id) NOT NULL,
      quantity INTEGER DEFAULT 1,
      CONSTRAINT product_and_order_key UNIQUE(product_id, order_id)
    );
  `;

  await client.query(SQL);

  const [protein, clock, watch, steamDeck] = await Promise.all([
    createProduct({ name: "protein powder", price: 55 }),
    createProduct({ name: "clock", price: 20 }),
    createProduct({ name: "watch", price: 400 }),
    createProduct({ name: "steam deck", price: 599 }),
  ]);

  const [morgan, ethyl, dwayne, pawan] = await Promise.all([
    createUser({ username: "morgan", password: "123" }),
    createUser({ username: "ethyl", password: "ethyl123" }),
    createUser({ username: "dwayne the rock johnson", password: "daRock" }),
    createUser({ username: "pawan", password: "pDawg" }),
  ]);

  let orders = await fetchOrders(ethyl.id);
  let cart = orders.find((order) => {
    return order.is_cart;
  });
  let lineItem = await createLineItem({
    order_id: cart.id,
    product_id: protein.id,
  });
  lineItem.quantity++;
  await updateLineItem(lineItem);
  lineItem = await createLineItem({
    order_id: cart.id,
    product_id: steamDeck.id,
  });
  cart.is_cart = false;
  await updateOrder(cart);

  console.log("created tables and seeded data");
};

module.exports = {
  client,
  seed,
};
