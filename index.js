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
const cors = require('cors');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const ObjectId = require('mongodb').ObjectID;
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });

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
const HTTPS_BACKEND_PORT = parseInt(process.env.HTTPS_BACKEND_PORT) || 8443;
const HTTP_BACKEND_PORT = parseInt(process.env.HTTP_BACKEND_PORT) || 880;
// const distDir = path.join(__dirname, "/dist/blog-frontend");
const staticDir = path.join(__dirname, "/static");
const pathToPublicKey = process.env.JWT_PUBLIC_KEY_PATH;
const PUBLIC_KEY = fs.readFileSync(pathToPublicKey, 'utf8');
const { DB_NAME, USER_COLLECTION } = require('./utils/constants');

/**
 * Initialize MongoDB Client
 */
const mongoClient = new MongoClient(process.env.MONGO_CLIENT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Passport middleware for JWT authentication
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUBLIC_KEY,
    algorithms: ['RS256']
  };

// The JWT payload is passed into the verify callback
passport.use(new JwtStrategy(options, async function(jwt_payload, cb) {

    // We will assign the `sub` property on the JWT to the database ID of user
    try {
        const user = await mongoClient.db(DB_NAME).collection(USER_COLLECTION)
                            .findOne({_id: ObjectId(jwt_payload.sub)});
            if(user) {
                return cb(null, user);
            } else {
                return cb(null, false);
            }
         } catch(err) {   
            cb(err, false);
        };
}));

app.use(passport.initialize()); // Initialize passport object for all requests (Need to do this before route registration)

/**
 * Middleware
 */
app.use('/', httpsRedirect()); // Https redirection
// app.use(express.static(distDir)); // Serve angular frontend
app.use(express.static(staticDir)); // Serve static files
app.use(compression()); // Compress all routes
app.use(express.json({ limit: '50mb' })); // Limit json sent to server
app.use(cors()); // Allow for CORS

app.use('/api/user', userRoutes(mongoClient));
app.use('/api/article', articleRoutes(mongoClient));
app.use(limiter);

/**
 * Connect to MongoDB and Start server on port
 */
const p0 = mongoClient.connect();

Promise.all([p0]).then( () => {

    http.createServer(app).listen(HTTP_BACKEND_PORT, () => {
        console.log(`Application started on port ${HTTP_BACKEND_PORT} at ${new Date()}`)
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
                console.info(`Application started on port ${HTTPS_BACKEND_PORT} at ${new Date()}`);
            });
        }
    } catch(e) {
        console.error(e);
    };

})
.catch( err => {
    console.error(err);
});