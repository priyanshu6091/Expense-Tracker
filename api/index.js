const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Transaction = require('./models/Transaction'); // Importing Transaction model
const mongoose = require('mongoose');
const app = express();
const path=require("path");

app.use(cors());
app.use(express.json())
app.get('/',(req, res) => {
    app.use(express.static(path.join(__dirname,"../Frontend","dist")));
    res.sendFile(path.resolve(__dirname,"../Frontend","dist","index.html"));
}) 
   
app.get('/api/test', (req, res) => {
    res.send('test ok done');
});


app.post('/api/transaction', async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(process.env.MONGO_URL);
    const { price, name, datetime, description } = req.body;
    const transaction = await Transaction.create({ price, name, datetime, description }); // Using Transaction model here
    res.json(transaction);
});

 
app.get('/api/transactions', async (req, res) => { // Corrected the order of (req, res)
    await mongoose.connect(process.env.MONGO_URL);
    const transactions = await Transaction.find();
    res.json(transactions); // Changed res.send to res.json
}); 


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
 