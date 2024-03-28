const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const transactionSchema = new Schema({
    name: { type: String, required: true },
    price:{type : Number ,required :true},  
    datetime: { type: Date, required: true },
    description: { type: String, required: true } // Fixed the field name here
});

const Transaction = model('Transaction', transactionSchema); // Changed variable name to Transaction

module.exports = Transaction;
