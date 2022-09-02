const CommentRepository = require('../repositories/comment.repository');

async function getAll() {
    const comments = await CommentRepository.getAll();

    const commentMapper = async (comments) => {
        return await Promise.all(comments.map(async (comment) => {
            const upvote = await CommentRepository.getUpvoteByCommentAndAuthor(comment.id, 1);

            comment.isUpvoted = upvote !== null;
            comment.replies = await commentMapper(comment.replies ?? []);

            return comment;
        }));
    }

    return commentMapper(comments);
}

function upvote(commentId, userId) {
    return CommentRepository.upvote(commentId, userId);
}

module.exports = {
    getAll,
    upvote
}