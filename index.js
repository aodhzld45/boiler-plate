const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://aodhzld45:abcd@1013@boilerplate.jjqmznv.mongodb.net/?retryWrites=true&w=majority";
const express = require('express');
const app = express();
const port = 5000;

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://aodhzld45:abcd1013@boiler-plate.mju6n4y.mongodb.net/', {
}).then(() => {
  console.log('MongoDB Connected.. Success');
}).catch((err) => {
  console.log(err + 'git ignore test');
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
