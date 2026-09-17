const service = require("../services/funcionario.service");

exports.listar = (req, res) => {
  const funcionarios = service.listar();
  res.status(200).json(funcionarios);
};

exports.buscarPorId = (req, res) => {
  const funcionario = service.buscarPorId(req.params.id);

  if (!funcionario) {
    return res.status(404).json({ mensagem: "Funcionário não encontrado" });
  }

  res.status(200).json(funcionario);
};

exports.criar = (req, res) => {
  try {
    const funcionario = service.criar(req.body);
    res.status(201).json(funcionario);
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
};