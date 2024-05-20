const Listing = require("../models/listing.js");
const Booking = require('../models/booking.js');

module.exports.allBookings = async (req,res) => {
    let allBookings = await Booking.find({}).populate({path:"listing",populate : {
        path : "owner"
    }}).populate("customer");
    res.render("allBookings/show.ejs",{allBookings});
};

module.exports.filter = async (req,res) => {
    let start = new Date(req.body.from);
    let end = new Date(req.body.to);
    let x = await Booking.find({}).populate({path:"listing",populate : {
        path : "owner"
    }}).populate("customer");
    console.log(start);
    console.log(end);
    let allBookings = x.filter((obj) => {
        let y = new Date(obj.bookedAt);
        let r = y.toISOString();
        r = r.replace(r.substring(10),"T00:00:00.000Z");  //making time of every date same
        let curr = new Date(r);
        if(curr>=start && curr<=end) {
           return obj;
        }
    });
    console.log(allBookings);
    res.render("allBookings/show.ejs",{allBookings});
};