const Points = require('../models/points.model');
const Abecedario = require('../models/abecedario.model');
const Audio = require('../models/audio.model');
const Entrevista = require('../models/entrevista.model');
const ProducaoAcademica = require('../models/producaoAcademica.model');
const Filme = require('../models/filme.model');
const Escola = require('../models/escola.model');
const Politica = require('../models/politica.model');
const Curso = require('../models/curso.model');
const Cineclub = require('../models/cineclub.model');


module.exports = {
  upLike,
  unLike,
}


async function upLike(req) {

  switch (Number(req.params.categoriaId)) {
    case 1:
      return await Abecedario.findByIdAndUpdate(req.params.contentId,{
        $push:{likes: req.user._id}
        }, {
            new: true
        })

    case 2:
      return await Entrevista.findByIdAndUpdate(req.params.contentId,{
        $push:{likes: req.user._id}
        }, {
            new: true
        })

    case 3:
      return await Audio.findByIdAndUpdate(req.params.contentId,{
        $push:{likes: req.user._id}
        }, {
            new: true
        })

    case 4:
      return await ProducaoAcademica.findByIdAndUpdate(req.params.contentId,{
        $push:{likes: req.user._id}
        }, {
            new: true
        })

    case 5:
      return await Politica.findByIdAndUpdate(req.params.contentId,{
        $push:{likes: req.user._id}
        }, {
            new: true
        })

    case 6:
      return await Escola.findByIdAndUpdate(req.params.contentId,{
        $push:{likes: req.user._id}
        }, {
            new: true
        })

    case 7:
      return await Curso.findByIdAndUpdate(req.params.contentId,{
        $push:{likes: req.user._id}
        }, {
            new: true
        })

    case 8:
      return await Cineclub.findByIdAndUpdate(req.params.contentId,{
        $push:{likes: req.user._id}
        }, {
            new: true
        })

    case 9:
      return await Filme.findByIdAndUpdate(req.params.contentId,{
        $push:{likes: req.user._id}
        }, {
            new: true
        })

    default:

      break;
  }
}


async function unLike(req) {

  switch (Number(req.params.categoriaId)) {
    case 1:
      return await Abecedario.findOneAndUpdate({ _id: req.params.contentId },{
        $pullAll: { likes: [req.user._id] }
        }, {
            new: true
        })

    case 2:
      return await Entrevista.findOneAndUpdate({ _id: req.params.contentId },{
        $pullAll: { likes: [req.user._id] }
        }, {
            new: true
        })

    case 3:
      return await Audio.findOneAndUpdate({ _id: req.params.contentId },{
        $pullAll: { likes: [req.user._id] }
        }, {
            new: true
        })

    case 4:
      return await ProducaoAcademica.findOneAndUpdate({ _id: req.params.contentId },{
        $pullAll: { likes: [req.user._id] }
        }, {
            new: true
        })

    case 5:
      return await Politica.findOneAndUpdate({ _id: req.params.contentId },{
        $pullAll: { likes: [req.user._id] }
        }, {
            new: true
        })

    case 6:
      return await Escola.findOneAndUpdate({ _id: req.params.contentId },{
        $pullAll: { likes: [req.user._id] }
        }, {
            new: true
        })

    case 7:
      return await Curso.findOneAndUpdate({ _id: req.params.contentId },{
        $pullAll: { likes: [req.user._id] }
        }, {
            new: true
        })

    case 8:
      return await Cineclub.findOneAndUpdate({ _id: req.params.contentId },{
        $pullAll: { likes: [req.user._id] }
        }, {
            new: true
        })

    case 9:
      return await Filme.findOneAndUpdate({ _id: req.params.contentId },{
        $pullAll: { likes: [req.user._id] }
        }, {
            new: true
        })

    default:

      break;
  }
}