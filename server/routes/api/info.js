const router = require("express").Router();

const { index } = require("../../controller/InfoController.js");

router.post("/info", index);

module.exports = router;
