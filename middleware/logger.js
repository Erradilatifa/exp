// middlewares/logger.js
const fs = require('fs');
const path = require('path');

// Créer le dossier logs s'il n'existe pas
const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

module.exports = function(req, res, next) {
  const logMessage = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
  
  // Écriture dans le fichier de log
  fs.appendFile(path.join(logDir, 'access.log'), logMessage, (err) => {
    if (err) console.error('Erreur de log:', err);
  });
  
  // Affichage dans la console
  console.log(logMessage.trim());
  
  next();
};