/**
 * Import libraries
 */
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');

const app = express();

/**
 * Initialize variables
 */
const PORT = 80;
const distDir = path.join(__dirname, "/dist/blog-frontend");

/**
 * Middleware
 */
app.use(express.static(distDir)); // Serve angular frontend
app.use(compression()); // Compress all routes
app.use(helmet()); // Prevent against well known vulnerabilities

/**
 * Start server on port
 */
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});