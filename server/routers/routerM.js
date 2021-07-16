const router = require("express").Router()
const controler = require('../controllers/controlM.js')

router.get('/select', controler.selectRequest)

module.exports = router;