const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');


let app = express();

mongoose.connect('mongodb://localhost:27017/');