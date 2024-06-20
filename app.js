// app.js

const express = require('express');
const db = require('./db'); // Importez la configuration de la base de données

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bienvenue sur mon serveur Express !');
});

// Route pour récupérer tous les utilisateurs
app.get('/users', async (req, res) => {
    try {
        const [rows, fields] = await db.query('SELECT * FROM users');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// Route pour ajouter un utilisateur
app.post('/users', async (req, res) => {
    const { nom, points } = req.body;
    try {
        const [result] = await db.query('INSERT INTO users (nom, points) VALUES (?, ?)', [nom, points]);
        res.json({ id: result.insertId, nom, points });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

app.listen(port, () => {
    console.log(`Serveur backend démarré sur le port ${port}`);
});
