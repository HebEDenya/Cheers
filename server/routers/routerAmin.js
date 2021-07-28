const router = require("express").Router()
const controler = require('../controllers/controllerAmin.js')

router.post('/user/login', controler.userLogin)
router.post('/user/register', controler.userRegister)
router.get('/user/login', controler.handelVerJWT)
router.put('/user/newpassword', controler.updatePssword)
router.post('/user/mail', controler.resetPassword)



module.exports = router;