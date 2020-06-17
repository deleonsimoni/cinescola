const Points = require('../models/points.model');
const Abecedario = require('../models/abecedario.model');
const Audio = require('../models/audio.model');
const Entrevista = require('../models/entrevista.model');
const ProducaoAcademica = require('../models/producaoAcademica.model');

const Escola = require('../models/escola.model');
const Politica = require('../models/politica.model');
const Curso = require('../models/curso.model');
const Cineclub = require('../models/cineclub.model');


module.exports = {
  getPointsByCategoria,
  getPointsByCoordinator,
  getAbecedarioPoint,
  getAudioPoint,
  getEntrevistaPoint,
  getProducaoAcademicaPoint,
  getEscolaPoint,
  getPoliticaPoint,
  getCursoPoint,
  getCineclubPoint,
  getContentOfPoint,
  create,
  getPointsByCategoria,

}

async function create(point) {
  point.location = {
    coordinates: [point.lng, point.lat]
  }
  return await new Points(point).save();
}

async function getPointsByCoordinator(lat, lng) {
  return await Points.findOne({
    'location.coordinates': [lng, lat]
  });
}


async function getContentOfPoint(req) {

  switch (Number(req.params.categoriaId)) {
    case 1:
      return await getAbecedarioPoint(req);
    case 2:
      return await getEntrevistaPoint(req);
    case 3:
      return await getAudioPoint(req);
    case 4:
      return await getProducaoAcademicaPoint(req);
    case 5:
      return await getPoliticaPoint(req);
    case 6:
      return await getEscolaPoint(req);
    case 7:
      return await getCursoPoint(req);
    case 8:
      return await getCineclubPoint(req);
    default:

      break;
  }
}

async function getPointsByCategoria(req) {

  let pointsId = [];

  switch (Number(req.params.categoriaId)) {
    case 1:
      pointsId = await Abecedario.find({userId: req.user._id}).select('-_id pointId');
      pointsId = await pointsId.map(element => {
        return element.pointId;
      });
      return await Points.find({_id: { $in : pointsId}});

    case 2:
      pointsId = await Entrevista.find({userId: req.user._id}).select('-_id pointId');
      pointsId = await pointsId.map(element => {
        return element.pointId;
      });
      return await Points.find({_id: { $in : pointsId}});

    case 3:
      pointsId = await Audio.find({userId: req.user._id}).select('-_id pointId');
      pointsId = await pointsId.map(element => {
        return element.pointId;
      });
      return await Points.find({_id: { $in : pointsId}});

    case 4:
      pointsId = await ProducaoAcademica.find({userId: req.user._id}).select('-_id pointId');
      pointsId = await pointsId.map(element => {
        return element.pointId;
      });
      return await Points.find({_id: { $in : pointsId}});

    case 5:
      pointsId = await Politica.find({userId: req.user._id}).select('-_id pointId');
      pointsId = await pointsId.map(element => {
        return element.pointId;
      });
      return await Points.find({_id: { $in : pointsId}});

    case 6:
      pointsId = await Escola.find({userId: req.user._id}).select('-_id pointId');
      pointsId = await pointsId.map(element => {
        return element.pointId;
      });
      return await Points.find({_id: { $in : pointsId}});

    case 7:
      pointsId = await Curso.find({userId: req.user._id}).select('-_id pointId');
      pointsId = await pointsId.map(element => {
        return element.pointId;
      });
      return await Points.find({_id: { $in : pointsId}});

    case 8:
      pointsId = await Cineclub.find({userId: req.user._id}).select('-_id pointId');
      pointsId = await pointsId.map(element => {
        return element.pointId;
      });
      return await Points.find({_id: { $in : pointsId}});

    default:
      break;
  }
}

async function getAbecedarioPoint(req) {
  return await Abecedario.find({
    pointId: req.params.pointId,
    userId: req.user._id
  })
    .sort({
      createAt: 1
    });
}



async function getAudioPoint(req) {
  return await Audio.find({
    pointId: req.params.pointId,
    userId: req.user._id
  })
    .sort({
      createAt: 1
    });
}



async function getEntrevistaPoint(req) {
  return await Entrevista.find({
    pointId: req.params.pointId,
    userId: req.user._id
  })
    .sort({
      createAt: 1
    });
}



async function getProducaoAcademicaPoint(req) {
  return await ProducaoAcademica.find({
    pointId: req.params.pointId,
    userId: req.user._id
  })
    .sort({
      createAt: 1
    });
}


async function getPoliticaPoint(req) {
  return await Politica.find({
    pointId: req.params.pointId,
    userId: req.user._id
  })
    .sort({
      createAt: 1
    });
}



async function getEscolaPoint(req) {
  return await Escola.find({
    pointId: req.params.pointId,
    userId: req.user._id
  })
    .sort({
      createAt: 1
    });
}



async function getCursoPoint(req) {
  return await Curso.find({
    pointId: req.params.pointId,
    userId: req.user._id
  })
    .sort({
      createAt: 1
    });
}



async function getCineclubPoint(req) {
  return await Cineclub.find({
    pointId: req.params.pointId,
    userId: req.user._id
  })
    .sort({
      createAt: 1
    });
}
