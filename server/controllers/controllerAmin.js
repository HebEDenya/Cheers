const {database} = require('../database/db.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const saltRounds = 10;
const nodemailer = require("nodemailer");


const resetPassword = () => {
  
  console.log('clicked')
  
  var transporter = nodemailer.createTransport({
      service: "gmail",
     
      auth: {
        user: 'khemissimohamedamin@gmail.com',
        pass: 'Amin+21696546196'
      }
    });
    //get id user by email 

    var mailOptions = {
      from: 'khemissimohamedamin@gmail.com',
      to: 'aminehamouda@hotmail.com',
      subject: 'Sending Email using Node.js',
      text: 'That was easy! liens/resetpassword/5 '
    };
    
    transporter.sendMail(mailOptions, function(err, info){
      if (err) {
        
        console.log('errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', err);
      } else {
        console.log('Email sent: ', info );
      }
    });
  }

const verifyJWT = (req, res, next) => {
  const token = req.headers[x-access-token]
  if(!token) {
    res.send("we need token!!!")
  } else {
    jwt.verify(token, process.env.HASHPASS, (err, decoded) => {
      if(err) {
        res.json({auth: false, message: "authentication faild"})
      } else {
        req.userId = decoded.id;
        next();
      }
    })
  }
}
const handelVerJWT = (verifyJWT, (req, res) => {
  res.send("you are auth successfully")
})
const userLogin = (req, res) => {
      const user_name = req.body.username;
      const user_password = req.body.password;
      //"SELECT * FROM USERS WHERE username= (" + user_name + ")"
      database.query(`SELECT * FROM USERS WHERE username = '${user_name}'`).then((result) => {
        if (result.length > 0) {
                bcrypt.compare(user_password, result[0].password, (err, response) => {
                  if (response) {
                    //create jwt token
                    const id = result[0].id
                    const token = jwt.sign({id}, process.env.HASHPASS, {
                      expiresIn: 300,
                    })
                    req.session.user = result;
                    const {user_id, image, description, coins_quantity,numberOfFollowers,type_user,username} = result[0]
                    res.status(200).json({auth: true, token: token, result: {user_id,image, description,coins_quantity,numberOfFollowers,type_user,username}})
                   
                  } else {
                    res.status(203).json({ message: 'wrong password...' })
                  }
                }) 
              } else {
                res.status(203).json({ message: ' username not exist...' })
              }
            })
          }
const userRegister = (req, res) => {
      const user_name = req.body.username;
      const user_email = req.body.email;
      const user_password = req.body.password;
      //hashing password
      bcrypt.hash(user_password, saltRounds, (err, hash) => {
        if (err) {
          res.status(400).send(err)
        }
        database.query(`INSERT INTO USERS (email,username, password) VALUES ('${user_email}','${user_name}','${hash}')`).then((result) => {
          res.status(200).send({ message: user_name +" "+'successfully register' })
        })
      })
    }

    const updatePssword = (req, res) => {
      const email = req.body.email;
      const newPassword = "";
        //encrpt req.body.newPassword
          //hashing password
      bcrypt.hash(req.body.newPassword, saltRounds, (err, hash) => {
        if (err) {
          res.status(400).send(err)
        } else {
         // newPassword = hash;
          database.query(`UPDATE USERS SET password = '${hash}' WHERE email = '${email}'`)
            .then((result) => {
              console.log(result);
              res.send(result);
            })
        }
      })
      
    }


module.exports = {
    userLogin,
    userRegister,
    handelVerJWT,
    verifyJWT,
    updatePssword,
    resetPassword
}