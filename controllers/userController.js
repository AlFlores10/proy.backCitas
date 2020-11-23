const { User, sequelize } = require('../models/index.js');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jwt-simple');


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
    req.body.password = bcrypt.hashSync(req.body.password, 10);

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


module.exports.loginUsers = async (req, res) => {

    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
        const iguales = bcrypt.compareSync(req.body.password, user.password);
        if (iguales) {
            res.json({ sucess: createToken(user) });

        } else {
            res.json({ error: 'Error en usuario y/o contraseña' });
        }

    } else {
        res.json({ error: 'Error en usuario y/o contraseña' });
    }
};

const createToken = (user) => {
    const payload = {
        usuarioId: user.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(59, 'minutes').unix()
    }

    return jwt.encode(payload, 'elsecretodemigato');
}