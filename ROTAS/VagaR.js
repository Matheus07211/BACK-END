const express = require('express');
const VagaController = require('../CONTROLADORA/VagaC'); // Certifique-se de que o caminho está correto
const router = express.Router();

const vagaController = new VagaController();

// Rota para obter todas as vagas
router.get('/', (req, res) => vagaController.Obter(req, res));

// Rota para inserir uma nova vaga
router.post('/', (req, res) => vagaController.Inserir(req, res));

// Rota para excluir uma vaga pelo ID
router.delete('/:id', (req, res) => vagaController.Excluir(req, res));

module.exports = router;
