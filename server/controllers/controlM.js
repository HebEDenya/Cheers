const {handle, queryPostRequestCreateEvent} = require('../queries/query_user/queryM.js')

const selectRequest = (req, res) => {
  handle().then((result) => {
    res.send(result);
  });
};

const handlePostReaquestCreateEvent = (req,res) => {    
    queryPostRequestCreateEvent(req.body).then((result) => {console.log(result);})
}

module.exports = {
    selectRequest,
    handlePostReaquestCreateEvent,
    
}
