## Passo 0: Instalação do Node.js (Ambiente Local)

*Caso utilize o GitHub Codespaces, pule este passo (o Node já vem instalado).*

1. Acesse o site oficial ([nodejs.org](https://nodejs.org)) e baixe a versão **LTS**.
2. Conclua a instalação padrão do instalador.
3. Valide a presença das ferramentas no terminal:

```bash
   node -v
   npm -v
   

```

## Passo 1: Inicialização do Projeto

Crie e abra a pasta do projeto no terminal e execute:

```bash
npm init -y

```

* **O que faz:** Gera o arquivo `package.json` com todas as configurações padrão confirmadas.

## Passo 2: Instalação das Dependências

Instale o framework de roteamento e o utilitário de recarregamento automático:

```bash
npm install express
npm install --save-dev nodemon

```

* **express:** Cria o servidor, middlewares e gerencia requisições HTTP.
* **nodemon:** Reinicia a aplicação automaticamente ao salvar alterações no código.

## Passo 3: Criação da Estrutura de Pastas e Arquivos

Organize o projeto na pasta de código-fonte (`src`):

```text
marinke-node/
├── package.json
├── package-lock.json
├── README.md
└── src/
    ├── index.js
    ├── models/
    │   └── produto.model.js
    ├── services/
    │   └── produtos.service.js
    ├── controllers/
    │   └── produto.controller.js
    └── routes/
        └── produto.routes.js

```

### Papel de cada pasta:

* **`models/`:** Classes que definem a estrutura da entidade e comportamentos do domínio.
* **`services/`:** Centraliza regras de negócio, persistência e validações.
* **`controllers/`:** Converte requisições HTTP (`req`) em ações e responde com status e JSON (`res`).
* **`routes/`:** Liga os verbos HTTP (GET, POST) e URLs aos métodos do Controller.
* **`index.js`:** Ponto de entrada que liga o servidor Express na porta desejada.

## Passo 4: Configuração do Script de Execução

No arquivo `package.json`, aponte o Nodemon para a pasta `src`:

```json
"scripts": {
  "dev": "nodemon src/index.js"
}

```

## Passo 5: Implementação do Código (De Dentro para Fora)

### 1. O Model (`src/models/produto.model.js`)

```javascript
class Produto {
  constructor({ id, nome, preco }) {
    this.id = id;
    this.nome = nome;
    this.preco = preco;
  }

  estaEmPromocao() {
    return this.preco < 100;
  }
}

module.exports = Produto;

```

### 2. O Service (`src/services/produtos.service.js`)

```javascript
const Produto = require("../models/produto.model");

const produtos = [
  new Produto({ id: 1, nome: "Notebook", preco: 3500 }),
  new Produto({ id: 2, nome: "Mouse", preco: 120 })
];

function listar() {
  return produtos;
}

function buscarPorId(id) {
  return produtos.find(p => p.id === Number(id));
}

function criar(dados) {
  if (!dados.nome || dados.preco == null) {
    throw new Error("nome e preco são obrigatórios");
  }

  const produto = new Produto({
    id: produtos.length + 1,
    nome: dados.nome,
    preco: dados.preco
  });

  produtos.push(produto);
  return produto;
}

module.exports = { listar, buscarPorId, criar };

```

### 3. O Controller (`src/controllers/produto.controller.js`)

```javascript
const service = require("../services/produtos.service");

exports.listar = (req, res) => {
  const produtos = service.listar();
  res.status(200).json(produtos);
};

exports.buscarPorId = (req, res) => {
  const produto = service.buscarPorId(req.params.id);

  if (!produto) {
    return res.status(404).json({ mensagem: "Produto não encontrado" });
  }

  res.status(200).json(produto);
};

exports.criar = (req, res) => {
  try {
    const produto = service.criar(req.body);
    res.status(201).json(produto);
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
};

```

### 4. As Routes (`src/routes/produto.routes.js`)

```javascript
const express = require("express");
const router = express.Router();
const controller = require("../controllers/produto.controller");

router.get("/", controller.listar);
router.get("/:id", controller.buscarPorId);
router.post("/", controller.criar);

module.exports = router;

```

### 5. O Index (`src/index.js`)

```javascript
const express = require("express");
const produtoRoutes = require("./routes/produto.routes");

const app = express();

app.use(express.json());
app.use("/produtos", produtoRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000!");
});

```

## Passo 6: Execução e Testes

1. No terminal do projeto, execute:

```bash
   npm run dev
   

```

2. **Testar GET (Listagem):** Abra no navegador `http://localhost:3000/produtos`.
3. **Testar GET por ID:** Acesse `http://localhost:3000/produtos/1`.
4. **Testar POST (Criação):** No Thunder Client, envie um `POST` para `http://localhost:3000/produtos` com o corpo JSON:

```json
   {
     "nome": "Monitor Gamer",
     "preco": 1350
   }
   

```

*Retorno esperado: Status 201 Created com os dados do novo produto instanciado pelo Model.*
