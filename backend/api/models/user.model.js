const mongoose = require('mongoose');


const UserType = mongoose.Schema ({
    nickname: { type: String, requided: true },
    email: { 
        type: String, required: true,
        lowercase: true, unique: true
     },
    password: { type: String, requided: true },
    manga: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "manga"
    }],
    token: {
        type: String
    }
})

module.exports = mongoose.model("user", UserType);