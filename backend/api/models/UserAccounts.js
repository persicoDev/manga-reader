const mongoose = require('mongoose'), bcrypt = require('bcrypt');

const UserType = mongoose.Schema ({
    nickname: { type: String, requided: true },
    email: { 
        type: String, required: true,
        lowercase: true, unique: true
     },
    password: { type: String, requided: true }
            
})

UserType.pre('save', function(next) {
    let user = this;

    if(user.isModified('password') || this.isNew ) {
        bcrypt.genSalt(10, function(err, salt) {
            if(!err) {
                bcrypt.hash(user.password, salt, function(err, hash){
                    user.password = hash;
                    next();
                })
            } else return next(err); 
        })
    } else return next;
})

module.exports = mongoose.model("User", UserType)