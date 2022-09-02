const CommentRepository = require('../repositories/comment.repository');

function getAll() {
    return CommentRepository.getAll();
}

module.exports = {
    getAll
}