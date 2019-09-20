const express = require('express');
const connectDB = require('./config/db');

const app = express();

app.use(express.json({extended: false}));

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
    //console.log(`Server started on port ${PORT}`);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Blank page\n');
    console.log('Hello world');
});
