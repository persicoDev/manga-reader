const mongoose = require('mongoose'), bcrypt = require('bcrypt');

const UserType = mongoose.Schema ({
    nickname: { type: String, requided: true },
    email: { 
        type: String, required: true,
        lowercase: true, unique: true
     },
    password: { type: String, requided: true }
})

module.exports = mongoose.model("User", UserType);