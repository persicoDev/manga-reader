const User = require('../models/user.model');


const getUserParams = body => {
    return {
        email: body.email,
        nickname: body.nickname,
        password: body.password
    };
};

module.exports = {
    create: (req, res, next) => {
        if (req.skip) return next();
        let body = req.body;
        let newUser = new User(getUserParams(req.body));

        newUser.save().then(() => {
            return newUser.createSession();
        }).then((refreshToken) => {
            return newUser.generateAccessAuthToken().then((accessToken) => {
                return { accessToken, refreshToken }
            }); 
        }).then((authToken) => {
            res
                    .header('x-refresh-token', authTokens.refreshToken)
                    .header('x-access-token', authTokens.accessToken)
                    .send(newUser)
        }).catch((e) => {
            res.status(400).send(e);
        })
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