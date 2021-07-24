const { database } = require("../../database/db.js");

const handle = (req) => {
  return database.query(`SELECT * FROM USERS WHERE user_id=${req.params.id}`);
};

const update = (params, body, avatarImg) => {
  return database.query(
    `UPDATE USERS SET description = '${body.description}', image = '${avatarImg}' WHERE user_id=${params.id}`
  );
};

const getEvent = (req) => {
  return database.query(`SELECT * FROM EVENT WHERE user_id=${req.params.id}`);
};

module.exports = {
  handle,
  update,
  getEvent,
};
