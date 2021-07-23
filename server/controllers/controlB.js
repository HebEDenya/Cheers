const { getHome } = require("../queries/query_user/queryB.js");

const homeGet = (req, res) => {
    getHome().then((result) => {
      console.log(result);
      res.send(result);
    });
  };

  
module.exports = {
    homeGet,
  };
