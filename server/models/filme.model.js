const mongoose = require('mongoose');

const FilmeSchema = new mongoose.Schema({

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
  descricao: {
    type: String
  },
  fichaTecnica: {
    type: String
  },
  sinopse: {
    type: String
  },
  linkVideo: {
    type: String
  },
  indicadoPor: {
    type: String
  },
  icAprovado: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  links: [{
    nome: String,
    link: String
  }]

}, {
  versionKey: false
});


module.exports = mongoose.model('Filme', FilmeSchema);
