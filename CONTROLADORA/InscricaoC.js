const InscricaoModel = require('../MODELO/Inscricao');

class InscricaoController {
    // Obter todas as inscrições
    async Obter(req, res) {
        try {
            const inscricoes = await InscricaoModel.ObterTodas();
            return res.status(200).json(inscricoes);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao obter inscrições", error: error.message });
        }
    }

    // Inserir uma nova inscrição
    async Inserir(req, res) {
        try {
            const inscricao = new InscricaoModel(req.body);
            const inscricaoInserida = await InscricaoModel.criar(inscricao);
            return res.status(200).json(inscricaoInserida);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao inserir inscrição", error: error.message });
        }
    }

    // Excluir uma inscrição
    async Excluir(req, res) {
        try {
            const { id } = req.params;
            const excluido = await InscricaoModel.excluir(id);
            if (excluido) {
                return res.status(200).json({ message: "Inscrição excluída com sucesso" });
            } else {
                return res.status(404).json({ message: "Inscrição não encontrada" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Erro ao excluir inscrição", error: error.message });
        }
    }

    // Obter todas as vagas inscritas por um usuário
    async ObterVagasInscritasPorUsuario(req, res) {
        try {
            const { id_usuario } = req.params;
            const vagas = await InscricaoModel.ObterVagasInscritasPorUsuario(id_usuario);
            return res.status(200).json(vagas);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao obter vagas inscritas pelo usuário", error: error.message });
        }
    }

    // Obter todos os usuários inscritos em uma vaga específica
    async ObterUsuariosInscritosNaVaga(req, res) {
        try {
            const { id_vaga } = req.params;
            const usuarios = await InscricaoModel.ObterUsuariosInscritosNaVaga(id_vaga);
            return res.status(200).json(usuarios);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao obter usuários inscritos na vaga", error: error.message });
        }
    }

    // Filtrar candidatos por nome
    async BuscarCandidatosPorNome(req, res) {
        try {
            const { nome } = req.body; // Usamos query params para busca
            const candidatos = await InscricaoModel.BuscarCandidatosPorNome(nome);
            return res.status(200).json(candidatos);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar candidatos por nome", error: error.message });
        }
    }
}

module.exports = InscricaoController;
