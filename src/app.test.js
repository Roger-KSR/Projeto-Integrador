const test = require("node:test");
const assert = require("node:assert/strict");
const app = require("./app");

test("integração das rotas", async (t) => {
  const servidor = app.listen(0);
  const { port } = servidor.address();
  const baseUrl = `http://localhost:${port}`;

  t.after(() => servidor.close());

  await t.test("GET / retorna mensagem de status", async () => {
    const resposta = await fetch(`${baseUrl}/`);
    const texto = await resposta.text();

    assert.equal(resposta.status, 200);
    assert.match(texto, /API está rodando perfeitamente/);
  });

  await t.test("GET /produtos retorna a lista de produtos", async () => {
    const resposta = await fetch(`${baseUrl}/produtos`);
    const produtos = await resposta.json();

    assert.equal(resposta.status, 200);
    assert.ok(Array.isArray(produtos));
    assert.ok(produtos.length >= 2);
  });

  await t.test("GET /produtos/:id retorna 404 para id inexistente", async () => {
    const resposta = await fetch(`${baseUrl}/produtos/9999`);
    const corpo = await resposta.json();

    assert.equal(resposta.status, 404);
    assert.deepEqual(corpo, { mensagem: "Produto não encontrado" });
  });

  await t.test("POST /produtos cria um novo produto", async () => {
    const resposta = await fetch(`${baseUrl}/produtos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: "Headset", preco: 300 })
    });
    const produto = await resposta.json();

    assert.equal(resposta.status, 201);
    assert.equal(produto.nome, "Headset");
    assert.equal(produto.preco, 300);
  });

  await t.test("POST /produtos sem nome retorna 400", async () => {
    const resposta = await fetch(`${baseUrl}/produtos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ preco: 300 })
    });
    const corpo = await resposta.json();

    assert.equal(resposta.status, 400);
    assert.match(corpo.mensagem, /obrigatórios/);
  });

  await t.test("GET /funcionarios retorna a lista de funcionarios", async () => {
    const resposta = await fetch(`${baseUrl}/funcionarios`);
    const funcionarios = await resposta.json();

    assert.equal(resposta.status, 200);
    assert.ok(Array.isArray(funcionarios));
    assert.ok(funcionarios.length >= 2);
  });

  await t.test("GET /funcionarios/:id retorna 404 para id inexistente", async () => {
    const resposta = await fetch(`${baseUrl}/funcionarios/9999`);
    const corpo = await resposta.json();

    assert.equal(resposta.status, 404);
    assert.deepEqual(corpo, { mensagem: "Funcionário não encontrado" });
  });

  await t.test("POST /funcionarios cria um novo funcionario", async () => {
    const resposta = await fetch(`${baseUrl}/funcionarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: "Carlos", cargo: "Suporte" })
    });
    const funcionario = await resposta.json();

    assert.equal(resposta.status, 201);
    assert.equal(funcionario.nome, "Carlos");
    assert.equal(funcionario.cargo, "Suporte");
    assert.equal(funcionario.salario, 0);
  });

  await t.test("POST /funcionarios sem cargo retorna 400", async () => {
    const resposta = await fetch(`${baseUrl}/funcionarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: "Carlos" })
    });
    const corpo = await resposta.json();

    assert.equal(resposta.status, 400);
    assert.match(corpo.mensagem, /obrigatórios/);
  });
});
