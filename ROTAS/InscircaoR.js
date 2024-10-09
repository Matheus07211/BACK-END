const express = require('express');
const InscricaoController = require('../CONTROLADORA/InscricaoC');
const router = express.Router();

const inscricaoController = new InscricaoController();

router.get('/', (req, res) => inscricaoController.Obter(req, res));

router.post('/', (req, res) => inscricaoController.Inserir(req, res));

router.delete('/:id', (req, res) => inscricaoController.Excluir(req, res));

router.get('/usuario/:id_usuario', (req, res) => inscricaoController.ObterVagasInscritasPorUsuario(req, res));

router.get('/vaga/:id_vaga', (req, res) => inscricaoController.ObterUsuariosInscritosNaVaga(req, res));

router.get('/candidatos', (req, res) => inscricaoController.BuscarCandidatosPorNome(req, res));

module.exports = router;
