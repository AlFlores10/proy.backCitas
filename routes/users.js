const router = require('express').Router();
const UserController = require('../controllers/userController');

//Ruta para mostrar los usuarios
router.get('/', UserController.getUsers);
router.post('/', UserController.newUsers);
router.delete('/', UserController.deleteUsers);




module.exports = router;