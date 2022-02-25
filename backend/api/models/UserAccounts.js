const mongoose = require('mongoose'), jwt = require('jsonwebtoken'), crypto = require('crypto'), bcrypt = require('bcrypt');


const jwtSecret = '878748697487789416166mfoienfeinforsnhpe84894984'

const UserType = mongoose.Schema ({
    nickname: { type: String, requided: true },
    email: { 
        type: String, required: true,
        lowercase: true, unique: true
     },
    password: { type: String, requided: true },
    sessions: [{
        token: {
            type: String,
            required: true
        },
        expiresAt: {
            type: Number,
            required: true
        }
    }]
})

UserType.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    return _.omit(userObject, ['password', 'sessions']);
}

UserType.methods.generateAccessAuthToken = function() {
    const user = this;

    return new Promise((resolve, reject) =>{
        jwt.sign({ _id: user._id.toHexString() }, jwtSecret, { expiresIn: "15 min"}, (err, token) => {
            if (!err)
                resolve(token);
            else reject();
        })
    })
}

UserType.methods.generateRefreshAuthToken = function() {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buf) =>{
            if (!err) {
                let token = buf.toString('hex');
                return resolve(token);
            }
        })
    })
}

UserType.methods.createSession = function() {
    let user = this;
    
    return user.generateRefreshAuthToken().then((refreshToken) => {
        return saveSessionToDatabase(user, refreshToken)
    }).then((refreshToken) => {
        return refreshToken
    }).catch((e) => {
        return Promise.reject('failed to save on the database: ' + e );
    })
}


//model methods
UserType.statics.findByIdAndToken = function(_id, token) {
    const user = this;

    return user.findOne({
        _id,
        'session.token': token
    })
}

UserType.statics.findByCredentials = function(email, password) {
    let User = this;
    return user.findOne({email}).then((user) => {
        if (!user) return Promise.reject();
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) resolve(user);
                else reject();
            } )
        })
    })
}

UserType.statics.hasRefreshTokenExpired = (expiresAt) => {
    let secondsSinceEpoch = Date.now / 1000;

    if (expiresAt > secondsSinceEpoch)
        return false;
    else 
        return true;
}
//middleware
// UserType.pre('save', function(next) {
//     let user = this;
//     let constFactor = 10;

//     if (user.isModified('password')){
//         bcrypt.genSalt(constFactor, function(err, salt) {
//             bcrypt.hash("generic", salt, function (err, hash) {
//                 user.password = hash;
//                 next();
//             }
//         })
//     } else
//         next();
// });

// helper methods
let saveSessionToDatabase = (user, refreshToken) => {
    return new Promise((resolve, reject) => {
        let expiresAt = generateRefreshTokenExpiryTime();
        user.sessions.push({ 'token': refreshToken, expiresAt});
        user.save().then(() => {
            return resolve(refreshToken);
        }).catch((e) => {
            reject(e);
        })
    })
}

let generateRefreshTokenExpiryTime = () => {
    let daysUntilExpire = "10";
    let secondsUntilExpire = ((daysUntilExpire*24)*60)*60;
    return ((date.now()/1000) + secondsUntilExpire)
}

module.exports = mongoose.model("user", UserType);