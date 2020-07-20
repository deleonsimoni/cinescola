const Filme = require('../models/filme.model');
const Points = require('../models/points.model');
const PointsCtrl = require('./point.controller');

module.exports = {
  insert,
  update,
  deletar
}

async function insert(req) {

  let response = {
    status: 200,
    temErro: false,
    message: `Filme criado com sucesso.`
  };
  req.body.userId = req.user._id;

  let pointFound = {};

  if(req.body._id){
    pointFound._id = req.body._id;
  } else {
    pointFound = await PointsCtrl.getPointsByCoordinator(req.body.lat, req.body.lng);
    if (!pointFound) {
      pointFound = await PointsCtrl.create(req.body);
    }
  }

  req.body.content.userId = req.user._id;
  req.body.content.pointId = pointFound._id;

  let filme = await new Filme(req.body.content).save();

  response.point = await Points.findByIdAndUpdate(pointFound._id, {
    $push: {
      filmes: filme._id
    },
    ultimaCategoria: 1
  })

  return response;
}

async function update(req) {
  return await Filme.findByIdAndUpdate(req.body.content._id, req.body.content);
}

async function deletar(req) {
  return await Filme.findOneAndRemove({
    _id: req.params.contentId
  }, function (err, doc) {
    if (err) {
      console.log("Erro ao deletar o Filme: " + req.params.contentId, err);
    } else {
      console.log("Filme deletado com sucesso: " + req.params.contentId);
    }
  });
}
