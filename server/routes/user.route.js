const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user.controller');
const fileUpload = require('express-fileupload');
const visitController = require('../controllers/visit.controller')

const router = express.Router();
module.exports = router;

//router.use(passport.authenticate('jwt', { session: false }))

router.post('/upload', [fileUpload()], asyncHandler(upload));
router.post('/upload-galeria', [fileUpload()], asyncHandler(uploadGaleria));
router.get('/downloadFile', downloadFile);
router.get('/getGallerys', getGallerys);
router.get('/viewsUp', viewsUp);
router.delete('/deleteDepoimento/:depoimentoId', deleteDepoimento);

router.route('/')
  .post(asyncHandler(insert));


      
async function viewsUp(req, res) {
  //contaiblizando os views do site
  let retorno = await visitController.viewsUp();
  res.json(retorno);
}

async function insert(req, res) {
  let user = await userCtrl.insert(req.body);
  res.json(user);
}

async function upload(req, res) {
  console.log('vamos subir');
  let response = await userCtrl.upload(req);
  res.json(response);
}

async function uploadGaleria(req, res) {
  let response = await userCtrl.uploadGaleria(req);
  res.json(response);
}

async function downloadFile(req, res) {
  let response = await userCtrl.downloadFileS3(req.query.fileName);
  res.json(response);
}

async function getGallerys(req, res) {
  let response = await userCtrl.getGallery(req);
  res.json(response);
}

async function deleteDepoimento(req, res) {
  let response = await userCtrl.deleteDepoimento(req.params.depoimentoId);
  res.json(response);
}