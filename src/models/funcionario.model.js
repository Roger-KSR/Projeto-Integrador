class Funcionario {
  constructor({ id, nome, cargo, salario }) {
    this.id = id;
    this.nome = nome;
    this.cargo = cargo;
    this.salario = salario;
  }

  estaAtivo() {
    return this.salario > 0;
  }
}

module.exports = Funcionario;