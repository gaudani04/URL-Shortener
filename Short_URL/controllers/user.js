const express = require('express');
const User = require('../models/user');
const {v4:uuidv4} = require('uuid')
const {setUser,getUser} = require('../service/auth')

async function handleUserSignup(req,res) {
    const {name,email,password} = req.body;
    await User.create({
        name,
        email,
        password
    });
    return res.render("home");
}


async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    // 1. Find user by email only
    const user = await User.findOne({ email });
    
    // 2. If no user, show error
    if (!user) {
        return res.render("login", { error: "Invalid email or password" });
    }

    // 3. Check password manually
    if (user.password !== password) {
        return res.render("login", { error: "Invalid email or password" });
    }
    // const sessionId = uuidv4();

   const token =  setUser(user);
    res.cookie("uid",token);
    

    // 4. Login successful
    return res.render("home");
}

module.exports = {handleUserSignup,handleUserLogin};