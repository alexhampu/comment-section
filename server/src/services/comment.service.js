const CommentRepository = require('../repositories/comment.repository');

async function getAll() {
    return await CommentRepository.getAll();
}

module.exports = {
    getAll
}