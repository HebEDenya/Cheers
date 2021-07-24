const {database} = require('../database/db.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
      console.log(user_name)
      //"SELECT * FROM USERS WHERE username= (" + user_name + ")"
      database.query(`SELECT * FROM USERS WHERE username = '${user_name}'`).then((result) => {
        console.log(result)
        if (result.length > 0) {
                bcrypt.compare(user_password, result[0].password, (err, response) => {
                  if (response) {
                    //create jwt token
                    const id = result[0].id
                    const token = jwt.sign({id}, "jwtSecret", {
                      expiresIn: 300,
                    })
                    req.session.user = result;
                    res.json({auth: true, token: token, result: result})
                  } else {
                    res.send({ message: 'wrong password...' })
                  }
                }) 
              } else {
                res.send({ message: ' username not exist...' })
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
          console.log(err)
        }
        database.query(`INSERT INTO USERS (email,username, password) VALUES ('${user_email}','${user_name}','${hash}');`).then((result) => {
          res.send({ message: user_name +" "+'successfully register' })
        })
      })
    }
module.exports = {
    userLogin,
    userRegister,
    handelVerJWT,
    verifyJWT
}