import {get, post} from "axios";
import moment from "moment/moment.js";

const commentMapper = (comment) => ({
    ...comment,
    replies: commentsMapper(comment.replies),
    createdAt: moment(comment.createdAt).fromNow(),
    updatedAt: moment(comment.updatedAt).fromNow(),
});

const commentsMapper = (comments) => {
    if (!comments) {
        return comments;
    }

    return comments.map((comment) => commentMapper(comment));
};

const getAll = async () => {
    const comments = await get('/comments');

    if (comments.status !== 200) {
        throw new Error("Couldn't get the comments from the backend");
    }

    return commentsMapper(comments.data);
}

const getReplies = async (id) => {
    const comments = await get(`/comments/${id}/replies`);

    if (comments.status !== 200) {
        throw new Error("Couldn't get the comments from the backend");
    }

    return commentsMapper(comments.data);
}

const upvote = async (commentId) => {
    const comments = await post(`/comments/${commentId}/upvotes`);

    if (comments.status === 200) {
        return comments.data;
    }

    throw new Error("Couldn't upvote comment");
}

const store = async (content, parentId) => {
    const comment = await post(`/comments`, {
        content,
        parentId
    });

    if (comment.status === 200) {
        return commentMapper(comment.data);
    }

    throw new Error("Couldn't upvote comment");
}

export default {
    getAll,
    upvote,
    store,
    getReplies
}