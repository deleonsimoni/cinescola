
const Abecedario = require('../models/abecedario.model');


module.exports = {
  insert,
  update,
  deletar
}

async function insert(req) {
  delete user.password;
  return await new User(user).save();
}

async function update(req) {
  let galeria = JSON.parse(req.body.galeria);
  let galleryInsert = await saveUploadGaleria(galeria);

  return galleryInsert;
}

async function deletar(req) {
  let galleryInsert = Gallery.findOne({ '_id': galeria.id }).exec(function (err, book) {
    book.galeria.push(galeria.galeria);
    book.save(function (err) {
      console.log('galeria.galeria' + err);
    });
  });
  return galleryInsert;
}
