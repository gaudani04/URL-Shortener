const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    role:{
        type:String,
        required:true,
        default:"NORMAL"
    },

    password:{
        type:String,
        required:true
    }

},{timestamp:true});

const User = mongoose.model("user", userSchema);
module.exports = User;