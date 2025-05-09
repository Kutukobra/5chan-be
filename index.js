const express = require('express');
require('dotenv').config();

const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();

const axios = require('axios');


app.use(express.json());

app.use(cors({
    origin: '*', // e.g., https://5chan.vercel.app
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
}));

app.options("*", cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendStatus(200);
});

const SITE_SECRET = process.env.RECAPTCHA_SECRET_KEY;
app.post('/verify', async (req, res) => {
    const { captchaValue } = req.body
    const { data } = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${SITE_SECRET}&response=${captchaValue}`,
    )
    res.send(data)
})

app.use('/creator', require('./src/routes/creator.route'));
app.use('/post', require('./src/routes/post.route'));

app.listen(
    PORT,
    () => console.log(`Server running on http://localhost:${PORT}`)
);