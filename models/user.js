const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
        name:{
                type: String,
                required: true,
                trim: true
        },
        email:{
                type: String,
                required: true,
                // trim is used to remove whitespace in a string 
                trim: true
        },
        password:{
                type: String,
                required: true,
        },
        role:{
                type: String,
                enum: ["Admin", "Student", "Visitor"]
        },
})



module.exports = mongoose.model("User", userSchema)