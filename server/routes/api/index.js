const router = require("express").Router();

router.use("/tmdb", require("./tmdb"));

module.exports = router;
