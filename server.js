// server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware/authMiddleware');


const app = express();
app.use(express.json());

const JWT_SECRET = 'votre_clef_secrete_tres_complexe';

// Route pour générer un token (pour les tests)
app.post('/login', (req, res) => {
  // Normalement, vous vérifieriez les identifiants dans une base de données
  const { username, password } = req.body;
  
  // Exemple simple - dans un cas réel, vous vérifieriez ces informations dans une base de données
  if (username === 'latifa' && password === 'rihame2003') {
    // Créer un token JWT
    const token = jwt.sign(
      { id: 1, username: 'latifa', role: 'admin' },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Identifiants invalides' });
  }
});

// Route protégée par le middleware d'authentification
app.get('/protected', authMiddleware, (req, res) => {
  res.json({
    message: 'Accès autorisé à la ressource protégée',
    user: req.user // Informations de l'utilisateur extraites du token
  });
});

// Route publique
app.get('/public', (req, res) => {
  res.json({ message: 'Ceci est une route publique' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});