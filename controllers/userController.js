const { User, sequelize } = require('../models/index.js');


// module.exports.getUsers = (req, res) => {
//     User.findAll()
//         .then(users => res.send(users))
//         .catch(error => {
//             console.error(error);
//             res.status(500).send({
//                 message: 'Ha habido un problema tratando de recuperar los users'
//             })
//         })
// };

module.exports.getUsers = async (req, res) => {
    try {
        const resultado = await User.findAll();
        res.json({ resultado });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'Ha habido un problema tratando de recuperar los usuarios'
        });
    }
};


module.exports.newUsers = async (req, res) => {
    try {
        const nuevoUsuario = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            role: req.body.role
        });
        res.send({
            message: 'Usuario creado correctamente'
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'El usuario no ha podido crearse correctamente'
        });
    }
};


module.exports.deleteUsers = async (req, res) => {
    try {
        const email = await User.destroy({
            where: {
                email: req.body.email
            }
        });

        if (!email) {
            return res.status(400).send({
                message: 'Email no encontrado'
            })
        };

        res.send({
            message: 'Usuario eliminado correctamente'
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'Ha habido un problema al borrar el usuario'
        });
    }

};