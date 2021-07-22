const { handle } = require('../queries/query_user/queriesAz.js')

const selectRequest = (req, res) => {
  handle(req).then((result) => {
    res.send(result);
  });
};


module.exports = {
    selectRequest, 
}
