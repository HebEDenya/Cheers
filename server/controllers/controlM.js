const {handle, queryPostRequestCreateEvent, selectCoinsFromUsers, updateCoinsUsers} = require('../queries/query_user/queryM.js')
const {cloudinary} =require('../../cloudinary')

const selectRequest = (req, res) => {
  handle().then((result) => {
    res.send(result);
  });
};

// post event + update the coins (-20 for each event created)
const handlePostReaquestCreateEvent =  (req,res) => {    
     const fileStr = req.body.image;
     cloudinary.uploader.upload(fileStr, {
      upload_preset :'dev_setups'})
      .then((result) => { 
        let image =result.url;
        console.log(image);
        queryPostRequestCreateEvent(req.body, image)
        .then((result)=> {
          res.status(201).send(result) }) 
          selectCoinsFromUsers()
          .then((result) => {
            let coins = result[0].coins_quantity -20;
            updateCoinsUsers(coins)
            .then(() => {
              res.status(201).send('coins updated')
            })
            .catch(() => {
              res.status(400).send('error in update')
            })
          })
          .catch(()=>{
            res.status(400).send('eroor')
          })
        }).catch((err)=> { res.status(402).send('cloudinary error')})
}

module.exports = {
    handlePostReaquestCreateEvent,
    selectRequest,
    
}
