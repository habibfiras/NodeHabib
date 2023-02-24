const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const StudentSchema = new Schema({
    name: {
        type: String,
    },
    age: {
        type: Number,
    },
    note: {
        type: Number
    }

});
module.exports = mongoose.model('Student', StudentSchema);