const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL)

const db = mongoose.connection;

db.on('connected' , () =>{
    console.log('mongo DB connection successful');
})


db.on('error' , (_err) =>{
    console.log('mongo DB connection Failed');
})


module.exports = db;