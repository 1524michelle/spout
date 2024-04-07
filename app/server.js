import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from './config.mjs';
import express from 'express';
import session from 'express-session';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import ejs from 'ejs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.set('view engine', 'html');
app.set('views', join(__dirname, 'views'));
app.engine('html', ejs.renderFile);

const port = process.env.PORT || 3000;

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(express.static('public'));

// routes

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'views', 'landing.html'));
});

app.get('/rules', (req, res) => {
    res.sendFile(join(__dirname, 'views', 'rules.html'));
});

app.get('/lookaway', (req, res) => {
    res.sendFile(join(__dirname, 'views', 'lookaway.html'));
});

async function generateTopics() {
    // try {
    //     const prompt = "i need a list of 3 topics (for example capitalism, michael jackson, why climate change is not real, the worst day ever, birds are government drone, etc. i also need a list of 3 pairs of phrases (6 total phrases) in an easy/hard pattern (for example {easy: famous last words, hard: touch grass},easy: haters gonna hate, hard: quite the handful},{easy: snug as a bug in a rug, hard: bobs your uncle}). return the result as a json object, where i can index the second topic like this obj.topic[1] and i can index the first easy prompt like this obj.prompt[0].easy . the topics/phrases should not be a copy of my examples, but something in the same line of thought. the text should all be lowercase. do not generate responses that will be blocked due to safety. DO NOT ENCLOSE IN BACKTICKS!!! just output the json. Output in JSON format, valid fields are topic and prompt. Do not use markdown. JSON: ";
    //     const result = await model.generateContent(prompt);
    //     const response = await result.response;
    //     // console.log(typeof(response));
    //     const text = response.text();
    //     console.log("TEXT: " + text);
    //     const generatedData = await response.json();

    //     const topicsData = {
    //         topic: generatedData.topic,
    //         prompt: []
    //     };

    //     // Process the generated prompts to match the required format
    //     for (let i = 0; i < generatedData.prompt.length; i += 2) {
    //         topicsData.prompt.push({
    //             easy: generatedData.prompt[i],
    //             hard: generatedData.prompt[i + 1]
    //         });
    //     }

    //     return topicsData;
    // } catch (error) {
    //     console.error("Error generating topics:", error);
    //     throw new Error("Internal Server Error");
    // }
    try {
        const content = {
            "topic": [
                "the worst day ever",
                "why climate change is not real",
                "birds are government drones"
            ],
            "prompt": [
                {
                    "easy": "life comes at you fast",
                    "hard": "don't poke the bear"
                },
                {
                    "easy": "actions speak louder than words",
                    "hard": "out with the old, in with the new"
                },
                {
                    "easy": "it's not rocket science",
                    "hard": "you can't judge a book by its cover"
                }
            ]
        };
        return content;
    } catch (error) {
        console.error("Error generating topics:", error);
        throw new Error("Internal Server Error");
    }
}

app.get('/picktopic', async (req, res) => {
    try {
        const content = await generateTopics();
        res.render(join(__dirname, 'views', 'picktopic'), { topics: content.topic });
    } catch (error) {
        res.status(500).send(error.message);
    }
});


app.post('/picktopic', async (req, res) => {
    // Handle selection of topic card
    // Example: Update game state, redirect to pick phrase page, etc.
});

app.get('/pickphrase', async (req, res) => {
    // res.sendFile(join(__dirname, 'views', 'pickphrase.html'));
    try {
        const topicsData = await generateTopics();
        res.json(topicsData);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/pickphrase', async (req, res) => {
    // Handle selection of phrase card
    // Example: Update game state, redirect to timer page, etc.
});

app.get('/timer', (req, res) => {
    res.sendFile(join(__dirname, 'views', 'timer.html'));
});

app.get('/timerrunning', (req, res) => {
    // Get selected topic from query parameters
    const selectedTopic = req.query.topic;
    // Render timer running page HTML with selected topic
    res.render(join(__dirname, 'views', 'timerrunning'), { topic: selectedTopic });
});

app.get('/timerdone', (req, res) => {
    res.sendFile(join(__dirname, 'views', 'timerdone.html'));
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
