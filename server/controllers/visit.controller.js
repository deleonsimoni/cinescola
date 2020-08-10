const Visit = require('../models/visit.model');


module.exports = {
  viewsUp,
  find

}

async function viewsUp() {
  return await Visit.findByIdAndUpdate('5f309b6febd9a86360df966d', { $inc: { counter: 1 } }, { new:true });
}

async function find() {
  return await Visit.findById('5f309b6febd9a86360df966d');
}

