const express = require('express');
const axios = require('axios');
const connectDB = require('./config/db');

const users = require('./routes/api/users');
const assets = require('./routes/api/assets');
const timetable = require('./routes/api/timetable');

const app = express();

app.use(express.json({extended: false}));

connectDB();

app.use('/api/users', users);
app.use('/api/assets', assets);
app.use('/api/timetable', timetable);

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

const PORT = process.env.PORT || 5000;

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
