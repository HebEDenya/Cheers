const {
  handle,
  update,
  getEvent,
} = require("../queries/query_user/queriesAz.js");

const selectRequest = (req, res) => {
  handle(req)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
    });
};

const updateRequest = (req, res) => {
  let params = req.params;
  let body = req.body;
  update(params, body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
    });
};

const getEventRequest = (req, res) => {
  getEvent(req)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = {
  selectRequest,
  updateRequest,
  getEventRequest,
};
