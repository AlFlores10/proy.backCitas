const router = require('express').Router();
const CitasController = require('../controllers/citaController');

//Ruta para mostrar las citas
router.get('/', CitasController.getCitas);
router.post('/', CitasController.newCitas);
router.delete('/', CitasController.deleteCitas);




module.exports = router;