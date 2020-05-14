const mongoose = require('mongoose');
const Joi = require('@hapi/joi');


const customerSchema = new mongoose.Schema({
    isGold:{
        type:Boolean,
        default:false
    },
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    phone:{
        type:Number,
        required:true,
        minlength:5,
        maxlength:50
    }
});

const Customer = mongoose.model('Customer', customerSchema);

exports.Customer = Customer;
// exports.validate = validateCustomer;