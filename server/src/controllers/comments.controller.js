const CommentService = require("../services/comment.service");

module.exports = {
    index: async (request, response) => {
        const comments = await CommentService.getAll();
        response.json(comments);
    }
}