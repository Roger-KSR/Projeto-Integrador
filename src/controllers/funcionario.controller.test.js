const test = require("node:test");
const assert = require("node:assert/strict");
const { mock } = require("node:test");

const service = require("../services/funcionario.service");
const controller = require("./funcionario.controller");

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

test("listar responde 200 com a lista de funcionarios", () => {
  const funcionariosFalsos = [{ id: 1, nome: "João", cargo: "Dev", salario: 4000 }];
  mock.method(service, "listar", () => funcionariosFalsos);

  const req = {};
  const res = criarResMock();

  controller.listar(req, res);

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, funcionariosFalsos);

  mock.restoreAll();
});

test("buscarPorId responde 200 quando o funcionario existe", () => {
  const funcionarioFalso = { id: 1, nome: "João", cargo: "Dev", salario: 4000 };
  mock.method(service, "buscarPorId", () => funcionarioFalso);

  const req = { params: { id: "1" } };
  const res = criarResMock();

  controller.buscarPorId(req, res);

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, funcionarioFalso);

  mock.restoreAll();
});

test("buscarPorId responde 404 quando o funcionario não existe", () => {
  mock.method(service, "buscarPorId", () => undefined);

  const req = { params: { id: "999" } };
  const res = criarResMock();

  controller.buscarPorId(req, res);

  assert.equal(res.statusCode, 404);
  assert.deepEqual(res.body, { mensagem: "Funcionário não encontrado" });

  mock.restoreAll();
});

test("criar responde 201 com o funcionario criado", () => {
  const funcionarioCriado = { id: 3, nome: "Ana", cargo: "QA", salario: 3000 };
  mock.method(service, "criar", () => funcionarioCriado);

  const req = { body: { nome: "Ana", cargo: "QA", salario: 3000 } };
  const res = criarResMock();

  controller.criar(req, res);

  assert.equal(res.statusCode, 201);
  assert.deepEqual(res.body, funcionarioCriado);

  mock.restoreAll();
});

test("criar responde 400 quando o service lança erro", () => {
  mock.method(service, "criar", () => {
    throw new Error("nome e cargo são obrigatórios");
  });

  const req = { body: {} };
  const res = criarResMock();

  controller.criar(req, res);

  assert.equal(res.statusCode, 400);
  assert.deepEqual(res.body, { mensagem: "nome e cargo são obrigatórios" });

  mock.restoreAll();
});
