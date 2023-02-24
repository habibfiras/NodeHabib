const express = require('express');
const router = express.Router();
const student = require('../models/student.js');
 // Create and Save a new student
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "student name can not be empty"
        });
    }
    // Create a student
    const s = new student({
        name: req.body.name || "Untitled student", 
        age: req.body.age,
        note : req.body.note
    });
    // Save student in the database
    s.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the student."
        });
    });
}
// Retrieve and return all students from the database.
exports.findAll = (req, res) => {
    student.find()
    .then(students => {
        res.send(students);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving students."
        });
    });
}
// Find a single student with name
exports.findOne = (req, res) => {
    student.findOne({name: req.params.name})
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "student not found with name " + req.params.name
            });            
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "student not found with name " + req.params.name
            });                
        }
        return res.status(500).send({
            message: "Error retrieving student with name " + req.params.name
        });
    });
}
// Update a student identified by the name in the request
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "student content can not be empty"
        });
    }
const name = req.params.name;
student.findByNameAndUpdate(name,req.body, {useFindAndModify: false})
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "student not found with name " + req.params.name
            });
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "student not found with name " + req.params.name
            });                
        }
        return res.status(500).send({
            message: "Error updating student with name " + req.params.name
        });
    });

};

// Delete a student with the specified name in the request
exports.delete = (req, res) => {
    const name = req.params.name;
    student.findOneAndDelete(name)
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "student not found with name " + req.params.name
            });
        }
        res.send({message: "student deleted successfully!"});
    }
    ).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "student not found with name " + req.params.name
            });                
        }
        return res.status(500).send({
            message: "Could not delete student with name " + req.params.name
        });
    });
};
exports.findAge = (req, res) => {
    student.find().$where('this.age > 18')
    .then(students => {
        res.send(students);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving students."
        });
    });
}

exports.findnote = (req, res) => {
    student.find().$where('this.note > 10').sort({name: 1})
    .then(students => {
        res.send(students);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving students."
        });
    });
}
exports.findnote = (req, res) => {
    student.find().$where('this.note > 10').sort({name: 1})
    .then(students => {
        res.send(students);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving students."
        });
    });
}
exports.traiter = (req, res) => {
    student.find().$where('this.age > 18').$where('this.name.startsWith("A")').updateMany({note: this.note + 2})
    .then(students => {
        res.send(students);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving students."
        });
    });
}
