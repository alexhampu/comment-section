const CommentService = require("../services/comment.service");

module.exports = {
    index: async (request, response) => {
        const comments = await CommentService.getAll();
        response.json(comments);
    },
    replies: async (request, response) => {
        const {id} = request.params;

        const comments = await CommentService.replies(Number(id));
        response.json(comments);
    },
    store: async (request, response) => {
        const {content, parentId} = request.body;

        const comment = await CommentService.store(1, content, parentId);

        response.json(comment);
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
            const upvote = await CommentService.upvote(Number(id), userId);

            const io = request.app.get('io');
            io.emit(`comment-${id}.upvoted`, upvote);

            response.json(upvote);
        } catch(e) {
            response.json(e);
        }
    }
}