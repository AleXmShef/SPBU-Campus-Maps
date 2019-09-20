console.log('test');
const express = require('express');
const connectDB = require('./config/db');



const app = express();

app.use(express.json({extended: false}));

//connectDB();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(PORT, () => {
    console.log('Hello world');
});
