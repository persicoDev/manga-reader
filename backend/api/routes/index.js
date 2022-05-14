const router = require('express').Router(),
      mangaRoutes = require('./manga.routes'),
      userRoutes =  require('./user.routes');


router.use('/mangas', mangaRoutes);
router.use('/user', userRoutes);