const { queryPostRequestCreateEvent } = require('../queries/query_user/queryM.js')


const handlePostReaquestCreateEvent = (req,res) => {    
    queryPostRequestCreateEvent(req.body).then((result) => {console.log(result);})
}

module.exports = {
    handlePostReaquestCreateEvent,
}
