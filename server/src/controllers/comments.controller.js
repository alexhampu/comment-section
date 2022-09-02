const CommentService = require("../services/comment.service");

module.exports = {
    index: (request, response) => {
        const comments = CommentService.getAll();
        response.json(comments);
    }
}