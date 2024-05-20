const express = require('express');
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");
const Review = require('../models/review.js');
const listingController = require("../controllers/listing.js")

//Index Route 
router.get("/", wrapAsync(listingController.index));

//Get Route Top Rated
router.get("/topRated", wrapAsync(listingController.mostReviewed));

//New Route
router.get("/new",isLoggedIn, listingController.createListingForm);
router.post("/",validateListing, wrapAsync(listingController.createListing));

//filter by price
router.get("/filter", listingController.filterShow);

//Show Route,.... Always put this id route below as if not done, the routes which will be below this and have same url like : /listings/new here new will be intrepreted as id
router.get("/:id", wrapAsync(listingController.showListings));

//Edit route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.editListingForm));

//Update Route, PUT request
router.put("/:id",validateListing,isOwner, wrapAsync(listingController.editListing));

//Delete Route
router.delete("/:id",isLoggedIn,isOwner, wrapAsync(listingController.deleteListing));

module.exports = router;