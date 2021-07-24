const { getHome } = require("../queries/query_user/queryB.js");

const homeGet = (req, res) => {
    getHome().then((result) => {
      res.send(result);
    });
  };

  
module.exports = {
    homeGet,
  };
