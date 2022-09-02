const CommentRepository = require('../repositories/comment.repository');

const commentMapper = async (comments) => {
    return await Promise.all(comments.map(async (comment) => {
        const upvote = await CommentRepository.getUpvoteByCommentAndAuthor(comment.id, 1);

        comment.isUpvoted = upvote !== null;
        comment.replies = await commentMapper(comment.replies ?? []);

        return comment;
    }));
}

async function store(authorId, content, parentId) {
    let comment = await CommentRepository.store(authorId, content, parentId);
    comment = await commentMapper([comment]);

    return comment.shift();
}

async function getAll() {
    const comments = await CommentRepository.getAll();

    return commentMapper(comments);
}

async function replies(id) {
    const comment = await CommentRepository.getById(id);

    return commentMapper(comment.replies ?? []);
}

function upvote(commentId, userId) {
    return CommentRepository.upvote(commentId, userId);
}

module.exports = {
    store,
    getAll,
    upvote,
    replies
}