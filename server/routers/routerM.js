const router = require("express").Router()
const controler = require('../controllers/controlM.js')


router.get('/getCoins/:user_id', controler.getTheCoinsFromUser)
router.post('/postEvent', controler.handlePostReaquestCreateEvent)
router.get('/favoriteevent/:user_id', controler.selectFavoriteEventsForUser)
router.delete('/removefromfavorite/:event_id/:user_id', controler.deleteEventFromFavorite)

module.exports = router;