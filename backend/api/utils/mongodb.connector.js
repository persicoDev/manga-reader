const mongoose = require("mongoose");

module.exports = (props) => {
    return new Promise((resolve, reject) => {
        const mongoUrl = process.env.MONGO_URL;
        const options = { useNewUrlParser: props.useNewUrlParser };
        mongoose.connect(mongoUrl, options, (err) => {
            if (err) reject(err);
            resolve();
        })
    })
}