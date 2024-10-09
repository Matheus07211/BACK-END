const Database = require("./database");
const db = new Database();

class UsuarioModel {
    constructor({ id_usuario = null, nome = '', email = '', senha = '', telefone = '', endereco = '', data_nascimento = '', experiencia_profissional = '', escolaridade = '', curriculo = '' } = {}) {
        this.id_usuario = id_usuario;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
        this.endereco = endereco;
        this.data_nascimento = data_nascimento;
        this.experiencia_profissional = experiencia_profissional;
        this.escolaridade = escolaridade;
        this.curriculo = curriculo;
    }

    static async criar(usuario) {
        const sql = 'INSERT INTO usuarios (nome, email, senha, telefone, endereco, data_nascimento, experiencia_profissional, escolaridade, curriculo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const params = [usuario.nome, usuario.email, usuario.senha, usuario.telefone, usuario.endereco, usuario.data_nascimento, usuario.experiencia_profissional, usuario.escolaridade, usuario.curriculo];
        const result = await db.executaComandoNonQuery(sql, params);
        return result.insertId ? new UsuarioModel({ ...usuario, id_usuario: result.insertId }) : null;
    }

    // Consultar todos os usuários
    static async ObterTodos() {
        const sql = 'SELECT * FROM usuarios';
        const results = await db.executaComando(sql);
        return results.map(row => new UsuarioModel(row));
    }

    static async Autenticar(email,senha) {
        const sql = 'SELECT * FROM usuarios where email = ? and senha = ?';
        const params = [email,senha]
        const results = await db.executaComando(sql,params);
        return results.map(row => new UsuarioModel(row));
    }

    static async excluir(id_usuario) {
        const sql = 'DELETE FROM usuarios WHERE id_usuario = ?';
        const params = [id_usuario];
        const result = await db.executaComandoNonQuery(sql, params);
        return result.affectedRows > 0;
    }
}

module.exports = UsuarioModel;
