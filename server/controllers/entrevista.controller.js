const Entrevista = require('../models/entrevista.model');
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
    message: `Entrevista criada com sucesso.`
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

  let entrevista = await new Entrevista(req.body.content).save();

  response.point = await Points.findByIdAndUpdate(pointFound._id, {
    $push: {
      entrevistas: entrevista._id
    },
    ultimaCategoria: 1
  })

  return response;
}

async function update(req) {
  return await Entrevista.findByIdAndUpdate(req.body.content._id, req.body.content);
}

async function deletar(req) {
  return await Entrevista.findOneAndRemove({
    _id: req.params.contentId
  }, async function (err, doc) {
    if (err) {
      console.log("Erro ao deletar a Entrevista: " + req.params.contentId, err);
    } else {
      console.log("Entrevista deletada com sucesso: " + req.params.contentId);
      await Points.updateOne( {_id: req.params.pointId}, { $pull: { entrevistas: req.params.contentId } } )

    }
  });
}
