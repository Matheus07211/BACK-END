const UsuarioModel = require('../MODELO/Usuario'); 

class UsuarioController {
    // Obter todos os usuários
    async Obter(req, res) {
        try {
            const usuarios = await UsuarioModel.ObterTodos();
            return res.status(200).json(usuarios);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao obter usuários", error: error.message });
        }
    }

    // Inserir um novo usuário
    async Inserir(req, res) {
        try {
            const usuario = new UsuarioModel(req.body);
            const usuarioInserido = await UsuarioModel.criar(usuario);
            return res.status(200).json({
                message: "Usuário inserido com sucesso", 
                usuario: usuarioInserido
            });
        } catch (error) {
            return res.status(500).json({ message: "Erro ao inserir usuário", error: error.message });
        }
    }

    // Excluir um usuário
    async Excluir(req, res) {
        try {
            const { id } = req.params;
            const excluido = await UsuarioModel.excluir(id);
            if (excluido) {
                return res.status(200).json({ message: "Usuário excluído com sucesso" });
            } else {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Erro ao excluir usuário", error: error.message });
        }
    }

    // Autenticar um usuário
    async Autenticar(req, res) {
        try {
            const { email, senha } = req.body;
            const usuarios = await UsuarioModel.Autenticar(email, senha);
            
            if (usuarios.length > 0) {
                return res.status(200).json({
                    message: "Autenticação bem-sucedida",
                    usuario: usuarios[0]
                });
            } else {
                return res.status(401).json({ message: "Email ou senha inválidos" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Erro ao autenticar usuário", error: error.message });
        }
    }
}

module.exports = UsuarioController;
