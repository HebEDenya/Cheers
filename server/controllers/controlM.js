const {handle, queryPostRequestCreateEvent, selectCoinsFromUsers, updateCoinsUsers, getCoinsUser} = require('../queries/query_user/queryM.js')
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
        queryPostRequestCreateEvent(req.body, image)
        .then((result)=> {
          if (result.affectedRows!==0) {
            selectCoinsFromUsers().then((result) => {
              let coins = result[0].coins_quantity -2;
              updateCoinsUsers(coins).then(() => { console.log('updated');})
            }).catch(() => { res.status(400).send('Error in update coins')})
          }
          res.status(201).json(result) 
        }).catch(()=> {res.status(401).send('error in post request')})
          
        }).catch(()=> { res.status(401).send('erro in cloudinary')})
}

//to get the coins of the users 
const getTheCoinsFromUser = (req, res) => {
  
} 

module.exports = {
    handlePostReaquestCreateEvent,
    selectRequest,
    
}
