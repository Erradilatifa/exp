const express = require('express');
const router = express.Router();

// Liste des utilisateurs (données simulées)
const users = [
  { id: 1, name: 'Latifa Admin', email: 'latifa@example.com', role: 'admin' },
  { id: 2, name: 'Jean Dupont', email: 'jean@example.com', role: 'user' },
  { id: 3, name: 'Marie Martin', email: 'marie@example.com', role: 'user' }
];

// Route pour obtenir tous les utilisateurs
router.get('/', (req, res) => {
  res.json(users);
});

// Route pour obtenir un utilisateur par ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return res.status(404).json({ error: 'Utilisateur non trouvé' });
  }
  
  res.json(user);
});

// Route pour créer un utilisateur
router.post('/', (req, res) => {
  const { name, email, role } = req.body;
  
  if (!name || !email || !role) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }
  
  const newUser = {
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    name,
    email,
    role
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

// Route pour mettre à jour un utilisateur
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, role } = req.body;
  
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Utilisateur non trouvé' });
  }
  
  users[userIndex] = { 
    ...users[userIndex],
    name: name || users[userIndex].name,
    email: email || users[userIndex].email,
    role: role || users[userIndex].role
  };
  
  res.json(users[userIndex]);
});

// Route pour supprimer un utilisateur
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Utilisateur non trouvé' });
  }
  
  const deletedUser = users.splice(userIndex, 1)[0];
  res.json({ message: 'Utilisateur supprimé', user: deletedUser });
});

module.exports = router;