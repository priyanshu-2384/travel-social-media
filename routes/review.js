const express = require('express');
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview,isLoggedIn, isOwnerReview, saveRedirectUrl} = require("../middleware.js");



//Reviews Post Route
router.post("/", validateReview, isLoggedIn ,wrapAsync(async (req,res)=> {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "Review Added!");
    console.log("new Review Saved");
    res.redirect(`/listings/${req.params.id}`);
}));

//Delete Review Route
router.delete("/:reviewId",isLoggedIn,saveRedirectUrl,isOwnerReview,wrapAsync(async (req,res) => {
    let {id,reviewId } = req.params;
    await Listing.findByIdAndUpdate(id , {$pull :{reviews : reviewId} } );
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;