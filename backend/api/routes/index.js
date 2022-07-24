const router = require('express').Router();
const mangaRoutes = require('./manga.routes');
const userRoutes =  require('./user.routes');


router.use('/mangas', mangaRoutes);
router.use('/user', userRoutes);

module.exports = router;