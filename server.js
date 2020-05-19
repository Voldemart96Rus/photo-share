const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
require('dotenv').config();
global.fetch = fetch;

// const connectDB = require('./config/db');

const app = express();

// connectDB();

app.use(express.json({extended: false}));

app.use('/api/photos', require('./routes/api/photos'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (_req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));