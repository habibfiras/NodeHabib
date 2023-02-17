const express = require('express');
const router = express.Router();
var contact = require('../models/contact.js');
 router.delete('/:id', (req, res) => {
    contact.findByIdAndRemove(req.params.id).then((data) => {
        res.json({ message: 'Contact Deleted Successfully' })
    }).catch((err) => {
        res.json({ message: 'Contact Not Deleted' })
    })
});
router.get('/contacts', (req, res) => {
    contact.find().then((data) => {
        res.json(data)
    }).catch((err) => {
        res.json({ message: 'No Data Found' })
    })
});
router.get('/', (req, res) => {
    res.json({ message: 'Contact Page' })
});

router.post('/', (req, res) => {
    var contactData = new contact(req.body);
    contactData.save().then((data) => {
        res.json({ message: 'Contact Added Successfully' })
    }).catch((err) => {
        res.json({ message: 'Contact Not Added' })
    })
});
router.put('/:id', (req, res) => {
    contact.findByIdAndUpdate(req.params.id, req.body).then((data) => {
        res.json({ message: 'Contact Updated Successfully' })
    }).catch((err) => {
        res.json({ message: 'Contact Not Updated' })
    })
});
module.exports = router;