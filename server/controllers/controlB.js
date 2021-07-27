const { getHome,postCategory } = require("../queries/query_user/queryB.js");
const {cloudinary} =require('../../cloudinary')

const homeGet = (req, res) => {
    getHome().then((result) => {
      res.send(result);
    });
  };
const CategoryPosting = (req,res) => { 
    const fileStr = req.body.image;
    cloudinary.uploader.upload(fileStr, {
     upload_preset :'dev_setups'})
     .then((result) => { 
       let image =result.url;
       postCategory(req.body, image)
       .then((result)=> {         
         res.status(201).json(result) 
       }).catch(()=> {res.status(401).send('request error')})
         
       }).catch(()=> { res.status(401).send('cloudinary error')})
}

  
module.exports = {
    homeGet,CategoryPosting
  };
