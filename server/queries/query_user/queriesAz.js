const { database } = require("../../database/db.js");

const handle = (req) => {
  return database.query(`SELECT * FROM USERS WHERE user_id=${req.params.id}`);
};

const update = (params, body, avatarImg) => {
  return database.query(
    `UPDATE USERS SET user_description = '${body.description}', user_image = '${avatarImg}' WHERE user_id=${params.id}`
  );
};

const getEvent = (req) => {
  return database.query(`SELECT * FROM EVENT WHERE user_id=${req.params.id}`);
};

const getPageEvent = (req) => {
  // return database.query(`SELECT * FROM EVENT WHERE event_id=${req.params.id}`)
  return database.query(`SELECT EVENT.title, EVENT.category, EVENT.description, EVENT.image, EVENT.price, EVENT.start_time, EVENT.end_time, EVENT.location, EVENT.available_places, EVENT.event_id, USERS.user_id, USERS.username, USERS.user_image FROM EVENT INNER JOIN USERS ON EVENT.event_id=USERS.user_id WHERE event_id=${req.params.id}`)
}

module.exports = {
  handle,
  update,
  getEvent,
  getPageEvent,
};
