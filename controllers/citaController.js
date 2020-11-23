const { Citas, sequelize } = require('../models/index.js');

module.exports.getCitas = async (req, res) => {
    try {
        const resultado = await Citas.findAll();
        res.json({ resultado });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'Ha habido un problema tratando de recuperar las citas'
        });
    }
};


module.exports.newCitas = async (req, res) => {
    try {
        const nuevoUsuario = await Citas.create({
            id_user: req.body.id_user,
            fecha: req.body.fecha,
            id_doctor: req.body.id_doctor,
            observaciones: req.body.observaciones
        });
        res.send({
            message: 'Cita creado correctamente'
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'La cita no ha podido crearse correctamente'
        });
    }
};


module.exports.deleteCitas = async (req, res) => {
    try {
        const fecha = await Citas.destroy({
            where: {
                fecha: req.body.fecha
            }
        });

        if (!fecha) {
            return res.status(400).send({
                message: 'Cita con esa fecha no encontrada'
            })
        };

        res.send({
            message: 'Cita eliminada correctamente'
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'Ha habido un problema al borrar la cita'
        });
    }

};