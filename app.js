const express = require('express');
const app = express();
const mysql = require('mysql2/promise');
const cors = require('cors');
const PORT = 3000;

const UsersRoutes = require('./routes/users');

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.get('/', (req, res) => {
    res.send('proyecto backend');
});

app.use('/usuarios', UsersRoutes);


//Servidor
app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
})

//Conexion BBDD
const conexion = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'clinicaDental2',
    password: '1234'
})

.then(() => console.log('Sequelize ON'))
.catch((error) => console.log('Sequelize OFF - ERROR CONEXION', error));