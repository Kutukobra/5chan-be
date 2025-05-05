const express = require('express');
require('dotenv').config();

const cors = require('cors');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(cors());  

const corsOptions = {
    origin: 'https://5chan-chi.vercel.app/',
    optionsSuccessStatus: 200
};

app.get('/', (req, res) => {
    res.sendStatus(200);
});

app.use('/creator', require('./src/routes/creator.route'));
app.use('/post', cors(corsOptions), require('./src/routes/post.route'));

app.listen(
    PORT,
    () => console.log(`Server running on http://localhost:${PORT}`)
);