const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

// Assurez-vous d'exporter le routeur
module.exports = router; // Pas module.exports = { router }