const Points = require('../models/points.model');
const Abecedario = require('../models/abecedario.model');
const Audio = require('../models/audio.model');
const Entrevista = require('../models/entrevista.model');
const ProducaoAcademica = require('../models/producaoAcademica.model');


module.exports = {
  getPointsByCategoria,
  getPointsByCoordinator,
  getAbecedarioPoint,
  getAudioPoint,
  getEntrevistaPoint,
  getProducaoAcademicaPoint,
  getContentOfPoint,
  create,

}

async function create(point) {
  return await new Points(point).save();
}

async function getPointsByCoordinator(lat, lng) {
  return await Points.findOne({
    'lat': lat,
    'lng': lng
  });
}


async function getContentOfPoint(req) {

  switch (Number(req.params.categoriaId)) {
    case 1:
      return await getAbecedarioPoint(req);
    case 2:
      return await getAudioPoint(req);
    case 3:
      return await getEntrevistaPoint(req);
    case 4:
      return await getProducaoAcademicaPoint(req);
    default:
      break;
  }
}

async function getPointsByCategoria(req) {

  switch (Number(req.params.categoriaId)) {
    case 1:
      return await Points.find({
          abecedarios: {
            $gt: []
          }
        })
        .sort({
          createAt: -1
        });

    case 2:
      return await Points.find({
          audios: {
            $gt: []
          }
        })
        .sort({
          createAt: -1
        });

    case 3:
      return await Points.find({
          entrevistas: {
            $gt: []
          }
        })
        .sort({
          createAt: -1
        });

    case 4:
      return await Points.find({
          producaoAcademica: {
            $gt: []
          }
        })
        .sort({
          createAt: -1
        });

    default:
      break;
  }
}

async function getAbecedarioPoint(req) {
  return await Abecedario.find({
      pointId: req.params.pointId
    })
    .sort({
      createAt: -1
    });
}

async function getAudioPoint(req) {
  return await Audio.find({
      pointId: req.params.pointId
    })
    .sort({
      createAt: -1
    });
}

async function getEntrevistaPoint(req) {
  return await Entrevista.find({
      pointId: req.params.pointId
    })
    .sort({
      createAt: -1
    });
}

async function getProducaoAcademicaPoint(req) {
  return await ProducaoAcademica.find({
      pointId: req.params.pointId
    })
    .sort({
      createAt: -1
    });
}
