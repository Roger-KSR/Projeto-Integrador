const test = require("node:test");
const assert = require("node:assert/strict");

const servicePath = require.resolve("./produtos.service");

function carregarServiceLimpo() {
  delete require.cache[servicePath];
  return require("./produtos.service");
}

test("listar retorna os produtos iniciais", () => {
  const service = carregarServiceLimpo();

  const produtos = service.listar();

  assert.equal(produtos.length, 2);
  assert.equal(produtos[0].nome, "Notebook");
  assert.equal(produtos[1].nome, "Mouse");
});

test("buscarPorId encontra um produto existente", () => {
  const service = carregarServiceLimpo();

  const produto = service.buscarPorId(1);

  assert.ok(produto);
  assert.equal(produto.nome, "Notebook");
});

test("buscarPorId aceita id como string", () => {
  const service = carregarServiceLimpo();

  const produto = service.buscarPorId("2");

  assert.ok(produto);
  assert.equal(produto.nome, "Mouse");
});

test("buscarPorId retorna undefined quando não encontra", () => {
  const service = carregarServiceLimpo();

  const produto = service.buscarPorId(999);

  assert.equal(produto, undefined);
});

test("criar adiciona um novo produto à lista", () => {
  const service = carregarServiceLimpo();

  const produto = service.criar({ nome: "Teclado", preco: 200 });

  assert.equal(produto.nome, "Teclado");
  assert.equal(produto.preco, 200);
  assert.equal(service.listar().length, 3);
});

test("criar lança erro quando nome não é informado", () => {
  const service = carregarServiceLimpo();

  assert.throws(
    () => service.criar({ preco: 200 }),
    /nome e preco são obrigatórios/
  );
});

test("criar lança erro quando preco não é informado", () => {
  const service = carregarServiceLimpo();

  assert.throws(
    () => service.criar({ nome: "Teclado" }),
    /nome e preco são obrigatórios/
  );
});
