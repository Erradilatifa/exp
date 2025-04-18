const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

// Fonction pour obtenir la date actuelle formatée
function getCurrentDateTime() {
    const now = new Date();
    return now.toISOString();
}

// Fonction pour créer le message de log
function createLogMessage(req) {
    return {
        date: getCurrentDateTime(),
        method: req.method,
        url: req.originalUrl,
        ip: req.ip || req.connection.remoteAddress,
        headers: req.headers,
        body: req.body
    };
}

// Middleware de logging personnalisé
function customLoggingMiddleware(req, res, next) {
    const logMessage = createLogMessage(req);
    const logString = JSON.stringify(logMessage, null, 2) + ',\n';
    
    // Chemin vers le fichier de log
    const logFilePath = path.join(__dirname, 'requests.log');
    
    // Écriture dans le fichier de log
    fs.appendFile(logFilePath, logString, (err) => {
        if (err) {
            console.error('Erreur lors de l\'écriture dans le fichier de log:', err);
        }
    });
    
    next();
}

// Configuration de Morgan pour le logging dans la console
const consoleLoggingMiddleware = morgan(':method :url :status :res[content-length] - :response-time ms');

module.exports = {
    customLoggingMiddleware,
    consoleLoggingMiddleware
};