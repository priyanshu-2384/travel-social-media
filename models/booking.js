const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    city: String,
    intrestedUsers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    image: {
        url: String,
        filename: String
    },
    month: {
        type: String,
        required: true
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;