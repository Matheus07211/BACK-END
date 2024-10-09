
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 4000;


const usuarioRotas = require('./ROTAS/UsuarioR');
const vagasRotas = require('./ROTAS/VagaR');
const UsuarioVagaRotas = require('./ROTAS/InscircaoR');

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/usuario', usuarioRotas);
app.use('/vagas', vagasRotas);
app.use('/inscricoes', UsuarioVagaRotas);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));