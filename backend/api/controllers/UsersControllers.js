const User = require('../models/UserAccounts');
const passport = require('passport');
const { authenticate } = require('passport');

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
            if (user) {
                req.flash(`${user.nickname} account creato  zi!`);
                res.locals.redirect = '/user';
                next();
            } else {
                req.flash(`volevi eh, invece: ${error.message}.`);
                res.locals.redirect = '/user/new';
                next();
            }
        });
    },
    
    redirectView: (_req, res, next) => {
        let redirectPath = res.locals.redirect;

        if (redirectPath !== undefined) res.redirect(redirectPath);
        else next();
    },
    
    login: (_req, res) => { res.render('/user/login'); },
    
    validate: (req, res, next) => {
        req.sanitizeBody("email").normalizeEmail({
            all_lowercase: true
        }).trim();
        req.check('email', 'email is invalid').isEmail();
        req.check('password', 'password cannot be empty').notEmpty();

        req.getValidationResult().then(error => {
            if(error.isEmpty()) 
                next();
            else {
                let messages = error.array().map(e => e.msg);
                req.skip = true;
                req.flash('error', messages.join(' and '));
                res.locals.redirect = '/users/new';
                next();
            }
        })
    },

   // authenticate: passport.authenticate

    logout: (req, res, next) => {
        req.logout();
        req.flash("success", "You have been logged out!");
        res.locals.redirect = '/';
        next();
    },
}