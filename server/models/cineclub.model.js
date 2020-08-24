const mongoose = require('mongoose');

const CineclubSchema = new mongoose.Schema({

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
  cidade: {
    type: String
  },
  pagina: {
    type: String
  },
  instituicao: {
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


module.exports = mongoose.model('Cineclub', CineclubSchema);
