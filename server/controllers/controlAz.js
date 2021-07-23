const { handle, update } = require('../queries/query_user/queriesAz.js')

const selectRequest = (req, res) => {
  handle(req).then((result) => {
    res.send(result);
  });
};

const updateRequest = (req, res) => {
  let params = req.params
  let body = req.body
  update(params, body).then((result) => {
    res.send(result);
  });
};


module.exports = {
    selectRequest,
    updateRequest,
}
