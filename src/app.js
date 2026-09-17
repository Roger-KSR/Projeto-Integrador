const express = require("express");
const produtoRoutes = require("./routes/produto.routes");
const funcionarioRoutes = require("./routes/funcionario.routes");


const app = express();

app.use(express.json());

app.use("/produtos", produtoRoutes);
app.use("/funcionarios", funcionarioRoutes);

app.get("/", (req, res) => {
  res.send("API está rodando perfeitamente! Acesse /produtos ou /funcionarios");
});

if (require.main === module) {
  app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000!");
  });
}

module.exports = app;