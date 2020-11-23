const { User, sequelize } = require('../models/index.js');
const mysql = require('mysql2');


// module.exports.getUsers =  (req, res) => {
//     const usuarios = UserModel.findAll({ attributes: ['name', 'password', 'email', 'role'] });
//     res.json(usuarios);
// };

module.exports.getUsers = (req, res) => {
    res.send('GET / usuarios/TODOS');
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


module.exports.deleteUsers = (req, res) => {
    console.log(req.body);
    res.send('DELETE /usuarios/:id');
};