const {database} = require('../database/db.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const saltRounds = 10;

const verifyJWT = (req, res, next) => {
  const token = req.headers[x-access-token]
  if(!token) {
    res.send("we need token!!!")
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
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
module.exports = {
    userLogin,
    userRegister,
    handelVerJWT,
    verifyJWT
}