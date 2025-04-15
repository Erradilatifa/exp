const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Hello World </title>
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
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          
          .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
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
            font-size: 2.5rem;
            position: relative;
            display: inline-block;
          }
          
          h1::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 3px;
            background: var(--accent);
            border-radius: 3px;
          }
          
          p {
            color: #495057;
            margin: 1.5rem 0;
            font-size: 1.1rem;
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
          
          .emoji {
            font-size: 1.5rem;
            margin-left: 8px;
            vertical-align: middle;
            animation: wave 2s infinite;
            display: inline-block;
            transform-origin: 70% 70%;
          }
          
          @keyframes wave {
            0% { transform: rotate(0deg); }
            10% { transform: rotate(14deg); }
            20% { transform: rotate(-8deg); }
            30% { transform: rotate(14deg); }
            40% { transform: rotate(-4deg); }
            50% { transform: rotate(10deg); }
            60% { transform: rotate(0deg); }
            100% { transform: rotate(0deg); }
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>Hello World<span class="emoji">👋</span></h1>
          <p>Welcome, I'm Latifa Erradi 💜</p>
          <a href="/date" class="btn">
            <svg viewBox="0 0 24 24">
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
            </svg>
            View current time
          </a>
        </div>
      </body>
    </html>
  `);
});

router.get('/date', (req, res) => {
  const now = new Date();
  
  // Formatage de la date et heure
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };
  
  const currentDate = now.toLocaleDateString('en-US', options);
  const currentTime = now.toLocaleTimeString('en-US', options);

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
          
          <a href="/" class="btn">
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

module.exports = router;