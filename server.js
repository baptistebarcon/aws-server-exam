const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'database-2.cx2kswam0856.eu-west-3.rds.amazonaws.com',  // Remplacez par l'endpoint de votre instance RDS
    user: 'admin',      // Remplacez par votre nom d'utilisateur
    password: '.C|Qhe!V}fu~WPjvw?x5N7O}*v5x',  // Remplacez par votre mot de passe
    database: 'database-2',     // Remplacez par le nom de votre base de données
    port: 3306                  // Spécifiez le port explicitement
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).send('Error fetching users');
            return;
        }
        res.json(results);
    });
});

app.post('/users', (req, res) => {
    const { nom, point } = req.body;
    db.query('INSERT INTO users (nom, point) VALUES (?, ?)', [nom, point], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            res.status(500).send('Error inserting user');
            return;
        }
        res.json({ id: result.insertId, nom, point });
    });
});

app.put('/users/:id', (req, res) => {
    const { nom, point } = req.body;
    const { id } = req.params;
    db.query('UPDATE users SET nom = ?, point = ? WHERE id = ?', [nom, point, id], (err, result) => {
        if (err) {
            console.error('Error updating user:', err);
            res.status(500).send('Error updating user');
            return;
        }
        res.json({ id, nom, point });
    });
});

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Error deleting user:', err);
            res.status(500).send('Error deleting user');
            return;
        }
        res.json({ message: 'User deleted' });
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
