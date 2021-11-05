const User = require('../models/UserAccounts');
const passport = require('passport');

const getUserParams = body => {
    return {
        nickname: body.nickname,
        email: body.email,
        password: body.password
    };
};

module.exports = {
    create: (req, res, next) => {
        if (req.skip) return next();

        let newUser = new User(getUserParams(req.body));

        User.register(newUser, req.body.password, (error, user) => {
            if (user){
                req.flash("success", `${user.nickname}'s account created successfully!`);
                res.locals.redirect = '/users';
                next();
            } else {
                req.flash("error", `Failed to create user account because: ${error.message}.`);
                res.locals.redirect = '/users/new';
                next();
            }
        });
    },
    
    login: (_req, res) => {
        res.render('/user/login');
    },

    logout: (req, res, next) => {
        req.logout();
        req.flash("success", "You have been logged out!");
        res.locals.redirect = '/';
        next();
    }
}