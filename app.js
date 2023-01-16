const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false })); //APENAS DADOS SIMPLES
app.use(bodyParser.json()); //json de entrada no body 

app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*'); 
   res.header('Access-Control-Allow-Headers', 
   'origin, X-Requested-With, content-type, Accept, Authorization'
   );

   if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods','PUT, POST, DELETE, GET');
      return res.status(200).send({});

   }

   next();

});

app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);

//QUANDO NAO ENCONTRA A ROTA, ENTRA AQUI!
app.use((req, res, next) => {
   const err0 = new Error('Nao encontrado');
   erro.status(404);
   next(erro);
});


app.use((erro, req, res, next) => {
   res.status(erro.status || 500);
   return res.send({
      error: {
         mensagem: erro.message
      }
   }); 
});


module.exports = app;   