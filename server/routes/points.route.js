const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const abecedarioCtrl = require('../controllers/abecedario.controller');
const audioCtrl = require('../controllers/audio.controller');
const entrevistaCtrl = require('../controllers/entrevista.controller');
const producaoAcademicaCtrl = require('../controllers/producaoAcademica.controller');
const pointsCtrl = require('../controllers/point.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', {
  session: false
}))

router.get('/:categoriaId', asyncHandler(getPointsByCategoria));
router.get('/:categoriaId/:pointId', asyncHandler(getContentOfPoint));

router.post('/:categoriaId', asyncHandler(incluirContentByCategoria));

router.delete('/:categoriaId', asyncHandler(deleteContentByCategoria));

router.put('/:categoriaId', asyncHandler(updateContentByCategoria));

router.get('/abecedario/:pointId', asyncHandler(getAbecedarioPoint));
router.get('/audio/:pointId', asyncHandler(getAudioPoint));
router.get('/entrevista/:pointId', asyncHandler(getEntrevistaPoint));
router.get('/producaoAcademica/:pointId', asyncHandler(getProducaoAcademicaPoint));

async function getContentOfPoint(req, res) {
  let user = await pointsCtrl.getContentOfPoint(req);
  res.json(user);
}

async function getAbecedarioPoint(req, res) {
  let user = await pointsCtrl.getAbecedarioPoint(req);
  res.json(user);
}

async function getAudioPoint(req, res) {
  let user = await pointsCtrl.getAudioPoint(req);
  res.json(user);
}

async function getEntrevistaPoint(req, res) {
  let user = await pointsCtrl.getEntrevistaPoint(req);
  res.json(user);
}

async function getProducaoAcademicaPoint(req, res) {
  let user = await pointsCtrl.getProducaoAcademicaPoint(req);
  res.json(user);
}

async function getPointsByCategoria(req, res) {
  let user = await pointsCtrl.getPointsByCategoria(req);
  res.json(user);
}

async function incluirContentByCategoria(req, res) {
  console.log('aaa' + req.params.categoriaId)
  let content;
  switch (Number(req.params.categoriaId)) {
    case 1:
      content = await abecedarioCtrl.insert(req);
      res.json(content);
    case 2:
      content = await audioCtrl.insert(req);
      res.json(content);
    case 3:
      content = await entrevistaCtrl.insert(req);
      res.json(content);
    case 4:
      content = await producaoAcademicaCtrl.insert(req);
      res.json(content);
    default:
      break;
  }
}

async function deleteContentByCategoria(req, res) {
  switch (Number(req.params.categoriaId)) {
    case 1:
      let user = await abecedarioCtrl.delete(req.body);
      res.json(user);
    case 2:
      let user = await audioCtrl.delete(req);
      res.json(user);
    case 3:
      let user = await entrevistaCtrl.delete(req);
      res.json(user);
    case 4:
      let user = await producaoAcademicaCtrl.delete(req);
      res.json(user);
    default:
      break;
  }
}

async function updateContentByCategoria(req, res) {
  switch (Number(req.params.categoriaId)) {
    case 1:
      let user = await abecedarioCtrl.update(req);
      res.json(user);
    case 2:
      let user = await audioCtrl.update(req);
      res.json(user);
    case 3:
      let user = await entrevistaCtrl.update(req);
      res.json(user);
    case 4:
      let user = await producaoAcademicaCtrl.update(req);
      res.json(user);
    default:
      break;
  }
}
