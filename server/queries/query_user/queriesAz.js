const { database } = require("../../database/db.js");

const handle = (req) => {
  return database.query(`SELECT * FROM USERS WHERE user_id=${req.params.id}`);
};

module.exports = {
  handle,
};
