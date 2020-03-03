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

  let pointFound = await PointsCtrl.getPointsByCoordinator(req.body.lat, req.body.lng);
  console.log(req.body.lat, req.body.lng)
  if (!pointFound._id) {

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
  let galeria = JSON.parse(req.body.galeria);
  let galleryInsert = await saveUploadGaleria(galeria);

  return galleryInsert;
}

async function deletar(req) {
  let galleryInsert = Gallery.findOne({
    '_id': galeria.id
  }).exec(function (err, book) {
    book.galeria.push(galeria.galeria);
    book.save(function (err) {
      console.log('galeria.galeria' + err);
    });
  });
  return galleryInsert;
}
