const mongoose = require('mongoose');

const EscolaSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  pointId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Point'
  },

  nome: {
    type: String
  },
  pais: {
    type: String
  },
  instituicao: {
    type: String
  },
  cidade: {
    type: String
  },
  descricao: {
    type: String
  },
  icAprovado: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  links: [{
    nome: String,
    link: String
  }],
  
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],


}, {
  versionKey: false
});


module.exports = mongoose.model('Escola', EscolaSchema);
