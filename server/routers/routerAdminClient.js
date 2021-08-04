const router = require("express").Router()
const controler = require('../controllers/controlAdminClient.js');


// router.get('/select', controler.selectRequest)

router.get('/getCoins/:user_id', controler.getTheCoinsFromUser)
router.post('/postEvent', controler.handlePostReaquestCreateEvent)
router.get('/favoriteevent/:user_id', controler.selectFavoriteEventsForUser)
router.delete('/removefromfavorite/:event_id/:user_id', controler.deleteEventFromFavorite)
router.get('/listeofadmin', controler.HandleAminListe)
router.delete('/removeAdmin/:user_id', controler.handleRemoveAdmin)
router.post('/addadmin',controler.handleAddNewAdmin)
router.delete('/removevent/:event_id', controler.handleDeleteEventByAdmin)
router.post('/payments/init-payment', controler.handlePayment)
router.put('/paymentInfo/:user_id/:coins_quantity',controler.handelupdateCoins)
router.delete('/deleteCategory/:category_name',controler.handlDeleteCategory)


module.exports = router;