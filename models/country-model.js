const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = mongoose.model('project',  new Schema({
  countryname: String,
  nomadscore: Number,
  description: String,
  cost: String,
  temperature: Number,
  funscore: Number,
  contributed_by: String,
}));

module.exports = countrySchema;