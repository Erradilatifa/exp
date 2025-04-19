const express = require('express');

const path = require('path');
const fs = require('fs'); // Ajouté pour le logging
const bodyParser = require('body-parser');
const app = express();
const logger = require('./middleware/logger.js'); // Ajoutez l'extension .js
const fileUpload = require('./middleware/fileUpload');
const PORT = 3000;

// Middlewares
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads'), {
  setHeaders: (res, path) => {
    const ext = path.extname(path);
    if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
      res.type(ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 
             ext === '.png' ? 'image/png' : 'image/gif');
    }
  }
}));
// Ajoutez ce middleware avant vos routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
// Middleware de logging personnalisé
function loggingMiddleware(req, res, next) {
    const now = new Date();
    const logData = {
        timestamp: now.toISOString(),
        method: req.method,
        url: req.originalUrl,
        ip: req.ip || req.connection.remoteAddress,
        headers: req.headers,
        body: req.body
    };
    
    const logString = JSON.stringify(logData) + '\n';
    
    fs.appendFile('server.log', logString, (err) => {
        if (err) console.error('Erreur d\'écriture dans le log:', err);
    });
    
    console.log(`[${now.toISOString()}] ${req.method} ${req.originalUrl} from ${req.ip}`);
    next();
}

// Importez les routeurs
const basicRouter = require('./routes/basic');
const tasksRouter = require('./routes/tasks');
const blogRouter = require('./routes/blog'); 
const usersRouter = require('./routes/modules/users');
const productsRouter = require('./routes/modules/products');
const ordersRouter = require('./routes/modules/orders');
const authMiddleware = require('./middleware/authMiddleware');
const uploadRouter = require('./routes/upload');


// Configuration des middlewares
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(loggingMiddleware); // Ajout du middleware de logging
// Middleware pour initialiser les données
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    req.body = req.body || {};
    next();
});


// Routes pour les pages HTML
app.get('/tasks-page', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'tasks.html'), {
        headers: {
            'Content-Type': 'text/html'
        }
    });
});

app.get('/blog-page', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'blog.html'));
});



// Configuration de l'application
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Ajoutez cette ligne
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/upload', uploadRouter);

// Routes principales
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/admin-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin-dashboard.html'));
});

app.get('/route-protegee', authMiddleware, (req, res) => {
  res.send('Contenu protégé');
});

// Route pour afficher le formulaire
app.get('/inscription', (req, res) => {
  res.render('form', { 
      errors: {}, // Toujours initialiser comme objet vide
      formData: {} // Idem pour formData
  });
});
app.get('/get-image/:name', (req, res) => {
  const file = path.join(__dirname, 'public', 'uploads', req.params.name);
  res.sendFile(file);
});
app.post('/inscription', (req, res) => {
  const { nom, email, password, confirmPassword } = req.body;
  const errors = {};
  const formData = { nom, email };

  // Validation des données
  if (!nom) errors.nom = 'Le nom est requis';
  
  if (!email) {
      errors.email = 'L\'email est requis';
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = 'L\'email n\'est pas valide';
  }
  
  if (!password) {
      errors.password = 'Le mot de passe est requis';
  } else if (password.length < 6) {
      errors.password = 'Le mot de passe doit contenir au moins 6 caractères';
  }
  
  if (!confirmPassword) {
      errors.confirmPassword = 'Veuillez confirmer votre mot de passe';
  } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Les mots de passe ne correspondent pas';
  }

  if (Object.keys(errors).length > 0) {
      return res.render('form', { 
          errors, 
          formData 
      });
  }

  res.render('confirmation', { nom });
});
app.use((req, res, next) => {
  res.status(404).json({ 
    error: "Page non trouvée",
    statusCode: 404
  });
});
// Gestion des erreurs serveur
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: err.message || 'Erreur serveur',
    statusCode: 500,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Modifiez la route GET /upload

// Route pour uploader un fichier



// Montez les routeurs
app.use('/basic', basicRouter);
app.use('/tasks', tasksRouter);
app.use('/blog', blogRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/api', authMiddleware);
app.use('/upload', uploadRouter);

// Route pour afficher la date
app.get('/date', (req, res) => {
  const now = new Date();
  const formattedDate = now.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const formattedTime = now.toLocaleTimeString('fr-FR');

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Date and Time</title>
        <style>
          :root {
            --primary: #4361ee;
            --secondary: #3a0ca3;
            --accent: #f72585;
            --light: #f8f9fa;
            --dark: #212529;
          }
          
          body {
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
            background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            color: var(--dark);
            line-height: 1.6;
          }
          
          .card {
            background: white;
            padding: 2.5rem;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
            text-align: center;
            max-width: 480px;
            width: 90%;
            position: relative;
            overflow: hidden;
          }
          
          .card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 8px;
            background: linear-gradient(90deg, var(--primary), var(--accent));
          }
          
          h1 {
            color: var(--secondary);
            margin: 0 0 1.5rem;
            font-weight: 600;
            font-size: 2rem;
          }
          
          .date-container {
            margin: 2rem 0;
          }
          
          .date-label {
            display: block;
            color: #6c757d;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          
          .date-value {
            font-size: 1.8rem;
            color: var(--primary);
            font-weight: 500;
            margin-bottom: 1.5rem;
          }
          
          .time-value {
            font-size: 3rem;
            color: var(--secondary);
            font-weight: 300;
            margin: 1rem 0;
            letter-spacing: 1px;
          }
          
          .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-top: 1.5rem;
            padding: 0.8rem 2rem;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            text-decoration: none;
            border-radius: 50px;
            transition: all 0.3s ease;
            font-weight: 500;
            box-shadow: 0 4px 15px rgba(67, 97, 238, 0.3);
            border: none;
            cursor: pointer;
            gap: 8px;
          }
          
          .btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(67, 97, 238, 0.4);
            background: linear-gradient(135deg, var(--secondary), var(--primary));
          }
          
          .btn svg {
            width: 18px;
            height: 18px;
            fill: currentColor;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>Date and Time</h1>
          
          <div class="date-container">
            <span class="date-label">Date</span>
            <div class="date-value">${now.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</div>
          </div>
          
          <div class="date-container">
            <span class="date-label">Time</span>
            <div class="time-value">${now.toLocaleTimeString('en-US')}</div>
          </div>
          
          <a href="/basic" class="btn">
            <svg viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            Back to home
          </a>
        </div>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
    console.log(`Serveur démarré:
    - Accueil: http://localhost:${PORT}
    - Page Basic: http://localhost:${PORT}/basic
    - Date: http://localhost:${PORT}/date
    - API Tâches: http://localhost:${PORT}/tasks
    - Interface Tâches: http://localhost:${PORT}/tasks-page
    - Blog API: http://localhost:${PORT}/blog
    - Interface Blog: http://localhost:${PORT}/blog-page
    - Interface Admin: http://localhost:${PORT}/admin-dashboard
                    http://localhost:${PORT}/inscription`);
    
    // Créer un message de démarrage dans le log
    const startupMessage = `\n\n=== Serveur démarré à ${new Date().toISOString()} ===\n`;
    fs.appendFile('server.log', startupMessage, (err) => {
        if (err) console.error('Erreur d\'écriture dans le log:', err);
    });
});