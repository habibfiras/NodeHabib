const express = require('express');
const router = express.Router();
var student = require('../service/studentService.js');

// Create a new student
router.post("/add",student.create);
// Retrieve all students
router.get("/get",student.findAll);
// Retrieve a single student with name
router.get("/age",student.findAge);
router.get("/note",student.findnote);
router.get("/traiter",student.traiter);

router.get("/get/:name",student.findOne);
// Update a student with name
router.put("/update/:name",student.update);
module.exports = router;
