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

/*router.use(passport.authenticate('jwt', {
  session: false
}))*/

router.get('/:categoriaId', asyncHandler(getPointsByCategoria));
router.get('/:categoriaId/:pointId', asyncHandler(getContentOfPoint));

router.post('/:categoriaId', passport.authenticate('jwt', {
  session: false
}), asyncHandler(incluirContentByCategoria));

router.delete('/:categoriaId/:contentId', passport.authenticate('jwt', {
  session: false
}), asyncHandler(deleteContentByCategoria));

router.put('/:categoriaId', passport.authenticate('jwt', {
  session: false
}), asyncHandler(updateContentByCategoria));

router.get('/abecedario/:pointId', passport.authenticate('jwt', {
  session: false
}), asyncHandler(getAbecedarioPoint));
router.get('/audio/:pointId', passport.authenticate('jwt', {
  session: false
}), asyncHandler(getAudioPoint));
router.get('/entrevista/:pointId', passport.authenticate('jwt', {
  session: false
}), asyncHandler(getEntrevistaPoint));
router.get('/producaoAcademica/:pointId', passport.authenticate('jwt', {
  session: false
}), asyncHandler(getProducaoAcademicaPoint));

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
  let content;

  if (req.user.icAdmin) {
    req.body.content.icAprovado = true;
  }
  switch (Number(req.params.categoriaId)) {
    case 1:
      content = await abecedarioCtrl.insert(req);
      res.json(content);
      break;
    case 2:
      content = await entrevistaCtrl.insert(req);
      res.json(content);
      break;

    case 3:
      content = await audioCtrl.insert(req);
      res.json(content);
      break;

    case 4:
      content = await producaoAcademicaCtrl.insert(req);
      res.json(content);
      break;

    default:
      break;
  }
}

async function deleteContentByCategoria(req, res) {
  let user;
  switch (Number(req.params.categoriaId)) {
    case 1:
      user = await abecedarioCtrl.deletar(req);
      res.json(user);
    case 2:
      user = await entrevistaCtrl.delete(req);
      res.json(user);
    case 3:
      user = await audioCtrl.delete(req);
      res.json(user);
    case 4:
      user = await producaoAcademicaCtrl.delete(req);
      res.json(user);
    default:
      break;
  }
}

async function updateContentByCategoria(req, res) {
  let user;
  switch (Number(req.params.categoriaId)) {
    case 1:
      user = await abecedarioCtrl.update(req);
      res.json(user);
    case 2:
      user = await entrevistaCtrl.update(req);
      res.json(user);
    case 3:
      user = await audioCtrl.update(req);
      res.json(user);
    case 4:
      user = await producaoAcademicaCtrl.update(req);
      res.json(user);
    default:
      break;
  }
}
