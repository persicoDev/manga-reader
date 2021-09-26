const express = require('express');
const mangaRoute = express.Router();

const MangaInfos = require('../models/MangaInfos');
// const MangaLinks = require('../models/MangaInfos');
 

let app = express();

mangaRoute.route('/').get(async (req, res, next) =>{
    console.log('performing query')
    res.json(await MangaInfos.find());
})

mangaRoute.route('/manga/:id').get(async (req, res, next) =>{
   res.json(await MangaInfos.findOne({'id': req.params.id}))
})

mangaRoute.route('/read/:id').get(async (req, res, next) =>{
    res.json(await MangaInfos.findOne({'id': req.params.id}))
})


module.exports = mangaRoute;