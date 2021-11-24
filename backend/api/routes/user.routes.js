const router = require('express').Router(), userController = require('../controllers/UsersControllers');

 router.post('/register', userController.create, userController.validate, userController.redirectView);
 router.get('/login', userController.login);
 router.post('/login', userController.validate);
 router.get('/logout', userController.logout, userController.redirectView);

 module.exports = router;