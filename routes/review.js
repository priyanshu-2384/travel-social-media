const express = require('express');
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview,isLoggedIn, isOwnerReview, saveRedirectUrl} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");


//Reviews Post Route
router.post("/", validateReview, isLoggedIn ,wrapAsync(reviewController.createReview));

//Delete Review Route
router.delete("/:reviewId",isLoggedIn,saveRedirectUrl,isOwnerReview,wrapAsync(reviewController.destroyReview));

module.exports = router;