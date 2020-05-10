const mongoose = require('mongoose');
const genres = require('./routes/genres.js')
const express = require('express');
const app = express();

mongoose
	.connect('mongodb://localhost/vivid-movie')
	.then(() => console.log('connected'))
	.catch((err) => console.error('cannot connect', err));

app.use(express.json());
app.use('/api/genres',genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));


//http://vidly.com/api/genres (end point)

