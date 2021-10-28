/**
 * Import libraries
 */
const fs = require('fs');
const express = require('express');
const { MongoClient } = require('mongodb');
const compression = require('compression');
const path = require('path');
const https = require('https');
const http = require('http');
const httpsRedirect = require('express-https-redirect');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();

/**
 * Define routes
 */
const userRoutes = require('./routes/user');
const articleRoutes = require('./routes/article');

/**
 * Initialize variables
 */
const HTTPS_PORT = parseInt(process.env.HTTPS_PORT) || 443;
const HTTP_PORT = parseInt(process.env.HTTP_PORT) || 80;
const distDir = path.join(__dirname, "/dist/blog-frontend");

/**
 * Initialize MongoDB Client
 */
const mongoClient = new MongoClient(process.env.MONGO_CLIENT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

/**
 * Middleware
 */
app.use('/', httpsRedirect()); // Https redirection
app.use(express.static(distDir)); // Serve angular frontend
app.use(compression()); // Compress all routes
app.use(express.json({ limit: '50mb' })); // Limit json sent to server

app.use('/api/user', userRoutes());
app.use('/api/article', articleRoutes());

/**
 * Connect to MongoDB and Start server on port
 */
const p0 = mongoClient.connect();

Promise.all([p0]).then( () => {

    http.createServer(app).listen(HTTP_PORT, () => {
        console.log(`Application started on port ${HTTP_PORT} at ${new Date()}`)
      })

    try {
        if (fs.existsSync('/etc/letsencrypt/live/hequanjie.com/privkey.pem')) {
            https.createServer(
                {
                    key: fs.readFileSync('/etc/letsencrypt/live/hequanjie.com/privkey.pem'),
                    cert: fs.readFileSync('/etc/letsencrypt/live/hequanjie.com/cert.pem'),
                    ca: fs.readFileSync('/etc/letsencrypt/live/hequanjie.com/chain.pem'),
                },
                app
            ).listen(HTTPS_PORT, () => {
                console.info(`Application started on port ${HTTPS_PORT} at ${new Date()}`);
            });
        }
    } catch(e) {
        console.error(e);
    };

})
.catch( err => {
    console.error(err);
});