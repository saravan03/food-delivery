const express = require("express");
const router = express.Router();

// const apiCategoryRouter = require("./api/gameCategory");
// const apiGameRouter = require("./api/game");
const apiUserRouter = require("./user.routes");
const apiHomeRouter = require("./home.routes");
// const apiEnquiryRouter = require("./api/enquiry");

// router.use("/api/game-category", apiCategoryRouter);
// router.use("/api/game", apiGameRouter);
router.use("/user", apiUserRouter);
router.use("/home", apiHomeRouter);
// router.use("/api/enquiry", apiEnquiryRouter);

module.exports = router;
