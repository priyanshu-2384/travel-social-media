const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const Booking = require("../models/booking.js");
const User = require("../models/user.js");
const Review = require("../models/review.js");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wander");
}
main().then(()=> {
    console.log("Successfully Connected to DB");
}).catch((err)=>{
    console.log(err);
});

// const initDb = async () => {
//     await Listing.deleteMany({});
//     await Booking.deleteMany({});
//     await Review.deleteMany({});
//     initData.data = initData.data.map((obj) => ({...obj,category : 'Deserts',owner :'667c73af43e961e338ae78e5'
//     }));
//     await Listing.insertMany(initData.data);
//     console.log("Data was initialised");
// };


// const initDb = async () => {
//     let user = await User.findOne({username: "priyanshu_2384"});
//     let listings = await Listing.find({});
//     for(let i=0; i<listings.length; i++) {
//        user.posts.push(listings[i]);
//     }
//     user.save();
// }

// const initDbUser = async () => {
//     let users = await User.find({});
//     let updatedUsers = users.map((obj) => ({...obj,fullName : "", dob : new Date('2005-03-13'), image : { url : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png", filename : ""}, contact : 3333333333, address : ""}));
//     console.log(updatedUsers);
//     User.deleteMany({});
//     await User.insertMany(updatedUsers);
//     console.log("Data was initialised");
// };


// const temp = async () => {
//     let bookings =  await Booking.find();
//     for(let booking of bookings) {
//         let listing = await Listing.findById(booking.listing);
//             console.log(listing);
//             let startDate = new Date(booking.startDate);
//             let endDate = new Date(booking.endDate);
//             //calculating amount
//             let sd = startDate.getDate();
//             let ed = endDate.getDate();
//             if(ed<sd) {
//                let x = (((31-sd)+ed)+1)*(listing.price);
//                await Booking.findByIdAndUpdate(booking._id,{"amount" : x});
//             } else {
//                let x = ((ed-sd)+1)*(listing.price);
//                await Booking.findByIdAndUpdate(booking._id,{"amount" : x});
//             }
        
//     }
// }

initDb();
//temp();
