const router = require("express").Router()
const controler = require('../controllers/controlM.js');


// router.get('/select', controler.selectRequest)

router.get('/getCoins/:user_id', controler.getTheCoinsFromUser)
router.post('/postEvent', controler.handlePostReaquestCreateEvent)
router.get('/favoriteevent/:user_id', controler.selectFavoriteEventsForUser)
router.delete('/removefromfavorite/:event_id/:user_id', controler.deleteEventFromFavorite)
router.get('/listeofadmin', controler.HandleAminListe)
router.delete('/removeAdmin/:user_id', controler.handleRemoveAdmin)
router.post('/addadmin',controler.handleAddNewAdmin)
router.delete('/removevent/:event_id', controler.handleDeleteEventByAdmin)

module.exports = router;