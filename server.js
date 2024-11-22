// Importa o módulo Express, que ajuda a criar um servidor web facilmente
import express from "express";
import routes from "./src/routes/postsRoutes.js";

// Cria uma lista estática de posts como exemplo
const posts = [
    { id: 1, descricao: "Uma foto teste", imagem: "https://placecats.com/millie/300/150" },
    { id: 2, descricao: "Uma foto yoga", imagem: "https://placecats.com/millie/300/150" },
    { id: 3, descricao: "Uma foto panqueca", imagem: "https://placecats.com/millie/300/150" }
];

// Cria o aplicativo Express
const app = express();
app.use(express.static("uploads"));
routes(app)


// Inicia o servidor na porta 3000 e exibe uma mensagem no console quando estiver rodando
app.listen(3000, () => {
    console.log("Servidor escutando...");
});





