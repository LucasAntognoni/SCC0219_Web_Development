const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const nano = require('nano')('http://localhost:5984');
const app = express();

app.use(express.static(__dirname +'/view/public'));
app.use(express.static(__dirname+'/website'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

nano.db.create('petjava');
const db = nano.db.use('petjava');

app.use((err, request, response, next) => {
    if(err) {
        console.log(err)
        response.status(500).send('Server error');
    }

    console.log(request.headers);
    next();
});

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname+'/view/index.html'));
});

app.get('/about.html', (request, response) => {
    response.sendFile(path.join(__dirname+'/view/about.html'));
});

app.get('/login_cadastro/login.html', (request, response) => {
    response.sendFile(path.join(__dirname+'/view/login_cadastro/login.html'));
});
app.get('/login_cadastro/cadastro.html', (request, response) => {
    response.sendFile(path.join(__dirname+'/view/login_cadastro/cadastro.html'));
});
app.get('/ganhos/ganhos.html', (request, response) => {
    response.sendFile(path.join(__dirname+'/view/ganhos/ganhos.html'));
});
app.get('/vendas/vendaProdutos.html', (request, response) => {
    response.sendFile(path.join(__dirname+'/view/vendas/vendaProdutos.html'));
});
app.get('/vendas/vendaServicos.html', (request, response) => {
    response.sendFile(path.join(__dirname+'/view/vendas/vendaServicos.html'));
});
app.get('/gerenciamento/produtos.html', (request, response) => {
    response.sendFile(path.join(__dirname+'/view/gerenciamento/produtos.html'));
});
app.get('/gerenciamento/servicos.html', (request, response) => {
    response.sendFile(path.join(__dirname+'/view/gerenciamento/servicos.html'));
});
app.get('/agendamento/agendamento.html', (request, response) => {
    response.sendFile(path.join(__dirname+'/view/agendamento/agendamento.html'));
});
app.get('/forms/animals.html', (request, response) => {
    response.sendFile(path.join(__dirname+'/view/forms/animals.html'));
});
app.get('/forms/prods.html', (request, response) => {
    response.sendFile(path.join(__dirname+'/view/forms/prods.html'));
});
app.get('/forms/servs.html', (request, response) => {
    response.sendFile(path.join(__dirname+'/view/forms/servs.html'));
});

app.post('/addUser', (request, response) => {
    db.insert(request.body, (err, body, header) => {
        if(err)
            console.log('[User.insert]', err.message);
        else
            console.log('New user:\n', body);
    });
});

app.post('/addHorario', (request, response) => {
  db.insert(request.body, (err, body, header) => {
    if(err)
      console.log('[Horario.insert]', err.message);
    else
      console.log('Novo Horário:\n', body);
  });
});

app.listen(3000, (err) => {
    if(err)
        console.log(err);

    else
        console.log('Server is up and running');
});
