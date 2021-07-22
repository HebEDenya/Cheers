const router = require("express").Router()
const controler = require('../controllers/controlM.js')

router.get('/select', controler.selectRequest)
router.get('/getCoins', controler.getTheCoinsFromUser)
router.post('/postEvent', controler.handlePostReaquestCreateEvent)
router.get('/favoriteevent', controler.selectFavoriteEventsForUser)

module.exports = router;