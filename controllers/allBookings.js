const User = require("../models/user.js");
const Booking = require('../models/booking.js');

// module.exports.allBookings = async (req,res) => {
//     let allBookings = await Booking.find({}).populate({path:"listing",populate : {
//         path : "owner"
//     }}).populate("customer");
//     res.render("allBookings/show.ejs",{allBookings});
// };

// module.exports.filter = async (req,res) => {
//     let start = new Date(req.body.from);
//     let end = new Date(req.body.to);
//     let x = await Booking.find({}).populate({path:"listing",populate : {
//         path : "owner"
//     }}).populate("customer");
//     console.log(start);
//     console.log(end);
//     let allBookings = x.filter((obj) => {
//         let y = new Date(obj.bookedAt);
//         let r = y.toISOString();
//         r = r.replace(r.substring(10),"T00:00:00.000Z");  //making time of every date same
//         let curr = new Date(r);
//         if(curr>=start && curr<=end) {
//            return obj;
//         }
//     });
//     console.log(allBookings);
//     res.render("allBookings/show.ejs",{allBookings});
// };
module.exports.planSearch = (req, res) => {
    res.render("booking/search");
}

module.exports.planPage = async (req, res) => {
    console.log("hello");
    let { city, month } = req.body;
    try {
        let plan = await Booking.findOne({ city: city, month: month }).populate('intrestedUsers').populate('owner').populate({ path: "reviews", populate: [{ path: "author"},{ path : "replies", populate : "author"}]});
        if (plan) {
            res.render("booking/planPage", { plan });
            return;
        } 
        req.flash("success", "No Plans Matched, Create Your Own");
        res.redirect("/plan");
        
    } catch (err) {
        // Handle errors
        console.error("Error finding plan:", err);
        req.flash("error", "An error occurred while searching for the plan.");
        res.redirect("/plan");
    }
}

module.exports.createPlan = async (req, res) => {
    console.log("Hello");
    let { city, month } = req.body; // Extract city and month from req.body
    try {
        let currUser = await User.findOne({ username: res.locals.currUser.username });
        let newPlan = new Booking();
        newPlan.month = month;
        newPlan.city = city;
        newPlan.owner = currUser;
        newPlan.image = { url: req.file.path, filename: req.file.filename };
        console.log(newPlan);
        newPlan.intrestedUsers = [currUser._id];
        let existingPlan = await Booking.findOne({ city: city, month: month }).populate('intrestedUsers').populate('owner').populate({ path: "reviews", populate: [{ path: "author"},{ path : "replies", populate : "author"}]});;
        console.log(existingPlan);
        if (existingPlan) {
            req.flash("success", "Plan already exists, join the explorers");
            res.render("booking/planPage", { plan: existingPlan });
            return;
        } 
        await newPlan.save(); // Ensure the plan is saved before rendering
        res.render("booking/planPage", { plan: newPlan });
        
    } catch (err) {
        // Handle errors
        console.error("Error creating plan:", err);
        req.flash("error", "An error occurred while creating the plan.");
        res.redirect("/plan");
    }
}
