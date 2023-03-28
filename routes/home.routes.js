var express = require("express");
var router = express.Router();

const validatorSchema = require("../util/validationSchema");
const validator = require("../middleware/validator");
const { checkAuth } = require("../middleware/checkAuth");

const { fetchHome } = require("../controllers/home-page.controller");

/* GET /api/home */
router.get("/", checkAuth, fetchHome);

module.exports = router;
