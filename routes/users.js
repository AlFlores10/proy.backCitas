const router = require('express').Router();
const UserController = require('../controllers/userController');

//Ruta para mostrar los usuarios
router.get('/', UserController.getUsers);
router.post('/nuevo', UserController.newUsers);
router.delete('/:id', UserController.deleteUsers);




module.exports = router;