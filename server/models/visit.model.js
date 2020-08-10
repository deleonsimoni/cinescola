const mongoose = require('mongoose');

const VisitsSchema = new mongoose.Schema({
  counter: {
    type: Number,
    required: true
  }}, {
  versionKey: false
});


module.exports = mongoose.model('Visits', VisitsSchema  );
