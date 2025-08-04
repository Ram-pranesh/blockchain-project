const mongoose = require("mongoose")

const userModel = new mongoose.Schema(
    {
        name:{
            type : String,
            required:[true,"please enter your name"],
        },
        email:{
            type:String,
            required:[true,"enter your email"],
        },
        password:{
            type:String,
            required:true,
        },
        confirmPassword:{
            type:String,
            required:true,
        }
    },
    {
        timestamps:true
    }
)

const User = mongoose.model("User" , userModel)
model.exports = User