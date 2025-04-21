// Exercice 3 : API qui répond en différents formats (JSON, XML, HTML)
const express = require('express');
const router = express.Router();

// Données d'exemple
const usersData = [
  { id: 1, name: 'Erradi Latifa', email: 'erradilatifa@gmail.com', role: 'admin' },
  { id: 2, name: 'Rihame Erradi', email: 'Rihame@gmail.com', role: 'user' },
  { id: 3, name: 'Youness Erradi', email: 'erradi2000@gmail.com', role: 'user' }
];

// Fonction utilitaire pour convertir JSON en XML
function jsonToXML(data) {
  let xml = '<?xml version="1.0" encoding="UTF-8" ?>\n<users>\n';
  
  data.forEach(user => {
    xml += '  <user>\n';
    xml += `    <id>${user.id}</id>\n`;
    xml += `    <name>${user.name}</name>\n`;
    xml += `    <email>${user.email}</email>\n`;
    xml += `    <role>${user.role}</role>\n`;
    xml += '  </user>\n';
  });
  
  xml += '</users>';
  return xml;
}

// Fonction pour convertir un seul utilisateur en XML
function userToXML(user) {
  let xml = '<?xml version="1.0" encoding="UTF-8" ?>\n';
  xml += '<user>\n';
  xml += `  <id>${user.id}</id>\n`;
  xml += `  <name>${user.name}</name>\n`;
  xml += `  <email>${user.email}</email>\n`;
  xml += `  <role>${user.role}</role>\n`;
  xml += '</user>';
  return xml;
}

// Design principal - Style moderne avec cartes
function generateCardsHTML(users) {
  return `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Liste des utilisateurs</title>
    <style>
      :root {
        --primary-color: #3b82f6;
        --primary-dark: #1d4ed8;
        --secondary-color: #6366f1;
        --background-color: #f1f5f9;
        --card-bg: #ffffff;
        --text-color: #334155;
        --border-radius: 12px;
        --shadow-sm: 0 2px 4px rgba(0,0,0,0.05);
        --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
        --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
      }
      
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
        background-color: var(--background-color);
        color: var(--text-color);
        line-height: 1.6;
        padding: 2rem;
      }
      
      .container {
        max-width: 1200px;
        margin: 0 auto;
      }
      
      .header {
        text-align: center;
        margin-bottom: 2.5rem;
      }
      
      .header h1 {
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--primary-dark);
        margin-bottom: 0.5rem;
      }
      
      .header p {
        font-size: 1.1rem;
        color: #64748b;
      }
      
      .format-badge {
        display: inline-block;
        background-color: #dbeafe;
        color: var(--primary-dark);
        font-weight: 600;
        font-size: 0.875rem;
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        margin-left: 0.5rem;
      }
      
      .cards-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 1.5rem;
      }
      
      .card {
        background-color: var(--card-bg);
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-md);
        overflow: hidden;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
      }
      
      .card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-lg);
      }
      
      .card-header {
        padding: 1.5rem 1.5rem 1rem;
        border-bottom: 1px solid #e2e8f0;
      }
      
      .card-name {
        font-size: 1.25rem;
        font-weight: 600;
        color: #1e293b;
        margin-bottom: 0.5rem;
      }
      
      .card-email {
        font-size: 0.95rem;
        color: #64748b;
        word-break: break-all;
      }
      
      .card-body {
        padding: 1rem 1.5rem;
        flex-grow: 1;
      }
      
      .card-property {
        display: flex;
        align-items: center;
        margin-bottom: 0.75rem;
      }
      
      .card-property:last-child {
        margin-bottom: 0;
      }
      
      .property-label {
        font-size: 0.875rem;
        color: #64748b;
        width: 80px;
      }
      
      .property-value {
        font-size: 0.95rem;
        font-weight: 500;
        color: #334155;
      }
      
      .role-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
      }
      
      .role-admin {
        background-color: #fee2e2;
        color: #b91c1c;
      }
      
      .role-user {
        background-color: #dcfce7;
        color: #15803d;
      }
      
      .card-footer {
        padding: 1rem 1.5rem;
        background-color: #f8fafc;
        border-top: 1px solid #e2e8f0;
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
      }
      
      .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem 1rem;
        border-radius: var(--border-radius);
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        text-decoration: none;
      }
      
      .button-primary {
        background-color: var(--primary-color);
        color: white;
      }
      
      .button-primary:hover {
        background-color: var(--primary-dark);
      }
      
      footer {
        margin-top: 3rem;
        text-align: center;
        color: #64748b;
        font-size: 0.875rem;
      }
      
      @media (max-width: 768px) {
        body {
          padding: 1rem;
        }
        
        .cards-container {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <header class="header">
        <h1>Gestion des utilisateurs</h1>
        <p>Système de gestion des utilisateurs avec ${users.length} utilisateurs enregistrés</p>
      </header>
      
      <div class="cards-container">
        ${users.map(user => `
          <div class="card">
            <div class="card-header">
              <div class="card-name">${user.name}</div>
              <div class="card-email">${user.email}</div>
            </div>
            <div class="card-body">
              <div class="card-property">
                <div class="property-label">ID:</div>
                <div class="property-value">${user.id}</div>
              </div>
              <div class="card-property">
                <div class="property-label">Rôle:</div>
                <div class="property-value">
                  <span class="role-badge ${user.role === 'admin' ? 'role-admin' : 'role-user'}">
                    ${user.role}
                  </span>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <a href="/api/users/${user.id}" class="button button-primary">Voir détails</a>
            </div>
          </div>
        `).join('')}
      </div>
      
      <footer>
        <p>API Format Multiple | &copy; ${new Date().getFullYear()} Système de gestion des utilisateurs</p>
      </footer>
    </div>
  </body>
  </html>`;
}

