const CommentRepository = require('../repositories/comment.repository');

async function getAll() {
    return await CommentRepository.getAll();
}

async function upvote(commentId, userId) {
    return CommentRepository.upvote(commentId, userId);
}

module.exports = {
    getAll,
    upvote
}