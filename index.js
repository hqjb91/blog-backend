/**
 * Import libraries
 */
const express = require('express');
const compression = require('compression');
const path = require('path');

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
 * Middleware
 */
app.use(express.static(distDir)); // Serve angular frontend
app.use(compression()); // Compress all routes

app.use('/api/user', userRoutes);
app.use('/api/article', articleRoutes);

/**
 * Start server on port
 */
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
