const {Customer} = require('../models/customer.js');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const express = require('express');
const router = express.Router();


//app.getALL
router.get('/api/customers', async (req, res) => {
	const customers = await Customer.find()
		// .sort({name:-1})
		.sort('name');
	console.log(customers);
	res.send(customers);
});

//app.getONE
router.get('/api/customers/:id', async(req, res) => {
    const customer = await Customer.findById(req.params.id)
	if (!customer) {
		res.status(404).send('Customer Not Found');
	} else {
		res.send(customer);
	}
});

//POST
router.post('/api/customers', async (req, res) => {
	const schema = Joi.object({
        name:Joi.string().min(5).max(50).required(),
        phone:Joi.string().min(5).max(50).required(),
        isGold:Joi.boolean()
	});

	const result = schema.validate(req.body);
	if (result.error) {
		res.status(400).send(result.error.details[0].message);
		return;
	}
	let customer = new Customer({ 
        isGold:req.body.isGold,
        name: req.body.name,
        phone:req.body.phone
     });
	customer = await customer.save();
    res.send(customer);
});

//app.put
router.put('/api/customers/:id', async (req,res)=>{
    //Validate
    const schema = Joi.object({
        name:Joi.string().min(5).max(50).required(),
        phone:Joi.string().min(5).max(50).required(),
        isGold:Joi.boolean()
    });
    const result = schema.validate(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    //Lookup
    const customer = await Customer.findByIdAndUpdate(req.params.id,{name:req.body.name},{
        new:true
    });
    
    if (!customer) {
		res.status(404).send('Customer Not Found');
    };

	// const result = await genre.save();
    
    res.send(customer);
});

//Delete
router.delete('api/customers/:id',async (req,res)=>{
	const customer = await Customer.findByIdAndRomove(id);
	if (!customer) {
		res.status(404).send('Customer Not Found');
    };
    res.send(customer);
});

module.exports = router;

