// Importa o módulo Express, que ajuda a criar um servidor web facilmente
import express from "express";
import multer from "multer";
// Importa as funções listarPosts e postarNovoPost do controlador de posts
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage});

// Define uma função que configura as rotas para o aplicativo Express
const routes = (app) => {
    // Configura o servidor para entender dados no formato JSON nas requisições
    app.use(express.json());
    app.use(cors(corsOptions));
    // Configura uma rota GET para "/posts" que chama a função listarPosts
    // listarPosts é responsável por retornar todos os posts do banco de dados
    app.get("/posts", listarPosts);

    // Configura uma rota POST para "/posts" que chama a função postarNovoPost
    // postarNovoPost é responsável por criar um novo post no banco de dados
    app.post("/posts", postarNovoPost);
    app.post("/upload", upload.single("imagem"), uploadImagem);
    app.put("/upload/:id", atualizarNovoPost)
};

// Exporta a configuração das rotas para ser utilizada em outros arquivos
export default routes;
