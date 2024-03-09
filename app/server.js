require('dotenv').config({path: '../.env'});

const express = require('express');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 3000;

// middleware setup

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(express.static('public'));

// routes

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/landing.html');
});

app.get('/rules', (req, res) => {
    res.sendFile(__dirname + '/views/rules.html');
});

app.get('/lookaway', (req, res) => {
    res.sendFile(__dirname + '/views/lookaway.html');
});

app.get('/picktopic', (req, res) => {
    res.sendFile(__dirname + '/views/picktopic.html');
});

app.post('/picktopic', (req, res) => {
    // Handle selection of topic card
    // Example: Update game state, redirect to pick phrase page, etc.
});

app.get('/pickphrase', (req, res) => {
    res.sendFile(__dirname + '/views/pickphrase.html');
});

app.post('/pickphrase', (req, res) => {
    // Handle selection of phrase card
    // Example: Update game state, redirect to timer page, etc.
});

app.get('/timer', (req, res) => {
    res.sendFile(__dirname + '/views/timer.html');
});

app.get('/timerrunning', (req, res) => {
    // Get selected topic from query parameters
    const selectedTopic = req.query.topic;
    // Render timer running page HTML with selected topic
    res.render(__dirname + '/views/timerrunning', { topic: selectedTopic });
});

app.get('/timerdone', (req, res) => {
    res.sendFile(__dirname + '/views/timerdone.html');
});

// clear session and redirect to rules page
app.get('/playagain', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        } else {
            console.log('Session destroyed successfully.');
        }
    });
    res.redirect('/rules');
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
