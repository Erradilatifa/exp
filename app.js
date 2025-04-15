const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Importez le routeur basic
const basicRouter = require('./routes/basic'); // Assurez-vous que le chemin est correct

// Configuration des middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Configuration des vues
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// Route pour la page d'accueil (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Montez le routeur basic sous le chemin '/basic'
app.use('/basic', basicRouter);

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
  - Date: http://localhost:${PORT}/date`);
});