// Design de la vue détaillée d'un utilisateur
function generateUserProfileHTML(user) {
  return `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profil de ${user.name}</title>
    <style>
      :root {
        --primary-color: #3b82f6;
        --primary-dark: #1d4ed8;
        --secondary-color: #6366f1;
        --background-color: #f1f5f9;
        --card-bg: #ffffff;
        --text-color: #334155;
        --border-radius: 12px;
        --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
      }
      
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
        background-color: var(--background-color);
        color: var(--text-color);
        line-height: 1.6;
        padding: 2rem;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      
      .container {
        width: 100%;
        max-width: 600px;
      }
      
      .back-link {
        display: inline-flex;
        align-items: center;
        margin-bottom: 1.5rem;
        color: var(--primary-color);
        text-decoration: none;
        font-weight: 500;
        font-size: 0.95rem;
        transition: color 0.2s;
      }
      
      .back-link:hover {
        color: var(--primary-dark);
      }
      
      .back-icon {
        margin-right: 0.5rem;
      }
      
      .profile-card {
        background-color: var(--card-bg);
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-md);
        overflow: hidden;
        position: relative;
      }
      
      .format-badge {
        position: absolute;
        top: 1rem;
        right: 1rem;
        display: inline-block;
        background-color: #dbeafe;
        color: var(--primary-dark);
        font-weight: 600;
        font-size: 0.75rem;
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
      }
      
      .profile-header {
        padding: 2.5rem 2rem 2rem;
        background: linear-gradient(to right, #3b82f6, #4f46e5);
        color: white;
        text-align: center;
        position: relative;
      }
      
      .avatar {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3rem;
        font-weight: 700;
        color: var(--primary-color);
        margin: 0 auto 1.5rem;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      }
      
      .profile-name {
        font-size: 1.75rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
      }
      
      .profile-role {
        font-size: 1rem;
        opacity: 0.9;
        margin-bottom: 1rem;
      }
      
      .role-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
      }
      
      .role-admin {
        background-color: #fee2e2;
        color: #b91c1c;
      }
      
      .role-user {
        background-color: #dcfce7;
        color: #15803d;
      }
      
      .profile-body {
        padding: 2rem;
      }
      
      .info-section {
        background-color: #f8fafc;
        border-radius: var(--border-radius);
        padding: 1.5rem;
        margin-bottom: 1.5rem;
      }
      
      .section-title {
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: #1e293b;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #e2e8f0;
      }
      
      .info-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }
      
      .info-item {
        display: flex;
        flex-direction: column;
      }
      
      .info-label {
        font-size: 0.875rem;
        color: #64748b;
        margin-bottom: 0.25rem;
      }
      
      .info-value {
        font-size: 1rem;
        font-weight: 500;
        color: #334155;
        word-break: break-all;
      }
      
      .contact-item {
        margin-bottom: 1rem;
      }
      
      .contact-label {
        font-size: 0.875rem;
        color: #64748b;
        margin-bottom: 0.25rem;
      }
      
      .contact-email {
        font-size: 1rem;
        color: var(--primary-color);
        font-weight: 500;
        text-decoration: none;
        word-break: break-all;
      }
      
      .contact-email:hover {
        text-decoration: underline;
      }
      
      footer {
        margin-top: 1.5rem;
        text-align: center;
        color: #64748b;
        font-size: 0.875rem;
      }
      
      @media (max-width: 640px) {
        .info-grid {
          grid-template-columns: 1fr;
        }
        
        .profile-header {
          padding: 2rem 1.5rem 1.5rem;
        }
        
        .avatar {
          width: 100px;
          height: 100px;
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <a href="/api/users" class="back-link">
        <span class="back-icon">←</span> Retour à la liste
      </a>
      
      <div class="profile-card">
        <span class="format-badge">HTML</span>
        
        <div class="profile-header">
          <div class="avatar">${user.name.charAt(0).toUpperCase()}</div>
          <h1 class="profile-name">${user.name}</h1>
          <p class="profile-role">
            <span class="role-badge ${user.role === 'admin' ? 'role-admin' : 'role-user'}">
              ${user.role}
            </span>
          </p>
        </div>
        
        <div class="profile-body">
          <div class="info-section">
            <h2 class="section-title">Informations personnelles</h2>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">ID</div>
                <div class="info-value">${user.id}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Nom complet</div>
                <div class="info-value">${user.name}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Rôle</div>
                <div class="info-value">${user.role}</div>
              </div>
            </div>
          </div>
          
          <div class="info-section">
            <h2 class="section-title">Contact</h2>
            <div class="contact-item">
              <div class="contact-label">Adresse email</div>
              <a href="mailto:${user.email}" class="contact-email">${user.email}</a>
            </div>
          </div>
        </div>
      </div>
      
      <footer>
        <p>API Format Multiple | &copy; ${new Date().getFullYear()} Système de gestion des utilisateurs</p>
      </footer>
    </div>
  </body>
  </html>`;
}

