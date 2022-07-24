const jwt = require('jsonwebtoken');
const crypto = require('node:crypto');
const User = require('../models/user.model');

// sposta nel model
const getHashedPass = async (password) => {
    let salt = crypto.randomBytes(128).toString('base64');
    return crypto.pbkdf2Sync(password, salt,1000, 64, `sha512`).toString(`hex`);
}

const compareAndHashPass = async (pass1, pass2) => (getHashedPass(pass1) === getHashedPass(pass2))

module.exports = {
    create: async (req, res, next) => {
        if (req.skip) return next();
        let { nickname, email, password } = req.body;
        console.log(nickname, email, password);
        try {
            const user = await User.create({
                nickname,
                email: email,
                password: (await getHashedPass(password)).toString()
            })

            const token = jwt.sign(
                { user_id: user._id, email },
                  process.env.TOKEN_KEY,
                { expiresIn: "2h", }
              );
              user.token = token;
              res.status(201).json(user);
        } catch(err){
            next(err);
        }
    },
    
    login: async (req, res) => { 
        try {
            const { email, password } = req.body;
        
            if (!(email && password)) {
              res.status(400).send("All input is required");
            }
            const user = await User.findOne({ email });
        
            if (user && (await compareAndHashPass(user.password, password))) {
              const token = jwt.sign(
                { user_id: user._id, email },
                  process.env.TOKEN_KEY,
                {
                  expiresIn: "2h",
                }
              );
              user.token = token;
              res.status(200).json(user.token); // access token + refresh
            }
            res.status(400).send("Invalid Credentials");
          } catch (err) {
            next(err);
          }
     },

     // check refresh token logic 
     refresh: (req, res, next) => {
        const token = req.body.token || req.query.token || req.headers["x-access-token"];
        let payload;
        if(!token) {
          return res.status(403).send("a token is required for refresh");
        }

        try {
          payload = jwt.verify(token, process.env.TOKEN_KEY.toString());
        } catch(e) {
          next(e);
        }
        
        const nowUnixSeconds = Math.round(Number(new Date()) / 1000);
        if (payload.exp - nowUnixSeconds > 30) {
          return res.status(400).end();
        }

        const newToken = jwt.sign({ nickname: payload.nickname }, process.env.TOKEN_KEY.toString(), {
          algorithm: "HS256",
          expiresIn: '720h'
        })
     },
}