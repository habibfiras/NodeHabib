const express = require('express');
const logger = require('morgan');
const createError = require('http-errors');
const studentRouter = require('./routes/student.js');
const dbConig = require('./database/mongodb.json');
const app = express();
const mongoose = require('mongoose');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/student', studentRouter);
app.use((req, res, next) => {
    next((createError(404))); 
    })
mongoose.set('strictQuery', true);
mongoose.connect(dbConig.mongo.uri);

module.exports = app;