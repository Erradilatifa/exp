document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('uploadForm');
  const gallery = document.getElementById('gallery');
  const message = document.getElementById('message');

  // Charger les images au démarrage
  loadImages();

  // Gérer l'upload
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    
    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (response.ok) {
        showMessage('Image uploadée avec succès!', 'success');
        loadImages();
        form.reset();
      } else {
        showMessage(data.error || 'Erreur lors de l\'upload', 'error');
      }
    } catch (err) {
      showMessage('Erreur réseau', 'error');
    }
  });
  async function loadImages() {
    try {
      const response = await fetch('/upload/images');
      const { images } = await response.json();
      
      gallery.innerHTML = images.map(img => {
        // Utiliser un chemin relatif pour les images
        const imgUrl = `/uploads/${img}`;
        
        return `
          <div class="gallery-item">
            <img src="${imgUrl}" alt="" onerror="console.error('Erreur de chargement:', this.src)">
            <!-- Le div avec le nom de l'image a été complètement supprimé -->
          </div>
        `;
      }).join('');
      
    } catch (err) {
      console.error('Erreur:', err);
      showMessage('Échec du chargement des images', 'error');
    }
  }

  function showMessage(msg, type) {
    message.textContent = msg;
    message.className = type;
    setTimeout(() => message.textContent = '', 3000);
  }
});