const {handle, queryPostRequestCreateEvent, selectCoinsFromUsers, updateCoinsUsers, getCoinsUser,getFavoriteEventsOfThUser,
  selectEventById,removeEventFromFavorite} = require('../queries/query_user/queryM.js')
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
            selectCoinsFromUsers(req.body.user_id).then((result) => {
              let coins = result[0].coins_quantity -2;
              updateCoinsUsers(coins,req.body.user_id).then(() => { console.log('updated');})
            }).catch(() => { res.status(400).send('Error in update coins')})
          }
          res.status(201).json(result) 
        }).catch(()=> {res.status(401).send('error in post request')})
          
        }).catch(()=> { res.status(401).send('erro in cloudinary')})
}

//to get the coins of the users 
const getTheCoinsFromUser = (req, res) => {
  const{user_id}= req.params;
  getCoinsUser(user_id).then((result)=> {
    res.status(200).json(result)
  }).catch((err)=> { res.status(404).json(err)})
} 
//to select all the favorite event of one user 
const selectFavoriteEventsForUser =  (req, res) => {
  const {user_id} = req.params
  getFavoriteEventsOfThUser(user_id).then((result)=> {
     let favorite = result.map((element) => {
      return selectEventById(element.event_id).then(item => {
        return item[0]
      }).catch(err=> {res.status(402).send(err)})
    })
    Promise.all(favorite)
    .then(result=> {res.status(200).send(result)})
    .catch(err=> {res.status(400).send(err)})
  })
  .catch(err=> {res.status(401).send(err)})
}

//Remove event from favorite 
const deleteEventFromFavorite = (req, res) => {
  const {event_id, user_id} =req.params;
  removeEventFromFavorite(event_id, user_id).then((result)=> {
    res.status(200).json('Event removed')
  }).catch((err)=> {res.status(401).send(err)})
}

module.exports = {
    handlePostReaquestCreateEvent,
    selectRequest,
    getTheCoinsFromUser,
    selectFavoriteEventsForUser,
    deleteEventFromFavorite,
}
