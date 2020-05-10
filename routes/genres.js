const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


// const genres = [
// 	{id: 1, name: 'Action'},
// 	{id: 2, name: 'Horror'},
// 	{id: 3, name: 'Teen'}
// ];

//***Create schema to replace the array */
const genreSchema = new mongoose.Schema({
    id:Number,
    name:String
});

const Genre = mongoose.model('Genre', genreSchema);

//create new document
async function createGenre(){
    const genre = new Genre({
        id:3,
        name:'Teen'
    });
    const result = await genre.save();
    console.log(result);
}

//Get
async function getGenres(){
    //getALL
    // const genres = await Genre.find();
    // console.log(genres);

    //customize query
    const genres = await Genre
     .find()
     .sort({name:-1})
     console.log(genres)
}

//PUT
async function updateGenre(id){
    const genre = await Genre.findById(id);
    if(!genre) return;
    genre.name = 'Romcom';
    const result = await genre.save();
    console.log(result);
}

//DELETE
async function removeGenre(id){
    const result = await Genre.deleteOne({_id:id});
    console.log(result);
}

removeGenre('5eb83a241da0bc91066aa98f');

// //app.get
// //app.getALL
// app.get('/api/genres',(req,res)=>{
//     res.send(genres);
// });

// //app.getONE
// app.get('/api/genres/:id', (req, res) => {
// 	const genre = genres.find((g) => g.id === parseInt(req.params.id));
// 	if (!genre) {
// 		res.status(404).send('Genre Not Found');
// 	} else {
// 		res.send(genre);
// 	}
// });

// //app.post
// app.post('/api/genres', (req, res) => {
// const schema = Joi.object({
//     name:Joi.string().min(3).required()
// });

// const result = schema.validate(req.body);
// if(result.error){
//     res.status(400).send(result.error.details[0].message);
//     return;
// }
// 	const genre = {
// 		id: genres.length + 1,
// 		name: req.body.name
// 	};
// 	genres.push(genre);
// 	res.send(genre);
// });

// //app.put
// app.put('/api/genres/:id', (req,res)=>{
//     //Look up the item
// 	const genre = genres.find((g) => g.id === parseInt(req.params.id));
// 	if (!genre) {
// 		res.status(404).send('Genre Not Found');
//     };
    
//     //Validate
//     const schema = Joi.object({
//         name:Joi.string().min(3).required()
//     });
//     const result = schema.validate(req.body);
//     if(result.error){
//         res.status(400).send(result.error.details[0].message);
//         return;
//     }

//     //Update
//     genre.name = req.body.name;
//     res.send(genre);

// });

// //app.delete
// app.delete('api/genres/:id',(req,res)=>{
// 	const genre = genres.find((g) => g.id === parseInt(req.params.id));
// 	if (!genre) {
// 		res.status(404).send('Genre Not Found');
//     };

//     const index = genres.indexOf(genre);
//     genres.splice(index,1);
//     res.send(genre);
// });


module.exports = router;