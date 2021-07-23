const router = require("express").Router();
const controler = require("../controllers/controlAz.js");

router.get("/user/:id", controler.selectRequest);
router.put("/user/:id/updateprofil", controler.updateRequest);

module.exports = router;
