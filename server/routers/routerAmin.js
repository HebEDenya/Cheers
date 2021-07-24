const router = require("express").Router()
const controler = require('../controllers/controllerAmin.js')

router.post('/user/login', controler.userLogin)
router.post('/user/register', controler.userRegister)
router.get('/user/auth', controler.handelVerJWT)


module.exports = router;