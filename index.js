const express = require('express');
const app = express();
const database = require('./db/db');
const routes = require('./routes/routes');

const port = process.env.PORT || 3001;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Rota principal
app.use("/", routes);

try {
  database.sync().then(() => {
    
  })
}
catch (erro) {
  console.log("Houve uma falha ao sincronizar com o banco de dados", erro);
};

app.listen(3000, () => {
    console.log("O servidor está rodando na porta 3000");
});