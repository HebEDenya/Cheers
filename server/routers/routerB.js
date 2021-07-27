const router = require("express").Router();
const controlerB = require('../controllers/controlB.js');

router.get('/home', controlerB.homeGet);
router.post('/admin/postCategory', controlerB.CategoryPosting);

module.exports = router;