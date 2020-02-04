const Post = require('../models/Post');

module.exports = {
    async store(req, res) {

        // Obtém o registro do objeto do banco.
        const post = await Post.findById(req.params.id);
        post.likes += 1;

        await post.save();

        // Envia para todos os outros usuários logados a informação deste like.
        req.io.emit('post', post);

        return res.json(post);
    }
};