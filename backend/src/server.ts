import express from 'express';

const app = express();

app.get('/users', (req, res)=> {
  console.log('Listagem de Usuários');
  res.send({response: 'Listagem na porta 3333'})
})

console.log('[Express] Server runing in port 3333');

app.listen(3333);