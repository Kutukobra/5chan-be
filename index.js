const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const rateLimit = require('express-rate-limit');

const cors = require('cors');

app.use(cors());

const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)

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