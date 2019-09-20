const express = require('express');
const connectDB = require('./config/db');

const app = express();

app.use(express.json({extended: false}));

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    //console.log(`Server started on port ${PORT}`);
    console.log('Hello world');
});
