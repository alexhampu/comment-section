const CommentService = require("../services/comment.service");

module.exports = {
    index: async (request, response) => {
        const comments = await CommentService.getAll();
        response.json(comments);
    },
    upvote: async (request, response) => {
        let {id} = request.params;
        const userId = 1;

        id = Number(id);

        if (isNaN(id)) {
            response.status(400).json({
                message: 'User id is not valid'
            });
            return;
        }

        try {
            response.json(await CommentService.upvote(Number(id), userId));
        } catch(e) {
            response.json(e);
        }

    }
}