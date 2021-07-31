const {queryPostRequestCreateEvent, selectCoinsFromUsers, updateCoinsUsers, getCoinsUser,getFavoriteEventsOfThUser,
  selectEventById,removeEventFromFavorite, getAdminListe, removeAdmin,addNewAdmin, deleteEventByAdmin, deleteFromFavoriteByAdmin, updateCoinsAfterPurshase,deleteCategory } = require('../queries/query_user/queryM.js')
const {cloudinary} =require('../../cloudinary')
const bcrypt = require('bcrypt');
const axios = require('axios');
require('dotenv').config();
const saltRounds = 10;


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
    res.status(200).json(result)
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

//Get the Admin Liste
const HandleAminListe = (req,res) => {
  getAdminListe().then((result)=> {
    res.status(200).send(result)
  }).catch((err) => {res.status(400).send(err)})
}

//To remove admin from liste

const handleRemoveAdmin = (req, res)=> {
  const {user_id} = req.params
  removeAdmin(user_id).then(() => {
    res.status(200).send('Admin removed')
  }).catch((err) => {
    res.status(400).send(err)
  })
}
//to add new admin
const handleAddNewAdmin = (req, res) => {
  const {username, email,type_user,password} = req.body
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      res.status(400).send(err)
    }
    addNewAdmin(username, email,type_user,hash).then((result) => {
    res.status(200).send("added")
  }).catch((err)=> { res.status(401).send(err)})
  })
}

// to delete event by admin 
const handleDeleteEventByAdmin = (req, res) => {
  deleteFromFavoriteByAdmin(req.params.event_id).then(()=>
  deleteEventByAdmin(req.params.event_id).then(() => {
    res.status(200).send("event deleted")
  }).catch((err)=> { res.status(402).send(err)})
  
  ).catch((err)=> {res.status(402).send(err)})
  
}

//to handle payment 

const handlePayment = (req, res) => {
  const { price } = req.body
  axios.post('https://api.preprod.konnect.network/api/v1/payments/init-payment',{
    "receiverWallet": process.env.WALLETKEY,
    "amount": price*1000,
    "selectedPaymentMethod": "gateway",
    "token": "TND",
    "lastName": "Cheers",
    "email": "zahar.marwa.13@gmail.com",
    "successUrl": "http://localhost:3000/confirmedPayment",
    "failUrl": "http://localhost:3000/NotconfirmedPayment"
    }).then((result) => {
      res.status(200).send(result.data)
    }).catch(err=> {res.status(401).send(err)})

}
// update coins after pay
const handelupdateCoins = (req, res) => {
const {user_id,coins_quantity} = req.params
updateCoinsAfterPurshase(user_id, coins_quantity).then((result)=> {
  getCoinsUser(user_id).then((coins)=> {
    res.status(201).json(coins[0].coins_quantity);
  })
}).catch((err) => { res.status(401).send(err)})
}
//delete a category by admin

const handlDeleteCategory = (req, res) => {
  const {category_name} = req.params;
  deleteCategory(category_name).then((result)=> {
    if (result.affectedRows) {
      res.status(201).send("deleted")
    } else {
      res.status(200).send("not found")
    }
  }).catch((err) => {
    res.status(401).send(err)
  })
  }
module.exports = {
    handlePostReaquestCreateEvent,
    getTheCoinsFromUser,
    selectFavoriteEventsForUser,
    deleteEventFromFavorite,
    HandleAminListe,
    handleRemoveAdmin,
    handleAddNewAdmin,
    handleDeleteEventByAdmin,
    handlePayment,
    handelupdateCoins,
    handlDeleteCategory
}
