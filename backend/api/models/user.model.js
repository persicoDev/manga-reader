const mongoose = require('mongoose'), jwt = require('jsonwebtoken'), crypto = require('crypto'), bcrypt = require('bcrypt');


const jwtSecret = '878748697487789416166mfoienfeinforsnhpe84894984'

const UserType = mongoose.Schema ({
    nickname: { type: String, requided: true },
    email: { 
        type: String, required: true,
        lowercase: true, unique: true
     },
    password: { type: String, requided: true },
    token: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("user", UserType);