const router = require('express').Router();

const MangaInfos = require('../models/MangaInfos');

router.route('/').get(async (_req, res) =>{
    console.log('performing query')
    res.json(await MangaInfos.find());
})

router.route('/manga/:id').get(async (req, res, _next) =>{
   res.json(await MangaInfos.findOne({'id': req.params.id}));
})

router.route('/read/:id/').get(async (req, res, _next) =>{
    res.json(await MangaInfos.findOne({'id': req.params.id}));
})


module.exports = router;