const router = require("express").Router();
const controler = require("../controllers/controlAz.js");

router.get("/user/:id", controler.selectRequest);

module.exports = router;
