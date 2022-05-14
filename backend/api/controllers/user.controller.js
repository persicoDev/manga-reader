const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');

const getUserParams = body => {
    return {
        email: body.email,
        nickname: body.nickname,
        password: body.password
    };
};

module.exports = {
    create: async (req, res, next) => {
        if (req.skip) return next();
        let { nickname, email, password } = req.body;
        try {
            const encryptedPassword = await bcrypt.hash(password, 10);
            const user = await userModel.create({
                nickname,
                email: email.toLowercase(),
                password: encryptedPassword
            })
        } catch(err){
            console.log(err);
        }
    },
    
    redirectView: (_req, res, next) => {
        let redirectPath = res.locals.redirect;

        if (redirectPath !== undefined) res.redirect(redirectPath);
        else next();
    },
    
    login: (_req, res) => { res.render('/user/login'); },
    
    validate: (req, res, next) => {
        console.log(req.body.email);
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