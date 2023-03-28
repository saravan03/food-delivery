var express = require("express");
var router = express.Router();

const validatorSchema = require("../util/validationSchema");
const validator = require("../middleware/validator");
const { checkAuth } = require("../middleware/checkAuth");

const {
  addUser,
  login,
  changePassword,
  forgotPassword,
} = require("../controllers/user.controller");

/* POST /api/user */
router.post("/", validator(validatorSchema.addUserSchema, "body"), addUser);
/* POST /api/user/login */
router.post(
  "/login",
  validator(validatorSchema.loginUserSchema, "body"),
  login
);

/* POST /api/user/change-password */
router.post(
  "/change-password",
  checkAuth,
  validator(validatorSchema.changePasswordSchema, "body"),
  changePassword
);
/* POST /api/user/forgot-password */
router.post(
  "/forgot-password",
  validator(validatorSchema.forgotPasswordSchema, "body"),
  forgotPassword
);
module.exports = router;
