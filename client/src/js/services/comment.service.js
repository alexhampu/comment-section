import {get, post} from "axios";
import moment from "moment/moment.js";

const getAll = async () => {
    const comments = await get('/comments');

    if (comments.status !== 200) {
        throw new Error("Couldn't get the comments from the backend");
    }

    const commentMapper = (comments) => {
        if (!comments) {
            return comments;
        }

        return comments.map((comment) => ({
            ...comment,
            replies: commentMapper(comment.replies),
            createdAt: moment(comment.createdAt).fromNow(),
            updatedAt: moment(comment.updatedAt).fromNow(),
        }));
    };

    return commentMapper(comments.data);
}

const upvote = async (commentId) => {
    const comments = await post(`/comments/${commentId}/upvotes`);

    if (comments.status === 200) {
        return comments.data;
    }

    throw new Error("Couldn't upvote comment");
}

export default {
    getAll,
    upvote
}