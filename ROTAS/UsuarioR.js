const express = require('express');
const UsuarioController = require('../CONTROLADORA/UsuarioC'); 
const router = express.Router();

const usuarioController = new UsuarioController();

// Rota para obter todos os usuários
router.get('/', (req, res) => usuarioController.Obter(req, res));

// Rota para inserir um novo usuário
router.post('/', (req, res) => usuarioController.Inserir(req, res));
router.post('/autenticar', (req, res) => usuarioController.Autenticar(req, res));

// Rota para excluir um usuário pelo ID
router.delete('/:id', (req, res) => usuarioController.Excluir(req, res));

module.exports = router;
