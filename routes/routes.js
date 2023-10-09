//modulos
const express = require('express');
const router = express.Router();

//Controllers
const musicamissaController = require('../controllers/musicamissaController');

//requisições HTTP
router.get("/", (req, res) => {
  return res.json({ message: "Sistema de Musicas" });
});

//http musica
//post - cadastrar musica
router.post("/cadastrar", musicamissaController.MusicaCreate);

//GET - Listar
router.get("/musica", musicamissaController.mostrarMusicasComPalavraChave);

//Delete
router.delete("/musica/:id", musicamissaController.MusicaDelete);

module.exports = router;
