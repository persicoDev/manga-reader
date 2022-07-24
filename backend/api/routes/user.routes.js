const router = require('express').Router();
const authMiddleware = require('../middlewares/auth'); 
const userController = require('../controllers/user.controller');

 router.post('/register', userController.create);
 router.post('/login', userController.login);

 module.exports = router;