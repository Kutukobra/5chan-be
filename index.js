const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;


var corsOptions = {
    origin: ["http://localhost:5173","https://5chan-be.vercel.app"],
}

// app.use(cors(corsOptions));

app.use(express.json());

app.get('/', (req, res) => {
    res.sendStatus(200);
});

app.use('/creator', require('./src/routes/creator.route'));
app.use('/post', require('./src/routes/post.route'));

app.listen(
    PORT,
    () => console.log(`Server running on http://localhost:${PORT}`)
);