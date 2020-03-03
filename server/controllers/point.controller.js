const Points = require('../models/points.model');


module.exports = {
  getPointsByCategoria,
  getPointsByCoordinator,
  create,

}

async function create(point) {
  return await new Points(point).save();
}

async function getPointsByCoordinator(lat, lng) {
  return await Points.find({
      'lat': lat,
      'lng': lng
    })
    .sort({
      createAt: -1
    });
}

async function getPointsByCategoria(req) {
  return await Points.find({
      'categorias.identificador': req.params.categoriaId
    })
    .sort({
      createAt: -1
    });
}
