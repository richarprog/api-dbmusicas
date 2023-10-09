//biblioteca e módulos
const Sequelize = require('sequelize');
//configuração do banco de dados
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './musicasdamissa.sqlite'
});

//tratamento de erros
try{
  sequelize.authenticate();
  console.log("Banco de dados criado com sucesso!");
}
catch (erro){
  console.log("Erro ao conectar o banco", erro);
}

module.exports = sequelize;
