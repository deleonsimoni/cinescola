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
  getAbecedarioPointAdmin,
  getAudioPointAdmin,
  getEntrevistaPointAdmin,
  getProducaoAcademicaPointAdmin,
  getEscolaPointAdmin,
  getPoliticaPointAdmin,
  getCursoPointAdmin,
  getCineclubPointAdmin,
  getContentOfPoint,
  create,
  getPointsByCategoriaAdmin,
  changePointName,
  getNews,

}

async function create(point) {
  point.location = {
    coordinates: [point.lng, point.lat]
  }
  return await new Points(point).save();
}


async function changePointName(id, nome) {
  return await Points.findByIdAndUpdate(id,{"nome": nome});
}

async function getPointsByCoordinator(lat, lng) {
  /*return await Points.findOne({
    'location.coordinates': {
      $near: {
        //$maxDistance: 1,
        //$minDistance: 0.001,
        $geometry: {
          type: "Point",
          coordinates: [lng, lat]
        }
      }
    }
  });*/
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

async function getNews(req) {
  let retorno = [];
  let result;
  let random;
  let randomUsed = [];
  for (let index = 0; index < 4; index++) {
    random = Math.floor(Math.random() * (8 - 1 + 1)) + 1;

    switch (Number(random)) {
      case 1:
        if(randomUsed.indexOf(random) == -1){
          result = await Abecedario.findOne({'icAprovado':true}).populate('pointId', 'nome').sort({'createdAt': -1}).select('nome pointId');
          randomUsed.push(random);
          if (result) retorno.push({id: result.pointId._id, category: 1, nome: result.nome, pointId: result.pointId.nome})
        } else {
          index -=1;
        }
      break;
      case 2:
        if(randomUsed.indexOf(random) == -1){
          result = await Entrevista.findOne({'icAprovado':true}).populate('pointId', 'nome').sort({'createdAt': -1}).select('verbete pointId.nome');
          randomUsed.push(random);
          if (result) retorno.push({id: result.pointId._id, category: 2, nome: result.verbete, pointId: result.pointId.nome})
        } else {
          index -=1;
        }
      break;
      case 3:
      /*result = await Audio.find({'icAprovado':true}).sort({'createdAt': -1}).limit(4).select('descricao pointId');
      if (result) retorno.push({category: 3, nome: result.descricao, pointId: result.pointId})
      LIBERAR QUANDO TIVER INFO NO BANCO
      */
      index -=1;
      break;
      case 4:
        if(randomUsed.indexOf(random) == -1){
          result = await ProducaoAcademica.findOne({'icAprovado':true}).populate('pointId', 'nome').sort({'createdAt': -1}).select('titulo pointId');
          randomUsed.push(random);
          if (result) retorno.push({id: result.pointId._id, category: 4, nome: result.titulo, pointId: result.pointId.nome})
        } else {
          index -=1;
        }
      break;
      case 5:
        if(randomUsed.indexOf(random) == -1){
          result = await Politica.findOne({'icAprovado':true}).populate('pointId', 'nome').sort({'createdAt': -1}).select('nome pointId');
          randomUsed.push(random);
          if (result) retorno.push({id: result.pointId._id, category: 5, nome: result.nome, pointId: result.pointId.nome})
        } else {
          index -=1;
        }
      break;
      case 6:
        if(randomUsed.indexOf(random) == -1){
          result = await Escola.findOne({'icAprovado':true}).populate('pointId', 'nome').sort({'createdAt': -1}).select('nome pointId');
          randomUsed.push(random);
          if (result) retorno.push({id: result.pointId._id, category: 6, nome: result.nome, pointId: result.pointId.nome})
        } else {
          index -=1;
        }
      break;
      case 7:
      /*result = await Curso.find({'icAprovado':true}).sort({'createdAt': -1}).limit(4).select('nome pointId');
      if (result) retorno.push({category: 7, nome: result.nome, pointId: result.pointId})*/
      index -=1;
      break;
      case 8:
      /*result = await Cineclub.find({'icAprovado':true}).sort({'createdAt': -1}).limit(4).select('nome pointId');
      if (result) retorno.push({category: 8, nome: result.nome, pointId: result.pointId})*/
      index -=1;
      break;

    }
  }
  //console.log(retorno)
  return await retorno;
}


async function getPointsByCategoria(req) {
  switch (Number(req.params.categoriaId)) {
    case 1:
      
      return await Points.find({
         /*   'location.coordinates': {
          $near: {
            //$maxDistance: 1,
            //$minDistance: 0.001,
            $geometry: {
              type: "Point",
              coordinates: [lng, lat]
            }
          }
        }*/
        
        abecedarios: {
          $gt: []
        }
      })
        .sort({
          createAt: 1
        });

    case 2:
      return await Points.find({
        entrevistas: {
          $gt: []
        }
      })
        .sort({
          createAt: 1
        });

    case 3:
      return await Points.find({
        audios: {
          $gt: []
        }
      })
        .sort({
          createAt: 1
        });

    case 4:
      return await Points.find({
        producaoAcademica: {
          $gt: []
        }
      })
        .sort({
          createAt: 1
        });

    case 5:
      return await Points.find({
        politica: {
          $gt: []
        }
      })
        .sort({
          createAt: 1
        });

    case 6:
      return await Points.find({
        escola: {
          $gt: []
        }
      })
        .sort({
          createAt: 1
        });

    case 7:
      return await Points.find({
        curso: {
          $gt: []
        }
      })
        .sort({
          createAt: 1
        });

    case 8:
      return await Points.find({
        cineclub: {
          $gt: []
        }
      })
        .sort({
          createAt: 1
        });

    default:
      break;
  }
}


async function getPointsByCategoriaAdmin(req) {
  switch (Number(req.params.categoriaId)) {
    case 1:
      return await Points.find({
        abecedarios: {
          $gt: []
        }
      })
        .sort({
          createAt: 1
        });

    case 2:
      return await Points.find({
        entrevistas: {
          $gt: []
        }
      })
        .sort({
          createAt: 1
        });

    case 3:
      return await Points.find({
        audios: {
          $gt: []
        }
      })
        .sort({
          createAt: 1
        });

    case 4:
      return await Points.find({
        producaoAcademica: {
          $gt: []
        }
      })
        .sort({
          createAt: 1
        });

    case 5:
      return await Points.find({
        politica: {
          $gt: []
        }
      })
        .sort({
          createAt: 1
        });

    case 6:
      return await Points.find({
        escola: {
          $gt: []
        }
      })
        .sort({
          createAt: 1
        });

    case 7:
      return await Points.find({
        curso: {
          $gt: []
        }
      })
        .sort({
          createAt: 1
        });

    case 8:
      return await Points.find({
        cineclub: {
          $gt: []
        }
      })
        .sort({
          createAt: 1
        });

    default:
      break;
  }
}

async function getAbecedarioPoint(req) {
  return await Abecedario.find({
    pointId: req.params.pointId,
    icAprovado: true
  })
    .sort({
      createAt: 1
    });
}

async function getAbecedarioPointAdmin(req) {
  return await Abecedario.find({
    pointId: req.params.pointId
  })
    .sort({
      createAt: 1
    });
}

async function getAudioPoint(req) {
  return await Audio.find({
    pointId: req.params.pointId,
    icAprovado: true
  })
    .sort({
      createAt: 1
    });
}


async function getAudioPointAdmin(req) {
  return await Audio.find({
    pointId: req.params.pointId
  })
    .sort({
      createAt: 1
    });
}

async function getEntrevistaPoint(req) {
  return await Entrevista.find({
    pointId: req.params.pointId,
    icAprovado: true
  })
    .sort({
      createAt: 1
    });
}

async function getEntrevistaPointAdmin(req) {
  return await Entrevista.find({
    pointId: req.params.pointId
  })
    .sort({
      createAt: 1
    });
}

async function getProducaoAcademicaPoint(req) {
  return await ProducaoAcademica.find({
    pointId: req.params.pointId,
    icAprovado: true
  })
    .sort({
      createAt: 1
    });
}

async function getProducaoAcademicaPointAdmin(req) {
  return await ProducaoAcademica.find({
    pointId: req.params.pointId
  })
    .sort({
      createAt: 1
    });
}

async function getPoliticaPoint(req) {
  return await Politica.find({
    pointId: req.params.pointId,
    icAprovado: true
  })
    .sort({
      createAt: 1
    });
}

async function getPoliticaPointAdmin(req) {
  return await Politica.find({
    pointId: req.params.pointId
  })
    .sort({
      createAt: 1
    });
}


async function getEscolaPoint(req) {
  return await Escola.find({
    pointId: req.params.pointId,
    icAprovado: true
  })
    .sort({
      createAt: 1
    });
}

async function getEscolaPointAdmin(req) {
  return await Escola.find({
    pointId: req.params.pointId
  })
    .sort({
      createAt: 1
    });
}


async function getCursoPoint(req) {
  return await Curso.find({
    pointId: req.params.pointId,
    icAprovado: true
  })
    .sort({
      createAt: 1
    });
}

async function getCursoPointAdmin(req) {
  return await Curso.find({
    pointId: req.params.pointId
  })
    .sort({
      createAt: 1
    });
}


async function getCineclubPoint(req) {
  return await Cineclub.find({
    pointId: req.params.pointId,
    icAprovado: true
  })
    .sort({
      createAt: 1
    });
}

async function getCineclubPointAdmin(req) {
  return await Cineclub.find({
    pointId: req.params.pointId
  })
    .sort({
      createAt: 1
    });
}