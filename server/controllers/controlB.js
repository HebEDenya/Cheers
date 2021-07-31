const { getHome,getCategory,postCategory,getCategories,PlusFavorite,SelectFav } = require("../queries/query_user/queryB.js");
const { removeEventFromFavorite} = require('../queries/query_user/queryM.js');
const {cloudinary} =require('../../cloudinary')

const homeGet = (req, res) => {
    getHome().then((result) => {
      res.send(result);
    });
  };
const CategoryPosting = (req,res) => { 
       postCategory(req.body)
       .then((result)=> {  
         res.status(201).json("added") 
       }).catch(()=> {res.status(401).send('request error')})
}

const gettingGategories = (req,res) => {
  getCategories().then((result) => {
    res.send(result)
  })
}

const addToFav = (req,res) => {
 const {user_id, event_id} = req.body
SelectFav(user_id,event_id).then((result) => {
  if(result.length){
    removeEventFromFavorite(event_id,user_id).then(
      res.status(200).send('removed')
    )
    .catch((err) => {
        res.status(400).send(err)
      })
  }else {
    PlusFavorite(user_id, event_id).then((result) => {
         res.status(201).send('added to favorite')
       })
       .catch((err) => {
        res.status(400).send(err)
      })
  }
})
.catch((err) => {
  res.status(401)
})
}

const ChoseCategory = (req, res) => {
  getCategory().then((result) => {
    res.send(result);
  });
};

const verifyFavorites = (req, res) => {
  const { event_id, user_id} = req.params;
  SelectFav(event_id, user_id)
    .then((result) => {
      if (result.length) {
        res.status(200).send("Favorite");
      } else {
        res.status(200).send("UnFavorite")
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};



module.exports = {
    homeGet,
    CategoryPosting,
    gettingGategories,
    addToFav,
    ChoseCategory,
    verifyFavorites,
  };
