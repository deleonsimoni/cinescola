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

router.use(passport.authenticate('jwt', { session: false }))

router.post('/abecedario', asyncHandler(incluirAbecedario));
router.delete('/abecedario/:abecedarioId', asyncHandler(deletarAbecedario));
router.put('/abecedario/:abecedarioId', asyncHandler(alterarAbecedario));

router.post('/audio', asyncHandler(incluirAudio));
router.delete('/audio/:audioId', asyncHandler(deletarAudio));
router.put('/audio/:audioId', asyncHandler(alterarAudio));

router.post('/entrevista', asyncHandler(incluirEntrevista));
router.delete('/entrevista/:entrevistaId', asyncHandler(deletarEntrevista));
router.put('/entrevista/:entrevistaId', asyncHandler(alterarEntrevista));

router.post('/producaoAcademica', asyncHandler(incluirProducaoAcademica));
router.delete('/producaoAcademica/:producaoAcademicaId', asyncHandler(deletarProducaoAcademica));
router.put('/producaoAcademica/:producaoAcademicaId', asyncHandler(alterarProducaoAcademica));

router.get('/:categoriaId', asyncHandler(getPointsByCategoria));

async function getPointsByCategoria(req, res) {
  let user = await pointsCtrl.getPointsByCategoria(req);
  res.json(user);
}

async function incluirAbecedario(req, res) {
  let user = await abecedarioCtrl.insert(req);
  res.json(user);
}

async function deletarAbecedario(req, res) {
  let user = await abecedarioCtrl.delete(req.body);
  res.json(user);
}

async function alterarAbecedario(req, res) {
  let user = await abecedarioCtrl.update(req);
  res.json(user);
}

async function incluirAudio(req, res) {
  let user = await audioCtrl.insert(req);
  res.json(user);
}

async function deletarAudio(req, res) {
  let user = await audioCtrl.delete(req);
  res.json(user);
}

async function alterarAudio(req, res) {
  let user = await audioCtrl.update(req);
  res.json(user);
}

async function incluirEntrevista(req, res) {
  let user = await entrevistaCtrl.insert(req);
  res.json(user);
}

async function deletarEntrevista(req, res) {
  let user = await entrevistaCtrl.delete(req);
  res.json(user);
}

async function alterarEntrevista(req, res) {
  let user = await entrevistaCtrl.update(req);
  res.json(user);
}

async function incluirProducaoAcademica(req, res) {
  let user = await producaoAcademicaCtrl.insert(req);
  res.json(user);
}

async function deletarProducaoAcademica(req, res) {
  let user = await producaoAcademicaCtrl.delete(req);
  res.json(user);
}

async function alterarProducaoAcademica(req, res) {
  let user = await producaoAcademicaCtrl.update(req);
  res.json(user);
}