const Database = require("./database");
const db = new Database();

class VagaModel {
    constructor({ id_vaga = null, titulo = '', descricao = '', requisitos = '', localizacao = '', salario = '' } = {}) {
        this.id_vaga = id_vaga;
        this.titulo = titulo;
        this.descricao = descricao;
        this.requisitos = requisitos;
        this.localizacao = localizacao;
        this.salario = salario;
    }

    // Inserir uma nova vaga
    static async criar(vaga) {
        const sql = 'INSERT INTO vagas (titulo, descricao, requisitos, localizacao, salario) VALUES (?, ?, ?, ?, ?)';
        const params = [vaga.titulo, vaga.descricao, vaga.requisitos, vaga.localizacao, vaga.salario];
        const result = await db.executaComandoNonQuery(sql, params);
        return result.insertId ? new VagaModel({ ...vaga, id_vaga: result.insertId }) : null;
    }

    // Consultar todas as vagas
    static async ObterTodas() {
        const sql = 'SELECT * FROM vagas';
        const results = await db.executaComando(sql);
        return results.map(row => new VagaModel(row));
    }

    // Excluir uma vaga por ID
    static async excluir(id_vaga) {
        const sql = 'DELETE FROM vagas WHERE id_vaga = ?';
        const params = [id_vaga];
        const result = await db.executaComandoNonQuery(sql, params);
        return result.affectedRows > 0;
    }
}

module.exports = VagaModel;
