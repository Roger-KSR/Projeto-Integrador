const test = require("node:test");
const assert = require("node:assert/strict");
const Funcionario = require("./funcionario.model");

test("cria um funcionario com os dados informados", () => {
  const funcionario = new Funcionario({ id: 1, nome: "João", cargo: "Dev", salario: 4000 });

  assert.equal(funcionario.id, 1);
  assert.equal(funcionario.nome, "João");
  assert.equal(funcionario.cargo, "Dev");
  assert.equal(funcionario.salario, 4000);
});

test("estaAtivo retorna true quando salario > 0", () => {
  const funcionario = new Funcionario({ id: 1, nome: "João", cargo: "Dev", salario: 4000 });

  assert.equal(funcionario.estaAtivo(), true);
});

test("estaAtivo retorna false quando salario é 0", () => {
  const funcionario = new Funcionario({ id: 2, nome: "Maria", cargo: "Designer", salario: 0 });

  assert.equal(funcionario.estaAtivo(), false);
});
