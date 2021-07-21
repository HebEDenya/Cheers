const router = require("express").Router()
const controler = require('../controllers/controlM.js');
const controlerB = require('../controllers/controlM.js')

router.get('/select', controler.selectRequest)
router.get('/home', controlerB.homeGet)

module.exports = router;