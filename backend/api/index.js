const express = require("express"),
   path = require("path"),
   mongoose = require("mongoose"),
   cors = require("cors"),
   createError = require('http-errors'),
   mangaRoute = require("./routes/manga.routes"),
   userRoute = require("./routes/user.routes"),
   passport = require('passport'),
   expressValidator = require('express-validator'),
   expressSession = require('express-session'),
   User = require('./models/UserAccounts')
   app = express();
   require("dotenv").config();

   
mongoose.Promise = global.Promise;

const url = process.env.MONGO_URL;

mongoose.connect(url, { useNewUrlParser: true }).then(() => {
         console.log("Database sucessfully connected");
            },(error) => {
                  console.log("Database could not connected: " + error);
               });

app.use(express.json());

app.use(
   express.urlencoded({
      extended: true,
   })
);

app.use(cors());
app.use(express.static(path.join(__dirname, "dist/frontend")));
app.use("/", express.static(path.join(__dirname, "dist/frontend")));
app.use("/api", mangaRoute);
app.use("/api", userRoute);
app.use(expressValidator());
// Create port
const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
   console.log("Connected to port " + port);
});

// Find 404 and hand over to error handler
app.use((req, res, next) => {
   next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
   console.error( 'tenimm nu error',err.message); // Log error message in our server's console
   if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
   res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});
