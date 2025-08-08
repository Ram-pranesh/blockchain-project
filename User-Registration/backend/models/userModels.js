// Sign up page

const mongoose = require("mongoose")

const userModel = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"enter your name"]
        },
        email:{
            type:String,
            required:[true,"enter your email"],
            unique:true,
            lowercase:true,
            validate:{
                validator: function(value){
                    return value.endsWith('@gmail.com');
                },
                message: "Invalid mail Id"
            }
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

module.exports = mongoose.model("User" , userModel)