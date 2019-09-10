const express = require('express');

const questionRouter =  express.Router();

const {HTTP_STATUS_CODES } = require('../config.js');
const { Question } = require('./question.model.js');

// RETRIEVE QUESTIONS 

questionRouter.get('/', (request, response) => {
   console.log("inside questionRouter: " + Question.find( { index: 0 })) ;
});

module.exports = { questionRouter };