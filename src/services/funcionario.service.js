const Funcionario = require("../models/funcionario.model");

const funcionarios = [
  new Funcionario({ id: 1, nome: "João", cargo: "Desenvolvedor", salario: 4000 }),
  new Funcionario({ id: 2, nome: "Maria", cargo: "Designer", salario: 3500 })
];

function listar() {
  return funcionarios;
}

function buscarPorId(id) {
  return funcionarios.find(f => f.id === Number(id));
}

function criar(dados) {
  if (!dados.nome || !dados.cargo) {
    throw new Error("nome e cargo são obrigatórios");
  }

  const funcionario = new Funcionario({
    id: funcionarios.length + 1,
    nome: dados.nome,
    cargo: dados.cargo,
    salario: dados.salario || 0
  });

  funcionarios.push(funcionario);
  return funcionario;
}

module.exports = { listar, buscarPorId, criar };