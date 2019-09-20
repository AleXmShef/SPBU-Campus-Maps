console.log('test');
const express = require('express');
const connectDB = require('./config/db');
const qs = require('querystring');
const crypto = require('crypto');



const app = express();

app.use(express.json({extended: false}));

connectDB();

const PORT = process.env.PORT || 5000;

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        const urlParams = req.params;
        const ordered = {};
        Object.keys(urlParams).sort().forEach((key) => {
            if (key.slice(0, 3) === 'vk_') {
                ordered[key] = urlParams[key];
            }
        });

        const stringParams = qs.stringify(ordered);
        const paramsHash = crypto
            .createHmac('sha256', 'AYQudtptlxliZcqYQ80t')
            .update(stringParams)
            .digest()
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=$/, '');
        console.log(paramsHash);
        res.json(paramsHash);
        //res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

else {
    app.get('/', (req, res) => {
        //res.send('Hello World!')
        const urlParams = req.params;
        const ordered = {};
        Object.keys(urlParams).sort().forEach((key) => {
            if (key.slice(0, 3) === 'vk_') {
                ordered[key] = urlParams[key];
            }
        });

        const stringParams = qs.stringify(ordered);
        const paramsHash = crypto
            .createHmac('sha256', 'AYQudtptlxliZcqYQ80t')
            .update(stringParams)
            .digest()
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=$/, '');
        console.log('wtf');
        console.log(paramsHash);
        res.json(paramsHash);
    });
}

app.listen(PORT, () => {
    console.log('Hello world');
});
