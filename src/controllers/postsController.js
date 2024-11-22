import {getTodosPosts, criarPost, atualizarPost} from "../models/postsModel.js";
import fs from "fs";
import  gerarDescricaoComGemini from "../services/geminiService.js"

export async function listarPosts(req, res) {
    // Chama a função que busca os posts do banco de dados
    const posts = await getTodosPosts();
    // Retorna os posts encontrados em formato JSON com o status HTTP 200 (sucesso)
    res.status(200).json(posts);
}

// Função que lida com a criação de um novo post
export async function postarNovoPost(req, res) {
    // Obtém os dados do novo post enviados no corpo da requisição (req.body)
    const novoPost = req.body;

    try {
        // Chama a função criarPost para salvar o novo post no banco de dados
        const postCriado = await criarPost(novoPost);
        
        // Retorna o post criado como resposta em formato JSON, com o status HTTP 200 (sucesso)
        res.status(200).json(postCriado);
    } catch (erro) {
        // Em caso de erro, exibe a mensagem de erro no console para fins de depuração
        console.error(erro.message);

        // Retorna uma mensagem de erro em formato JSON com o status HTTP 500 (erro no servidor)
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}

// Função que lida com a criação de um novo post
export async function uploadImagem(req, res) {
    // Obtém os dados do novo post enviados no corpo da requisição (req.body)
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        // Chama a função criarPost para salvar o novo post no banco de dados
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, imagemAtualizada);
        // Retorna o post criado como resposta em formato JSON, com o status HTTP 200 (sucesso)
        res.status(200).json(postCriado);
    } catch (erro) {
        // Em caso de erro, exibe a mensagem de erro no console para fins de depuração
        console.error(erro.message);

        // Retorna uma mensagem de erro em formato JSON com o status HTTP 500 (erro no servidor)
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}

export async function atualizarNovoPost(req, res) {
    // Obtém os dados do novo post enviados no corpo da requisição (req.body)
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;
     try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imgBuffer)

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }     

        // Chama a função criarPost para salvar o novo post no banco de dados
        const postCriado = await atualizarPost(id, post);            

        // Retorna o post criado como resposta em formato JSON, com o status HTTP 200 (sucesso)
        res.status(200).json(postCriado);
    } catch (erro) {
        // Em caso de erro, exibe a mensagem de erro no console para fins de depuração
        console.error(erro.message);

        // Retorna uma mensagem de erro em formato JSON com o status HTTP 500 (erro no servidor)
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}