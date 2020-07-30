const Abecedario = require('../models/abecedario.model');
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
    message: `Abecedário criado com sucesso.`
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

async function deletar(req) {
  return await Abecedario.findOneAndRemove({
    _id: req.params.contentId
  }, async function (err, doc) {
    if (err) {
      console.log("erro ao deletar o Abecedario: " + req.params.contentId, err);
    } else {
      console.log("Abecedario deletado com sucesso: " + req.params.contentId);
      await Points.updateOne( {_id: req.params.pointId}, { $pull: { abecedarios: req.params.contentId } }, function (err, doc) { 
        if (err) {
          console.log("erro ao deletar abecedario do ponto ", err);
        } else {
          console.log("abecedario do ponto deletado com sucesso", doc);
        }
      });
    }
  });
}
