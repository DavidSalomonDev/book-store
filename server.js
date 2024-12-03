const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 8080;

// AlloyDB connection
const pool = new Pool({
    user: 'your-user',
    host: 'your-host',
    database: 'bookstore',
    password: 'your-password',
    port: 5432
});

app.use(express.json());
app.use(express.static('public'));

// Create
app.post('/api/customers', async (req, res) => {
    const { nombre, apellido, email, direccion_envio, direccion_facturacion, telefono } = req.body;
    try {
        await pool.query(
            'INSERT INTO CLIENTES (nombre, apellido, email, direccion_envio, direccion_facturacion, telefono) VALUES ($1, $2, $3, $4, $5, $6)',
            [nombre, apellido, email, direccion_envio, direccion_facturacion, telefono]
        );
        res.status(201).send('Customer added');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding customer');
    }
});


// Read
app.get('/api/customers', async (_, res) => {
    try {
        const result = await pool.query('SELECT * FROM CLIENTES');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching customers');
    }
});

// Delete
app.delete('/api/customers/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM CLIENTES WHERE id = $1', [id]);
        res.send('Customer deleted');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting customer');
    }
});


// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
