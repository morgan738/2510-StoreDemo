const client = require("./client");
const { v4 } = require("uuid");
const uuidv4 = v4;
const bcrypt = require("bcrypt");

const createUser = async (user) => {
  if (!user.username.trim() || !user.password.trim()) {
    throw Error("must have username and password");
  }
  user.password = await bcrypt.hash(user.password, 5);
  const SQL = `
        INSERT INTO users(id, username, password)
        VALUES ($1, $2, $3)
        RETURNING *
    `;
  const response = await client.query(SQL, [
    uuidv4(),
    user.username,
    user.password,
  ]);
  return response.rows[0];
};

module.exports = {
  createUser,
};
