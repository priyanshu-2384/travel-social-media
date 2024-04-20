const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    listing : {
        type : Schema.Types.ObjectId,
        ref : "Listing"
    },
    customer : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    name : {
        type :  String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    bookedAt: {
        type : Date,
        default : Date.now()
    },
    startDate : {
        type : Date,
        required : true
    },
    endDate : {
        type : Date,
        required : true
    },
    guestCount : {
        type : Number
    }
});

const Booking = mongoose.model("Booking",bookingSchema);
module.exports = Booking;