const express = require('express');
const asyncHandler = require('express-async-handler')
const passport = require('passport');
const userCtrl = require('../controllers/user.controller');
const authCtrl = require('../controllers/auth.controller');
const config = require('../config/config');
const pointsCtrl = require('../controllers/point.controller');
const pointsUserCtrl = require('../controllers/point-user.controller');

const router = express.Router();
module.exports = router;

router.post('/register', asyncHandler(register), login);

router.post('/login', passport.authenticate('local', {
  session: false
}), login);

router.get('/me', passport.authenticate('jwt', {
  session: false
}), login);

router.get('/refresh', passport.authenticate('jwt', {
  session: false
}), refresh);

router.get('/:categoriaId', passport.authenticate('jwt', {
  session: false
}), asyncHandler(getPointsByCategoriaAdmin));

router.get('/abecedario/:pointId', passport.authenticate('jwt', {
  session: false
}), asyncHandler(getAbecedarioPointAdmin));

router.get('/audio/:pointId', passport.authenticate('jwt', {
  session: false
}), asyncHandler(getAudioPointAdmin));

router.get('/entrevista/:pointId', passport.authenticate('jwt', {
  session: false
}), asyncHandler(getEntrevistaPointAdmin));

router.get('/producaoAcademica/:pointId', passport.authenticate('jwt', {
  session: false
}), asyncHandler(getProducaoAcademicaPointAdmin));

router.get('/politica/:pointId', passport.authenticate('jwt', {
  session: false
}), asyncHandler(getPoliticaPointAdmin));

router.get('/escola/:pointId', passport.authenticate('jwt', {
  session: false
}), asyncHandler(getEscolaPointAdmin));

router.get('/curso/:pointId', passport.authenticate('jwt', {
  session: false
}), asyncHandler(getCursoPointAdmin));

router.get('/cineclub/:pointId', passport.authenticate('jwt', {
  session: false
}), asyncHandler(getCineclubPointAdmin));



async function refresh(req, res) {
  res.json({
    user: req.user
  });
}

async function register(req, res, next) {
  let user = await userCtrl.insert(req.body);
  user = user.toObject();
  delete user.hashedPassword;
  req.user = user;
  next()
}

function login(req, res) {
  let user = req.user;
  let token = authCtrl.generateToken(user);
  res.json({
    user,
    token
  });
}


async function getPointsByCategoriaAdmin(req, res) {

  let user;

  if(req.user.icAdmin) {
    user = await pointsCtrl.getPointsByCategoriaAdmin(req);
  } else {
    user = await pointsUserCtrl.getPointsByCategoria(req);
  }

  res.json(user);
}

async function getAbecedarioPointAdmin(req, res) {

  let user;

  if(req.user.icAdmin) {
    user = await pointsCtrl.getAbecedarioPointAdmin(req);
  } else {
    user = await pointsUserCtrl.getAbecedarioPoint(req);
  }

  res.json(user);
}

async function getAudioPointAdmin(req, res) {
  let user;

  if(req.user.icAdmin) {
    user = await pointsCtrl.getAudioPointAdmin(req);
  } else {
    user = await pointsUserCtrl.getAudioPoint(req);
  }

  res.json(user);
}

async function getEntrevistaPointAdmin(req, res) {

  let user;

  if(req.user.icAdmin) {
    user = await pointsCtrl.getEntrevistaPointAdmin(req);
  } else {
    user = await pointsUserCtrl.getEntrevistaPoint(req);
  }

  res.json(user);
}

async function getProducaoAcademicaPointAdmin(req, res) {

  let user;

  if(req.user.icAdmin) {
    user = await pointsCtrl.getProducaoAcademicaPointAdmin(req);
  } else {
    user = await pointsUserCtrl.getProducaoAcademicaPoint(req);
  }
  res.json(user);
}

async function getPoliticaPointAdmin(req, res) {
  let user;

  if(req.user.icAdmin) {
    user = await pointsCtrl.getPoliticaPointAdmin(req);
  } else {
    user = await pointsUserCtrl.getPoliticaPoint(req);
  }

  res.json(user);
}

async function getEscolaPointAdmin(req, res) {
  let user;
  if(req.user.icAdmin) {
    user = await pointsCtrl.getEscolaPointAdmin(req);
  } else {
    user = await pointsUserCtrl.getEscolaPoint(req);
  }
  res.json(user);
}

async function getCursoPointAdmin(req, res) {

  let user;
  if(req.user.icAdmin) {
    user = await pointsCtrl.getCursoPointAdmin(req);
  } else {
    user = await pointsUserCtrl.getCursoPoint(req);
  }

  res.json(user);
}

async function getCineclubPointAdmin(req, res) {

  let user;
  if(req.user.icAdmin) {
    user = await pointsCtrl.getcineclubPointAdmin(req);
  } else {
    user = await pointsUserCtrl.getcineclubPoint(req);
  }

  res.json(user);
}