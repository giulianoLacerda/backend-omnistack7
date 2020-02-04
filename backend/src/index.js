const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

// Suporte tanto ao protocolo http quanto ao socket.
const app = express(); // server
const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://giu:admin@cluster0-8n5e5.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology:true,
});

// Permite que todo o restante da aplicação tenha acesso ao req.io
app.use((req, res, next) => {
    req.io = io;
    next();
})

app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'));

server.listen(7777);