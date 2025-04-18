// authMiddleware.js
const jwt = require('jsonwebtoken');

// Clé secrète pour vérifier les tokens JWT (à stocker en variable d'environnement dans un cas réel)
const JWT_SECRET = 'votre_clef_secrete_tres_complexe';

const authMiddleware = (req, res, next) => {
  // Récupérer le token depuis l'en-tête Authorization
  const authHeader = req.headers.authorization;
  
  // Vérifier si l'en-tête Authorization existe
  if (!authHeader) {
    return res.status(401).json({ message: 'Accès refusé. Token manquant.' });
  }

  // Le format attendu est "Bearer [token]"
  const parts = authHeader.split(' ');
  
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Format de token invalide. Utilisez "Bearer [token]"' });
  }

  const token = parts[1];

  try {
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Ajouter les informations de l'utilisateur à l'objet req
    req.user = decoded;
    
    // Passer au middleware/contrôleur suivant
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide ou expiré' });
  }
};

module.exports = authMiddleware;