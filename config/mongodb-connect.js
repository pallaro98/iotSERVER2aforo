'use strict'
const mongoose = require('mongoose');

let config = require('../config');

let mongoDB = config.db;

mongoose.connect(mongoDB,{
    dbName: 'IOTDB',
    useUnifiedTopology: true,
    useNewUrlParser: true,
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
    console.log(err);
    });


module.exports = {mongoose};