const test = require("node:test");
const assert = require("node:assert/strict");
const { mock } = require("node:test");

const service = require("../services/produtos.service");
const controller = require("./produto.controller");

function criarResMock() {
  const res = {
    statusCode: null,
    body: null,
    status(codigo) {
      this.statusCode = codigo;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    }
  };
  return res;
}

test("listar responde 200 com a lista de produtos", () => {
  const produtosFalsos = [{ id: 1, nome: "Mouse", preco: 50 }];
  mock.method(service, "listar", () => produtosFalsos);

  const req = {};
  const res = criarResMock();

  controller.listar(req, res);

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, produtosFalsos);

  mock.restoreAll();
});

test("buscarPorId responde 200 quando o produto existe", () => {
  const produtoFalso = { id: 1, nome: "Mouse", preco: 50 };
  mock.method(service, "buscarPorId", () => produtoFalso);

  const req = { params: { id: "1" } };
  const res = criarResMock();

  controller.buscarPorId(req, res);

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, produtoFalso);

  mock.restoreAll();
});

test("buscarPorId responde 404 quando o produto não existe", () => {
  mock.method(service, "buscarPorId", () => undefined);

  const req = { params: { id: "999" } };
  const res = criarResMock();

  controller.buscarPorId(req, res);

  assert.equal(res.statusCode, 404);
  assert.deepEqual(res.body, { mensagem: "Produto não encontrado" });

  mock.restoreAll();
});

test("criar responde 201 com o produto criado", () => {
  const produtoCriado = { id: 3, nome: "Teclado", preco: 200 };
  mock.method(service, "criar", () => produtoCriado);

  const req = { body: { nome: "Teclado", preco: 200 } };
  const res = criarResMock();

  controller.criar(req, res);

  assert.equal(res.statusCode, 201);
  assert.deepEqual(res.body, produtoCriado);

  mock.restoreAll();
});

test("criar responde 400 quando o service lança erro", () => {
  mock.method(service, "criar", () => {
    throw new Error("nome e preco são obrigatórios");
  });

  const req = { body: {} };
  const res = criarResMock();

  controller.criar(req, res);

  assert.equal(res.statusCode, 400);
  assert.deepEqual(res.body, { mensagem: "nome e preco são obrigatórios" });

  mock.restoreAll();
});
