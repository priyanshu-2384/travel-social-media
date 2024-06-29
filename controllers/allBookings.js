const User = require("../models/user.js");
const Booking = require('../models/booking.js');
const Review = require("../models/review.js");
const axios = require('axios');
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
module.exports.planSearch = async (req, res) => {
    let plans = await Booking.find({}).populate('intrestedUsers').populate('owner').populate({ path: "reviews", populate: [{ path: "author"},{ path : "replies", populate : {path : "author"}}]});
    res.render("booking/search", {plans});
}

module.exports.planPage = async (req, res) => {
    let { city, month } = req.body;
    try {
        let plan = await Booking.findOne({ city: city, month: month }).populate('intrestedUsers').populate('owner').populate({ path: "reviews", populate: [{ path: "author"},{ path : "replies", populate : {path : "author"}}]});
        if (plan) {
            res.redirect(`/plan/${plan._id}`);
        } else {
        req.flash("success", "No Plans Matched, Create Your Own");
        res.redirect("/listings");
    }
    } catch (err) {
        // Handle errors
        console.error("Error finding plan:", err);
        req.flash("error", "An error occurred while searching for the plan.");
        res.redirect("/listings");
    }
}

module.exports.createPlan = async (req, res) => {
    let { city, month } = req.body; // Extract city and month from req.body
    try {
        let currUser = await User.findOne({ username: res.locals.currUser.username });
        let newPlan = new Booking();
        newPlan.month = month;
        newPlan.city = city;
        newPlan.owner = currUser;
        newPlan.image = { url: req.file.path, filename: req.file.filename };
        newPlan.intrestedUsers = [currUser._id];
        let existingPlan = await Booking.findOne({ city: city, month: month }).populate('intrestedUsers').populate('owner').populate({ path: "reviews", populate: [{ path: "author"},{ path : "replies", populate : {path : "author"}}]});
        if (existingPlan) {
            req.flash("success", "Plan already exists, join the explorers");
            res.redirect(`/plan/${existingPlan._id}`);
            return;
        } else {
        await newPlan.save(); // Ensure the plan is saved before rendering
        res.redirect(`/plan/${newPlan._id}`);
        }
        
    } catch (err) {
        // Handle errors
        console.error("Error creating plan:", err);
        req.flash("error", "An error occurred while creating the plan.");
        res.redirect("/plan");
    }
}

module.exports.getPlan = async (req,res) => {
    let {id} = req.params;
    let user = await User.findOne({username : res.locals.currUser.username});
    let plan = await Booking.findById(id).populate('intrestedUsers').populate('owner').populate({ path: "reviews", populate: [{ path: "author"},{ path : "replies", populate : {path : "author"}}]});
    if(!plan) {
        req.flash("error", "Plan you requested for does not exist! Create your owns");
        res.redirect("/plan");
    }
    let isUserInterested = false;
    for(let i=0; i<plan.intrestedUsers.length; i++) {
        if(plan.intrestedUsers[i]._id.toString()==user._id.toString()) {
            isUserInterested = true;
            break;
        }
    }
    res.render("booking/planPage.ejs", {plan : plan, isUserInterested});
}



module.exports.createReview = async (req,res)=> {
    let {id} = req.params;
    let plan = await Booking.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    plan.reviews.push(newReview);
    await newReview.save();
    await plan.save();
    req.flash("success", "Comment Added!");
    res.redirect(`/plan/${plan._id}`);
};

module.exports.destroyReview = async (req,res) => {
    let {id,reviewId } = req.params;
    let plan = await Booking.findById(id);
    await Booking.findByIdAndUpdate(id , {$pull :{reviews : reviewId} } );
    let x = await Review.findById(reviewId).populate("replies");
    for(let i=0; i<x.replies.length; i++) {
        await Review.findByIdAndDelete(x.replies[i]._id);
    }
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Comment Deleted!");
    res.redirect(`/plan/${plan._id}`);
};

module.exports.addReply = async (req,res) => {
    let {id,reviewId } = req.params;
    let plan = await Booking.findById(id);
    let reply = req.body.reply;
    let review = await Review.findById(reviewId).populate("replies");
    let newReview = new Review(reply);
    newReview.author = req.user._id;
    newReview.save();
    review.replies.push(newReview);
    console.log(review.replies);
    review.save();
    req.flash("success", "Reply Added!");
    console.log(plan);
    res.redirect(`/plan/${plan._id}`);
};

module.exports.destroyReply = async (req,res) => {
    let {id,reviewId, replyId} = req.params;
    let plan = await Booking.findById(id);
    await Review.findByIdAndUpdate(reviewId , {$pull :{replies: replyId} } );
    await Review.findByIdAndDelete(replyId);
    req.flash("success", "Reply Deleted!");
    res.redirect(`/plan/${plan._id}`);
};

module.exports.addUser = async (req,res) => {
    console.log("hello");
    let {id,userId} = req.params;
    try {
        const plan = await Booking.findById(id);
        const user = await User.findById(userId);
        
        if (!plan || !user) {
            return res.status(400).json({ success: false, message: 'Plan or user not found' });
        }
        plan.intrestedUsers.push(user);
        await plan.save();
        res.json({ success: true, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

module.exports.removeUser = async (req,res) => {
    let {id,userId} = req.params;
    try {
        const plan = await Booking.findById(id);
        const user = await User.findById(userId);
        if (!plan) {
            return res.status(400).json({ success: false, message: 'Plan not found' });
        }
        plan.intrestedUsers = plan.intrestedUsers.filter(uId => uId.toString() !== user._id.toString());
        await plan.save();
        res.json({ success: true, user: { _id: userId } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

