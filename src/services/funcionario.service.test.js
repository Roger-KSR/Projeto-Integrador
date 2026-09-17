const test = require("node:test");
const assert = require("node:assert/strict");

const servicePath = require.resolve("./funcionario.service");

function carregarServiceLimpo() {
  delete require.cache[servicePath];
  return require("./funcionario.service");
}

test("listar retorna os funcionarios iniciais", () => {
  const service = carregarServiceLimpo();

  const funcionarios = service.listar();

  assert.equal(funcionarios.length, 2);
  assert.equal(funcionarios[0].nome, "João");
  assert.equal(funcionarios[1].nome, "Maria");
});

test("buscarPorId encontra um funcionario existente", () => {
  const service = carregarServiceLimpo();

  const funcionario = service.buscarPorId(1);

  assert.ok(funcionario);
  assert.equal(funcionario.nome, "João");
});

test("buscarPorId retorna undefined quando não encontra", () => {
  const service = carregarServiceLimpo();

  const funcionario = service.buscarPorId(999);

  assert.equal(funcionario, undefined);
});

test("criar adiciona um novo funcionario com salario informado", () => {
  const service = carregarServiceLimpo();

  const funcionario = service.criar({ nome: "Ana", cargo: "QA", salario: 3000 });

  assert.equal(funcionario.nome, "Ana");
  assert.equal(funcionario.cargo, "QA");
  assert.equal(funcionario.salario, 3000);
  assert.equal(service.listar().length, 3);
});

test("criar usa salario 0 quando não informado", () => {
  const service = carregarServiceLimpo();

  const funcionario = service.criar({ nome: "Ana", cargo: "QA" });

  assert.equal(funcionario.salario, 0);
});

test("criar lança erro quando nome não é informado", () => {
  const service = carregarServiceLimpo();

  assert.throws(
    () => service.criar({ cargo: "QA" }),
    /nome e cargo são obrigatórios/
  );
});

test("criar lança erro quando cargo não é informado", () => {
  const service = carregarServiceLimpo();

  assert.throws(
    () => service.criar({ nome: "Ana" }),
    /nome e cargo são obrigatórios/
  );
});
