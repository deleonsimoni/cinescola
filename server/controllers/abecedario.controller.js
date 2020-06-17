const Abecedario = require('../models/abecedario.model');
const Points = require('../models/points.model');
const PointsCtrl = require('./point.controller');


module.exports = {
  insert,
  update,
  deletar,
  aceitar
}

async function insert(req) {

  let response = {
    status: 200,
    temErro: false,
    message: `Abecedário criado com sucesso.`
  };
  req.body.userId = req.user._id;
  
  let pointFound;
  
  if(req.body.lat){
    pointFound = await PointsCtrl.getPointsByCoordinator(req.body.lat, req.body.lng);
  } else {
    pointFound = await PointsCtrl.getPointsByCoordinator(req.body.location.coordinates[1], req.body.location.coordinates[0]);
  }

  if (!pointFound) {
    pointFound = await PointsCtrl.create(req.body);
  }
  req.body.content.userId = req.user._id;
  req.body.content.pointId = pointFound._id;

  let abecedario = await new Abecedario(req.body.content).save();

  response.point = await Points.findByIdAndUpdate(pointFound._id, {
    $push: {
      abecedarios: abecedario._id
    },
    ultimaCategoria: 1
  })

  return response;
}

async function update(req) {
  return await Abecedario.findByIdAndUpdate(req.body.content._id, req.body.content);
}

async function aceitar(req) {
  return await Abecedario.findByIdAndUpdate(req.params.contentId, {icAprovado: req.body.icAprovado});
}


async function deletar(req) {
  return await Abecedario.findOneAndRemove({
    _id: req.params.contentId
  }, function (err, doc) {
    if (err) {
      console.log("erro ao deletar o Abecedario: " + req.params.contentId, err);
    } else {
      console.log("Abecedario deletado com sucesso: " + req.params.contentId);
    }
  });
}
