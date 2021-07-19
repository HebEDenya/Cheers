const router = require("express").Router()
const controler = require('../controllers/controlM.js')

router.get('/select', controler.selectRequest)
router.post('/postEvent', controler.handlePostReaquestCreateEvent)

module.exports = router;