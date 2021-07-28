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
  return database.query(
    `SELECT EVENT.title, EVENT.category, EVENT.description, EVENT.image, EVENT.price, EVENT.start_time, EVENT.end_time, EVENT.location, EVENT.available_places, EVENT.event_id, USERS.user_id, USERS.username, USERS.user_image FROM EVENT INNER JOIN USERS ON EVENT.user_id=USERS.user_id WHERE EVENT.event_id=${req.params.event_id}`
  );
};

const voteEvent = (req) => {
  return database.query(`UPDATE EVENT SET available_places = available_places - 1 WHERE event_id=${req.params.event_id}`)
}

const unvoteEvent = (req) => {
  return database.query(`UPDATE EVENT SET available_places = available_places + 1 WHERE event_id=${req.params.event_id}`)
}

const selectFollowers = (event_id, user_id) => {
  return database.query(`SELECT * FROM FOLLOWERS WHERE followed_id=${event_id} AND followee_id=${user_id}`)
}

const deleteFollowers = (event_id, user_id) => {
  return database.query(`DELETE FROM FOLLOWERS WHERE followed_id=${event_id} AND followee_id=${user_id}`)
}

const insertFollower = (event_id, user_id) => {
  return database.query(`INSERT INTO FOLLOWERS (followee_id, followed_id) VALUES (${user_id}, ${event_id})`)
}

module.exports = {
  handle,
  update,
  getEvent,
  getPageEvent,
  voteEvent,
  unvoteEvent,
  selectFollowers,
  deleteFollowers,
  insertFollower,
};
