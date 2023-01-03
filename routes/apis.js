const express = require('express');
const api = express.Router();
const controllers = require('../controllers/sdmsControllers')

api.get('/getSchools', controllers.schools);
api.post('/addTeacher', controllers.addTeacher);
api.post('/getHierarchy', controllers.getHierarchy);
module.exports = api;