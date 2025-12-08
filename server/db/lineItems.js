const client = require("./client");
const { v4 } = require("uuid");
const uuidv4 = v4;

const createLineItem = async (lineItem) => {
  const SQL = `
        INSERT INTO line_items(id, order_id, product_id)
        VALUES ($1, $2, $3)
        RETURNING *
    `;
  const response = await client.query(SQL, [
    uuidv4(),
    lineItem.order_id,
    lineItem.product_id,
  ]);
  return response.rows[0];
};

const updateLineItem = async (lineItem) => {
  const SQL = `
        UPDATE line_items
        SET quantity = $1
        WHERE id = $2
        RETURNING *
    `;
  if (lineItem.quantity <= 0) {
    throw Error("a line time quantity must be greater than zero");
  }
  const response = await client.query(SQL, [lineItem.quantity, lineItem.id]);
  return response.rows[0];
};

module.exports = {
  createLineItem,
  updateLineItem,
};
