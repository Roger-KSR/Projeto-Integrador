const test = require("node:test");
const assert = require("node:assert/strict");
const Produto = require("./produto.model");

test("cria um produto com os dados informados", () => {
  const produto = new Produto({ id: 1, nome: "Mouse", preco: 50 });

  assert.equal(produto.id, 1);
  assert.equal(produto.nome, "Mouse");
  assert.equal(produto.preco, 50);
});

test("estaEmPromocao retorna true quando preco < 100", () => {
  const produto = new Produto({ id: 1, nome: "Mouse", preco: 50 });

  assert.equal(produto.estaEmPromocao(), true);
});

test("estaEmPromocao retorna false quando preco >= 100", () => {
  const produto = new Produto({ id: 2, nome: "Notebook", preco: 3500 });

  assert.equal(produto.estaEmPromocao(), false);
});
