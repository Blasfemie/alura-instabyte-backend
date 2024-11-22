// Importa a função para conectar ao banco de dados
import 'dotenv/config';
import conectarAoBanco from "../config/dbConfig.js";
import { ObjectId } from "mongodb";

// Conecta ao banco de dados usando uma string de conexão fornecida por uma variável de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função que acessa o banco de dados e retorna todos os posts da coleção "posts"
export async function getTodosPosts() {
    // Seleciona o banco de dados "imersao-instabytes"
    const db = conexao.db("imersao-instabytes");
    // Seleciona a coleção "posts" dentro do banco
    const colecao = db.collection("posts");
    // Busca todos os documentos (posts) na coleção e os retorna como um array
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost)
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost})
}