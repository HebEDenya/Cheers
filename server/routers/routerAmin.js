const router = require("express").Router()
const controler = require('../controllers/controllerAmin.js')

router.post('/user/login', controler.userLogin)
router.post('/user/register', controler.userRegister)
router.get('/user/login', controler.handelVerJWT)
router.put('/user/newpassword', controler.updatePassword)
router.post('/user/mail', controler.forgotPassword)
router.post('/user/form', controler.getMyChat)
router.get('/user/usrId', controler.getUser)
router.post('/user/message', controler.sendMessage)
router.get('/users/messages/:id', controler.getMessages)



module.exports = router;