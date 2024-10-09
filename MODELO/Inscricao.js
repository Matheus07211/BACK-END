const Database = require("./database");
const db = new Database();

class InscricaoModel {
    constructor({ id_inscricao = null, id_usuario = '', id_vaga = '', data_inscricao = '' } = {}) {
        this.id_inscricao = id_inscricao;
        this.id_usuario = id_usuario;
        this.id_vaga = id_vaga;
        this.data_inscricao = data_inscricao;
    }

    // Criar uma nova inscrição
    static async criar(inscricao) {
        const sql = 'INSERT INTO inscricoes (id_usuario, id_vaga, data_inscricao) VALUES (?, ?, ?)';
        const params = [inscricao.id_usuario, inscricao.id_vaga, inscricao.data_inscricao];
        const result = await db.executaComandoNonQuery(sql, params);
        return result.insertId ? new InscricaoModel({ ...inscricao, id_inscricao: result.insertId }) : null;
    }

    // Função para retornar todas as vagas em que o usuário está inscrito
    static async ObterVagasInscritasPorUsuario(id_usuario) {
        const sql = `
            SELECT v.id_vaga, v.titulo, v.descricao, v.requisitos, v.localizacao, v.salario 
            FROM inscricoes i
            INNER JOIN vagas v ON i.id_vaga = v.id_vaga
            WHERE i.id_usuario = ?
        `;
        const params = [id_usuario];
        const results = await db.executaComando(sql, params);
        return results;  // Retorna os dados da vaga como no ObterVagas
    }

    // Função para retornar todos os usuários inscritos em uma vaga específica
    static async ObterUsuariosInscritosNaVaga(id_vaga) {
        const sql = `
            SELECT u.id_usuario, u.nome, u.email, u.telefone, u.endereco, u.data_nascimento, u.experiencia_profissional, u.escolaridade,u.curriculo
            FROM inscricoes i
            INNER JOIN usuarios u ON i.id_usuario = u.id_usuario
            WHERE i.id_vaga = ?
        `;
        const params = [id_vaga];
        const results = await db.executaComando(sql, params);
        return results;  // Retorna os dados dos usuários inscritos
    }

    // Função para filtrar candidatos por nome
    static async BuscarCandidatosPorNome(nome) {
        const sql = `
            SELECT u.id_usuario, u.nome, u.email, u.telefone, u.endereco, u.data_nascimento 
            FROM usuarios u
            WHERE u.nome LIKE ?
        `;
        const params = [`%${nome}%`];
        const results = await db.executaComando(sql, params);
        return results;  // Retorna os candidatos que possuem o nome correspondente
    }
}

module.exports = InscricaoModel;
