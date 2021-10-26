/**
 * Import libraries
 */
const express = require('express');
const { MongoClient } = require('mongodb');
const compression = require('compression');
const path = require('path');

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
const PORT = parseInt(process.env.PORT) || 80;
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
app.use(express.static(distDir)); // Serve angular frontend
app.use(compression()); // Compress all routes
app.use(express.json({ limit: '50mb' })); // Limit json sent to server

app.use('/api/user', userRoutes);
app.use('/api/article', articleRoutes);

/**
 * Connect to MongoDB and Start server on port
 */
const p0 = mongoClient.connect();

Promise.all([p0]).then( () => {

	app.listen(PORT, () => {
		console.info(`Application started on port ${PORT} at ${new Date()}`);
	});

})
.catch( err => {
    console.error(err);
});