const router = require("express").Router();
const controlerB = require('../controllers/controlB.js');

router.get('/home', controlerB.homeGet)

module.exports = router;