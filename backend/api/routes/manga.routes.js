const router = require('express').Router();
const mangaController = require('../controllers/manga.controller');


router.route('/').get(mangaController.getAll);
router.route('/getone/:id').get(mangaController.getOne);
router.route('/read/:id/').get(mangaController.getOne);


module.exports = router;