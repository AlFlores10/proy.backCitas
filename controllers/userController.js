const { User, sequelize } = require('../models/index.js');
const mysql = require('mysql2');


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
}

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


module.exports.deleteUsers = (req, res) => {
    console.log(req.body);
    res.send('DELETE /usuarios/:id');
};