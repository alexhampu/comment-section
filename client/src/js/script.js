import './core/axios-interceptor.js';
import {getCommentElement, getLeaveCommentElement} from "./core/templates.js";
import CommentService from "./services/comment.service.js";
import moment from "moment";

document.querySelector('.CommentSection__Header').appendChild(getLeaveCommentElement());

function createComments(comments, parent) {
    const createComment = (comment, parentElement) => {
        const commentElement = getCommentElement(comment.id, comment.author.name, moment(comment.createdAt).fromNow(),
            comment.content);

        parentElement.appendChild(commentElement);

        return commentElement;
    }

    for (const comment of comments) {
        const commentElement = createComment(comment, parent);
        const replySection = commentElement.querySelector('.Comment__Replies');

        if (comment.replies?.length) {
            console.log({replies: comment.replies});
            createComments(comment.replies, replySection);
        } else {
            replySection.remove();
        }
    }
}

CommentService.getAll().then((comments) => {
    createComments(comments, document.querySelector('.CommentSection__List'));
});