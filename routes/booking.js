const express = require('express');
const router = express.Router({mergeParams:true});
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Booking = require('../models/booking.js');
const { isAvailable } = require('../middleware.js');
const bookingController = require('../controllers/booking.js');

//get req Booking  New Booking Route
router.get("/", wrapAsync(bookingController.newBookingForm));

//post req booking Create Route
router.post("/",isAvailable, wrapAsync(bookingController.newBooking));

module.exports = router;