const {handle, queryPostRequestCreateEvent, selectCoinsFromUsers, updateCoinsUsers} = require('../queries/query_user/queryM.js')

const selectRequest = (req, res) => {
  handle().then((result) => {
    res.send(result);
  });
};

// post event + update the coins (-20 for each event created)
const handlePostReaquestCreateEvent = (req,res) => {    
    queryPostRequestCreateEvent(req.body)
    .then((result) => {res.status(201).send(result)
      selectCoinsFromUsers()
      .then((result) => { 
        let coins = result[0].coins_quantity -20 
      updateCoinsUsers(coins).then((result) => {console.log(result);})
      })
      .catch(e=> { res.status(400).send(e)})
    })
    .catch((e) => { res.status(401).send(e)})
}

module.exports = {
    selectRequest,
    handlePostReaquestCreateEvent,
    
}
