const mongoose = require('mongoose');
const genres = require('./routes/genres.js');
const customers = require('./routes/customers.js');
const express = require('express');
const app = express();

mongoose
	.connect('mongodb://localhost/vividmovie')
	.then(() => console.log('connected'))
	.catch((err) => console.error('cannot connect', err));

app.use(express.json());
app.use('/',genres);
app.use('/',customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));


//http://vidly.com/api/genres (end point)

