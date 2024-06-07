const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const Booking = require("../models/booking.js");

async function main() {
    await mongoose.connect("database url");
}
main().then(()=> {
    console.log("Successfully Connected to DB");
}).catch((err)=>{
    console.log(err);
});

const initDb = async () => {
    await Listing.deleteMany({});
    await Booking.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj,owner : '66637a77496369e99735443f'}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialised");
};

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