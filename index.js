const express = require('express');
const app = express();

const PORT = 80;

const distDir = __dirname + "/dist/blog-frontend";
app.use(express.static(distDir));

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});