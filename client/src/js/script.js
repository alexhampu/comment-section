import './core/axios-interceptor.js';
import {createComments, getLeaveCommentElement} from "./core/templates.js";
import CommentService from "./services/comment.service.js";

document.querySelector('.CommentSection__Header').appendChild(getLeaveCommentElement());

CommentService.getAll().then((comments) => {
    createComments(comments, document.querySelector('.CommentSection__List'));
});