const { date } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    fullname : String,
    contact : Number,
    image:  {
        url : {
            type : String,
            default : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        },
        filename : String,
    },
    email : {
        type : String,
        required: true
    },
    dob : Date,
    address : String
     //username and password are automatically created by passport library 
});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User",userSchema);
module.exports = User;
