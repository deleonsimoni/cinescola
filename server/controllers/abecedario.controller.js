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

  console.log(req.body)

  let pointFound = await PointsCtrl.getPointsByCoordinator(req.body.lat, req.body.lng);
  console.log(!pointFound)
  if (!pointFound._id) {
    console.log('bb')
    pointFound = await PointsCtrl.create(req.body);
    console.log('b' + pointFound)
  }
  console.log("cc")
  req.body.abecedario.userId = req.user._id;
  req.body.abecedario.pointId = pointFound._id;

  let abecedario = await new Abecedario(req.body.abecedario).save();

  await Points.findByIdAndUpdate(pointFound._id, {
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
