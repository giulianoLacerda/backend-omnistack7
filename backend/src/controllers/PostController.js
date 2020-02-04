const Post = require('../models/Post');
const jimp = require('jimp');
const path = require('path');
const fs = require('fs');

module.exports = {
    async index(req, res) {
        // Ordena pelos posts que foram criados mais recentes.
        const posts = await Post.find().sort('-createdAt');

        return res.json(posts);
    },

    async store(req, res) {
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;

        jimp.read(req.file.path)
            .then(img => {
                return img
                .resize(500, jimp.AUTO) // resize
                .quality(70) // set JPEG quality
                .write(path.resolve(req.file.destination, 'resized', image)); // save
            })
            .catch(err => {
                console.error(err); 
            });

        // Deleta imagem original.
        fs.unlinkSync(req.file.path);

        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image,
        })

        // Envia para todos os outros usuários logados a informação deste post.
        req.io.emit('post', post);

        return res.json(post);
    }
};