const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const fileUpload = require('../middleware/fileUpload');

// Route pour afficher la page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/gallery.html'));
});

// Route pour uploader
router.post('/', fileUpload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Aucun fichier uploadé' });
  }
  
  // Log successful upload
  console.log(`Fichier uploadé: ${req.file.filename}`);
  
  res.json({
    success: true,
    file: req.file.filename
  });
});

// Route pour lister les images
router.get('/images', (req, res) => {
  const uploadDir = path.join(__dirname, '../public/uploads');
  
  // Ensure the directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    return res.json({ images: [] });
  }
  
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      console.error('Erreur lors de la lecture du répertoire:', err);
      return res.status(500).json({ error: 'Erreur de lecture du répertoire' });
    }
    
    const imageFiles = files.filter(f => 
      f.match(/\.(jpg|jpeg|png|gif)$/i) && 
      fs.statSync(path.join(uploadDir, f)).isFile()
    );
    
    console.log(`${imageFiles.length} images trouvées dans ${uploadDir}`);
    res.json({ images: imageFiles });
  });
});

module.exports = router;