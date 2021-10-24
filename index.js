const { application } = require('express');
const express = require('express');

const app = express();

app.listen(4200, () => {
    console.log(`Server started`);
});