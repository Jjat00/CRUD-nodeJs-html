const { Pool } = require('pg');
const Router = require('express-promise-router');
const keys = require('../config/keys');
const { response } = require('express');


const pool = new Pool({
    connectionString: keys.posgresqlURI,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.connect();

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;

router.post('/insertarpaciente', async(req, res) => {
    let response = null
    try {
        const { nombre, apellido, email, numid } = req.body;
        console.log(req.body)
        await pool.query(
            `INSERT INTO pacientes(nombre, apellido, email, numid) VALUES('${nombre}','${apellido}','${email}', '${numid}')`
        );
        response = { 'status': 200, 'res': 'insertado' }
    } catch (error) {
        console.log(error)
        response = { 'status': 500, 'res': 'failed' }
    }
    res.json(response);
});


router.put('/actualizarpaciente', async(req, res) => {
    let response = null
    console.log(req.body)
    const { nombre, apellido, email, numid } = req.body;
    const { rowCount } = await pool.query(
        `UPDATE pacientes SET nombre ='${nombre}', apellido ='${apellido}', email = '${email}' WHERE numid='${numid}'`
    );
    if (rowCount === 0) {
        response = { 'status': 500, 'res': 'failed' }
    } else {
        response = { 'status': 200, 'res': 'actualizado' }
    }
    res.json(response);
});

router.delete('/eliminarpaciente', async(req, res) => {
    let response = null
    console.log(req.body)
    const { nombre, apellido, numid } = req.body;
    const { rowCount } = await pool.query(
        `DELETE FROM pacientes WHERE numid='${numid}'`
    );
    console.log(rowCount)
    if (rowCount === 0) {
        response = { 'status': 500, 'res': 'failed' }
    } else {
        response = { 'status': 200, 'res': 'eliminado' }
    }
    res.json(response);
});

router.get('/consultapaciente/:numid', async(req, res) => {
    const numid = req.params.numid;
    const { rows } = await pool.query(`SELECT * FROM pacientes WHERE numid='${numid}'`);
    res.json(rows);
});

router.get('/consultatotalpacientes', async(req, res) => {
    const { rows } = await pool.query('SELECT * FROM pacientes');
    res.json(rows);
});