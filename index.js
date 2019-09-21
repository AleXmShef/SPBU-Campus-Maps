const express = require('express');
const axios = require('axios');
const connectDB = require('./config/db');

const app = express();

app.use(express.json({extended: false}));

connectDB();

const PORT = process.env.PORT || 5000;

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('Fuck you')
    });
}

app.listen(PORT, () => {
    console.log('Server started');
});

//Heroku anti shutdown request
setInterval(async () => {
    try {
        const resp = await axios.get("https://spbu-campus-maps.herokuapp.com/");
    } catch (err) {
        //Basically impossible to end up here
        console.error(err);
    }
}, 120000);
