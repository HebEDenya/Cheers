const { database } = require("../database/db.js");
const {registerInputValidation} = require('../validationInput.js');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const saltRounds = 10;
const nodemailer = require("nodemailer");
const moment = require("moment");

const getMessages = (req, res) => {
  const eventid = req.params.id;
  console.log(eventid);
  database
    .query(`SELECT * FROM MESSAGE where event_id = '${eventid}'`)
    .then((result) => {
      if (result.length > 0) {
        res.status(200).send(result);
      } else {
        res.status(203).json({ message: " user unavailble..." });
      }
    })
    .catch((err) => console.log(err));
};
const forgotPassword = (req, res) => {
  /*forgot password*/
  let email = req.body.email;
  var transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: process.env.MAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  database
    .query(`SELECT * FROM USERS WHERE email = '${email}'`)
    .then((result) => {
      if (result.length > 0) {
        var htmlMail = "";
        htmlMail = "";
        htmlMail = htmlMail + "Hello " + result[0].username + ", \n";
        htmlMail =
          htmlMail +
          'To Reset your Password, please click on this Link:<b> <a href="http://localhost:3000/reset">Here </a></b>';
        htmlMail = htmlMail + " \nBest Regards, \nCheers Team";
        var mailOptions = {
          from: `Nodemailer <noreply.${process.env.MAIL}>`,
          to: email,
          subject: "Reset your password for Cheers account",
          text:
            "Hello " +
            result[0].username +
            ", \nTo Reset your Password, please click on this Link: http://localhost:3000/reset/" +
            result[0].user_id +
            "\nBest Regards, \nCheers Team",
          // html: htmlMail,
        };
        transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            res.send({
              message:
                "An error has occured!",
              status: "ko",
            });
          } else {
            res.send({
              message:
                "Please check your emails we just sent you a reset password link !",
              status: "ok", 
            });
          }
        });
      } else {
        res.send({
          message: "There no Cheers account associate to the provided email !",
          status: "ko",
        });
      }
    });
};

const verifyJWT = (req, res, next) => {
  const token = req.headers[x - access - token];
  if (!token) {
    res.send("we need token!!!");
  } else {
    jwt.verify(token, process.env.HASHPASS, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "authentication faild" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};
const handelVerJWT =
  (verifyJWT,
  (req, res) => {
    res.send("you are auth successfully");
  });
const userLogin = (req, res) => {
  const user_name = req.body.username;
  const user_password = req.body.password;
  //"SELECT * FROM USERS WHERE username= (" + user_name + ")"
  database
    .query(`SELECT * FROM USERS WHERE username = '${user_name}'`)
    .then((result) => {
      if (result.length > 0) {
        bcrypt.compare(user_password, result[0].password, (err, response) => {
          if (response) {
            //create jwt token
            const id = result[0].id;
            const token = jwt.sign({ id }, process.env.HASHPASS, {
              expiresIn: 300,
            });
            req.session.user = result;
            const {
              user_id,
              image,
              description,
              coins_quantity,
              numberOfFollowers,
              type_user,
              username,
            } = result[0];
            res
              .status(200)
              .json({
                auth: true,
                token: token,
                result: {
                  user_id,
                  image,
                  description,
                  coins_quantity,
                  numberOfFollowers,
                  type_user,
                  username,
                },
              });
          } else {
            res.status(203).json({ message: "wrong password..." });
          }
        });
      } else {
        res.status(203).json({ message: " username not exist..." });
      }
    });
};
const userRegister = (req, res) => {
  const user_name = req.body.username;
  const user_email = req.body.email;
  const user_password = req.body.password;
  const { error } = registerInputValidation(req.body)
  if (error) return res.status(203).send(error.details[0].message)
  //hashing password
  bcrypt.hash(user_password, saltRounds, (err, hash) => {
    if (err) {
      res.status(400).send(err);
    }
    database
      .query(
        `INSERT INTO USERS (email,username, password) VALUES ('${user_email}','${user_name}','${hash}')`
      )
      .then((result) => {
        res
          .status(200)
          .send({ message: user_name + " " + "successfully register" });
      }).catch(err=> res.status(203).send(err))
  });
};

const updatePassword = (req, res) => {
  const userId = req.body.userId;
  const newPassword = "";
  //encrpt req.body.newPassword
  //hashing password
  bcrypt.hash(req.body.newPassword, saltRounds, (err, hash) => {
    if (err) {
      res.status(400).send(err);
    } else {
      // newPassword = hash;
      database
        .query(
          `UPDATE USERS SET password = '${hash}' WHERE user_id = '${userId}'`
        )
        .then((result) => {
          console.log(result);
          res.send(result);
        });
    }
  });
};

const getMyChat = (req, res) => {
  const data = req.body.data;
  var transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: "khemissimohamedamin@gmail.com",
      pass: "Amin+21696546196",
    },
  });
  //"SELECT * FROM USERS WHERE username= (" + user_name + ")"
  database
    .query(`SELECT * FROM MESSAGE WHERE sender_id = '${receiver_id}'`)
    .then((result) => {
      console.log(result);

      var mailOptions = {
        from: data.email,
        to: "khemissimohamedamin@gmail.com",
        subject: `Message Form ${data.firstName}`,
        html: `
          
          <h3>Informations</h3>
          <ul>
          <li>First Name: ${data.firstName}</li>
          <li>Last Name: ${data.lastName}</li>
          <li>E-mail: ${data.email}</li>
          </ul>

          <h3>Message</h3>
          <p>${data.text}</p>
          `,
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log("There no email !", err);
          res.send({
            message:
              "There no Cheers account associate to the provided email !",
            status: "ko",
          });
        } else {
          console.log("Email sent: ", info);
          res.send({
            message: "Please check your emails we just sent you a Message !",
            status: "ok",
          });
        }
      });
    });
};
const sendMessage = (req, res) => {
  const senderid = req.body.senderid;
  const receiverid = req.body.receiverid;
  const eventid = req.body.eventid;
  const time = moment(new Date()).format("YYYY-MM-DD");
  const text = req.body.text;
  //hashing password

  database
    .query(
      `INSERT INTO MESSAGE (sender_id,receiver_id, event_id,time,text) VALUES ('${senderid}','${receiverid}','${eventid}','${time}','${text}')`
    )
    .then(() => {
      res.status(200).send({ message: "messgage saved" });
    })
    .catch((error) => {
      res.status(400).send(error);
      console.log(error.message);
    });
};
const getUser = (req, res) => {
  const user_id = req.body.userid;
  console.log(user_id);
  database
    .query(`SELECT * FROM USERS WHERE user_id = '${user_id}'`)
    .then((result) => {
      if (result.length > 0) {
        res.send(result);
        res.status(200).json({ message: "user availble" });
      } else {
        res.status(203).json({ message: " user unavailble..." });
      }
    });
};

module.exports = {
  userLogin,
  userRegister,
  handelVerJWT,
  verifyJWT,
  updatePassword,
  forgotPassword,
  getMyChat,
  getUser,
  sendMessage,
  getMessages,
};
