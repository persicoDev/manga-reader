const express = require("express"),
   cors = require("cors"),
   routes = require('./routes'),
   errorHandler = require('./middlewares/error.handler'),
   mongoConnector = require('./utils/mongodb.connector'),
   app = express();
   require("dotenv").config();

   

const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);
app.use(errorHandler);

mongoConnector({ useNewUrlParser: true })
   .then(() => console.log("Database sucessfully connected"))
   .catch(e => console.log("Database could not connected: " + e));



const server = app.listen(port, () => {
   console.log("Connected to port " + port);
});