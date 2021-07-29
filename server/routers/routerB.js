const router = require("express").Router();
const controlerB = require('../controllers/controlB.js');

router.get('/home', controlerB.homeGet);
router.post('/admin/postCategory', controlerB.CategoryPosting);
router.get('/categories',controlerB.gettingGategories)
router.post('/favorite',controlerB.addToFav)

module.exports = router;