// Design pour page d'erreur
function generateErrorHTML(statusCode, message) {
  return `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Erreur ${statusCode}</title>
    <style>
      :root {
        --primary-color: #3b82f6;
        --error-color: #ef4444;
        --background-color: #f1f5f9;
        --card-bg: #ffffff;
        --text-color: #334155;
        --border-radius: 12px;
        --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
      }
      
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
        background-color: var(--background-color);
        color: var(--text-color);
        line-height: 1.6;
        padding: 2rem;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .error-container {
        width: 100%;
        max-width: 500px;
        text-align: center;
      }
      
      .error-card {
        background-color: var(--card-bg);
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-md);
        padding: 2.5rem 2rem;
        margin-bottom: 1.5rem;
      }
      
      .error-code {
        font-size: 4rem;
        font-weight: 700;
        color: var(--error-color);
        margin-bottom: 1rem;
      }
      
      .error-title {
        font-size: 1.5rem;
        color: #1e293b;
        margin-bottom: 1rem;
      }
      
      .error-message {
        color: #64748b;
        margin-bottom: 2rem;
      }
      
      .back-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.75rem 1.5rem;
        background-color: var(--primary-color);
        color: white;
        border-radius: var(--border-radius);
        font-weight: 500;
        text-decoration: none;
        transition: all 0.2s ease;
      }
      
      .back-button:hover {
        background-color: #2563eb;
      }
    </style>
  </head>
  <body>
    <div class="error-container">
      <div class="error-card">
        <div class="error-code">${statusCode}</div>
        <h1 class="error-title">Une erreur est survenue</h1>
        <p class="error-message">${message}</p>
        <a href="/api/users" class="back-button">Retour à la liste des utilisateurs</a>
      </div>
    </div>
  </body>
  </html>`;
}

// Route principale qui répond en différents formats
router.get('/users', (req, res) => {
  res.format({
    // Réponse en JSON (application/json)
    'application/json': () => {
      res.json({
        status: 'success',
        message: 'Liste des utilisateurs',
        count: usersData.length,
        data: usersData
      });
    },
    
    // Réponse en XML (application/xml ou text/xml)
    'application/xml': () => {
      res.type('application/xml');
      res.send(jsonToXML(usersData));
    },
    
    'text/xml': () => {
      res.type('text/xml');
      res.send(jsonToXML(usersData));
    },
    
    // Réponse en HTML (text/html)
    'text/html': () => {
      res.send(generateCardsHTML(usersData));
    },
    
    // Format par défaut
    'default': () => {
      res.status(406).send('Format non supporté. Formats disponibles: JSON, XML, HTML');
    }
  });
});

// Route pour récupérer un utilisateur spécifique
router.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = usersData.find(u => u.id === userId);
  
  if (!user) {
    return res.format({
      'application/json': () => {
        res.status(404).json({ 
          status: 'error', 
          message: `Utilisateur avec l'ID ${userId} non trouvé` 
        });
      },
      'application/xml': () => {
        res.type('application/xml');
        res.status(404).send(`
          <?xml version="1.0" encoding="UTF-8" ?>
          <error>
            <status>error</status>
            <message>Utilisateur avec l'ID ${userId} non trouvé</message>
          </error>
        `);
      },
      'text/html': () => {
        res.status(404).send(generateErrorHTML(404, `L'utilisateur avec l'ID ${userId} n'existe pas dans notre base de données.`));
      },
      'default': () => {
        res.status(406).send('Format non supporté');
      }
    });
  }
  
  res.format({
    'application/json': () => {
      res.json({
        status: 'success',
        message: `Détails de l'utilisateur ${userId}`,
        data: user
      });
    },
    
    'application/xml': () => {
      res.type('application/xml');
      res.send(userToXML(user));
    },
    
    'text/xml': () => {
      res.type('text/xml');
      res.send(userToXML(user));
    },
    
    'text/html': () => {
      res.send(generateUserProfileHTML(user));
    },
    
    'default': () => {
      res.status(406).send('Format non supporté. Formats disponibles: JSON, XML, HTML');
    }
  });
});

module.exports = router;