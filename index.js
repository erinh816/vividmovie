const Joi = require('@hapi/joi');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [
	{id: 1, name: 'Action'},
	{id: 2, name: 'Horror'},
	{id: 3, name: 'Teen'}
];

//app.get
//app.getALL
app.get('/api/genres',(req,res)=>{
    res.send(genres);
});

//app.getONE
app.get('/api/genres/:id', (req, res) => {
	const genre = genres.find((g) => g.id === parseInt(req.params.id));
	if (!genre) {
		res.status(404).send('Genre Not Found');
	} else {
		res.send(genre);
	}
});

//app.post
app.post('/api/genres', (req, res) => {
const schema = Joi.object({
    name:Joi.string().min(3).required()
});

const result = schema.validate(req.body);
if(result.error){
    res.status(400).send(result.error.details[0].message);
    return;
}
	const genre = {
		id: genres.length + 1,
		name: req.body.name
	};
	genres.push(genre);
	res.send(genre);
});

//app.put
app.put('/api/genres/:id', (req,res)=>{
    //Look up the item
	const genre = genres.find((g) => g.id === parseInt(req.params.id));
	if (!genre) {
		res.status(404).send('Genre Not Found');
    };
    
    //Validate
    const schema = Joi.object({
        name:Joi.string().min(3).required()
    });
    const result = schema.validate(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    //Update
    genre.name = req.body.name;
    res.send(genre);

});

//app.delete
app.delete('api/genres/:id',(req,res)=>{
	const genre = genres.find((g) => g.id === parseInt(req.params.id));
	if (!genre) {
		res.status(404).send('Genre Not Found');
    };

    const index = genres.indexOf(genre);
    genres.splice(index,1);
    res.send(genre);
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));


//http://vidly.com/api/genres (end point)

