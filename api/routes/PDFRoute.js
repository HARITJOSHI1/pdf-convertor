const express = require('express');
const PDFController = require('../controllers/PDFController');
const Router = express.Router();

Router.route('/').get(PDFController.getData);
Router.route('/convertFromOffice').get(PDFController.convert);

module.exports = Router;