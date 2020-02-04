const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();
const upload = multer(uploadConfig);

// Tratando requisição 'get' na rota raiz
routes.get('/posts', PostController.index);

// Rota Post - post http://localhost:7777/posts
routes.post('/posts', upload.single('image'), PostController.store);

// Rota para like
routes.post('/posts/:id/like', LikeController.store);

module.exports  = routes;