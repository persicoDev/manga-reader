const router = require('express').Router();
const mangaController = require('../controllers/manga.controller');


router.route('/').get(mangaController.getAll);
router.route('/getById/:id').get(mangaController.getById);
router.route('/read/:id/').get(mangaController.getById);


module.exports = router;