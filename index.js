console.log('test');
const express = require('express');
const connectDB = require('./config/db');



const app = express();

app.use(express.json({extended: false}));

//connectDB();

const PORT = process.env.PORT || 5000;

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

else {
    app.get('/', (req, res) => {
        res.send('Hello World!')
    });
}

app.listen(PORT, () => {
    console.log('Hello world');
});
