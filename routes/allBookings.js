const express = require('express');
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Booking = require('../models/booking.js');
const { isAvailable, isLoggedIn } = require('../middleware.js');
const planController = require('../controllers/allBookings.js');
const multer = require('multer');
const {storage} = require('../cloudConfig.js');
const upload = multer({storage});   //multer will save the uploads , which are done using it in the cloud storage of cloudinary

// Get Route for search page
router.get("/", wrapAsync(planController.planSearch));

// Get Route for specific plan page, protected by isLoggedIn middleware
router.post("/searchPlan", isLoggedIn, wrapAsync(planController.planPage));

// Post Route for creating a new plan, protected by isLoggedIn middleware
router.post("/createPlan",upload.single('image'), isLoggedIn, wrapAsync(planController.createPlan));

// Commented out post route for filtering, make sure to uncomment if needed
// router.post("/", wrapAsync(allBookingController.filter));

module.exports = router;
