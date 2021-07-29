const router = require("express").Router();
const controler = require("../controllers/controlAz.js");

router.get("/events/:id", controler.getEventRequest);
router.get("/user/:id", controler.selectRequest);
router.put("/user/:id/updateprofil", controler.updateRequest);
router.get("/eventpage/:id", controler.getPageEventRequest);

module.exports = router;
