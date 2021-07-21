const { handle,getHome } = require("../queries/query_user/queryM.js");
// const { getHome } = require("../queries/query_user/queryB.js");

const selectRequest = (req, res) => {
  handle().then((result) => {
    console.log(result)
    res.send(result);
  });
};
const homeGet = (req, res) => {
  getHome().then((result) => {
    console.log(result);
    res.send(result);
  });
};

module.exports = {
  selectRequest, homeGet,
};
