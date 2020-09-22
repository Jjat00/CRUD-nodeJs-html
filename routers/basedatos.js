const {
    Pool
} = require('pg');
const Router = require('express-promise-router');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ejemplodocker',
    password: 'password',
    port: 5432,
});

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;

router.get('/consultatotalpacientes', async(req, res) => {
    const {
        rows
    } = await pool.query('SELECT * FROM pacientes');
    res.send(rows);
});

router.post('/insertarpaciente', async(req, res) => {
    const { nombre, apellido, numid } = req.body;
    await pool.query(
        `INSERT INTO pacientes(nombre, apellido, numid) VALUES('${nombre}','${apellido}','${numid}')`
    );
    res.send('INSERTADO');
});

router.put('/actualizarpaciente', async(req, res) => {
    const { nombre, apellido, numid } = req.body;
    await pool.query(
        `UPDATE pacientes SET nombre ='${nombre}', apellido ='${apellido}' WHERE numid='${numid}'`
    );
    res.send('actualizado');
});

router.delete('/eliminarpaciente', async(req, res) => {
    const { nombre, apellido, numid } = req.body;
    await pool.query(
        `DELETE FROM pacientes WHERE numid='${numid}'`
    );
    res.send('ELIMINADO');
});