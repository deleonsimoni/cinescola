const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');

const likesCtrl = require('../controllers/like.controller');

const router = express.Router();
module.exports = router;


router.post('/like/:categoriaId/:contentId/', passport.authenticate('jwt', {
  session: false
}), asyncHandler(upLike));
router.post('/unlike/:categoriaId/:contentId/', passport.authenticate('jwt', {
  session: false
}), asyncHandler(unLike));


async function upLike(req, res) {
  let user = await likesCtrl.upLike(req);
  res.json(user);
}

async function unLike(req, res) {
  let user = await likesCtrl.unLike(req);
  res.json(user);
}