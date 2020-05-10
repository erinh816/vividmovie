const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const express = require('express');
const router = express.Router();

// const genres = [
// 	{id: 1, name: 'Action'},
// 	{id: 2, name: 'Horror'},
// 	{id: 3, name: 'Teen'}
// ];

//***Create schema to replace the array */
const genreSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50
	}
});

const Genre = mongoose.model('Genre', genreSchema);

//create new document
// async function createGenre() {
// 	const genre = new Genre({
// 		id: 3,
// 		name: 'Teen'
// 	});
// 	const result = await genre.save();
// 	console.log(result);
// }

//Get
// async function getGenres(){
//     //getALL
//     // const genres = await Genre.find();
//     // console.log(genres);

//     //customize query
//     const genres = await Genre
//      .find()
//      .sort({name:-1})
//      console.log(genres)
// }

//PUT
// async function updateGenre(id) {
// 	const genre = await Genre.findById(id);
// 	if (!genre) return;
// 	genre.name = 'Romcom';
// 	const result = await genre.save();
// 	console.log(result);
// }

//DELETE
// async function removeGenre(id) {
// 	const result = await Genre.deleteOne({ _id: id });
// 	console.log(result);
// }

// removeGenre('5eb83a241da0bc91066aa98f');

//app.get
//app.getALL
router.get('/api/genres', async (req, res) => {
	const genres = await Genre.find()
		// .sort({name:-1})
		.sort('name');
	console.log(genres);
	res.send(genres);
});

//app.getONE
router.get('/api/genres/:id', async(req, res) => {
    const genre = await Genre.findById(req.params.id)
	if (!genre) {
		res.status(404).send('Genre Not Found');
	} else {
		res.send(genre);
	}
});

//POST
router.post('/api/genres', async (req, res) => {
	const schema = Joi.object({
		name: Joi.string().min(3).required()
	});

	const result = schema.validate(req.body);
	if (result.error) {
		res.status(400).send(result.error.details[0].message);
		return;
	}
	let genre = new Genre({ name: req.body.name });
	genre = await genre.save();
    res.send(genre);
});

//app.put
router.put('/api/genres/:id', async (req,res)=>{
    //Validate
    const schema = Joi.object({
        name:Joi.string().min(3).required()
    });
    const result = schema.validate(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    //Lookup
    const genre = await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{
        new:true
    });
    
    if (!genre) {
		res.status(404).send('Genre Not Found');
    };

	// const result = await genre.save();
    
    res.send(genre)
});

//Delete
router.delete('api/genres/:id',async (req,res)=>{
	const genre = await Genre.findByIdAndRomove(id);
	if (!genre) {
		res.status(404).send('Genre Not Found');
    };
    res.send(genre);
});

module.exports = router;


//questions: don't we need to save for the update route?
//NO, because that method is findByIdAndUpdate

