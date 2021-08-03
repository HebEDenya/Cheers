const router = require("express").Router();
const controlerB = require('../controllers/controlB.js');

router.get('/home/:user_id', controlerB.homeGet);
router.post('/admin/postCategory', controlerB.CategoryPosting);
router.get('/categories',controlerB.gettingGategories);
router.post('/favorite',controlerB.addToFav);
router.get('/categoryEvents',controlerB.ChoseCategory)
router.get('/singlefavorite/:event_id/:user_id', controlerB.verifyFavorites)
router.get('/verifying/:event_id/:user_id',controlerB.checkLike);
module.exports = router;