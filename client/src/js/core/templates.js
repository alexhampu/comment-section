import CommentService from "../services/comment.service.js";

const Template = {
    LEAVE_COMMENT: 'leaveComment',
    COMMENT: 'comment',
}

function getTemplate(template) {
    const templates = {
        [Template.LEAVE_COMMENT]: document.querySelector('#template_leave-comment'),
        [Template.COMMENT]: document.querySelector('#template_comment'),
    };

    if (!templates.hasOwnProperty(template)) {
        throw new Error(`Template '${template}' doesn't exist.`);
    }

    return templates[template].content.firstElementChild.cloneNode(true);
}

function getCommentParentElement(parentId) {
    if (!parentId) {
        return document.querySelector('.CommentSection__List');
    }

    let parentElement = document.querySelector(`.Comment[data-id="${parentId}"]`);

    if (parentElement.querySelector('.Comment__Replies')) {
        parentElement = parentElement.querySelector('.Comment__Replies');
    } else {
        const repliesElement = document.createElement('div');
        repliesElement.classList.add('Comment__Replies');

        parentElement.querySelector('.Comment__Wrapper').appendChild(repliesElement);
        parentElement = repliesElement;
    }

    return parentElement;
}

export function getLeaveCommentElement(parentId) {
    const element = getTemplate(Template.LEAVE_COMMENT);

    if (parentId) {
        element.dataset.parentId = parentId;
    }

    element.querySelector('button').addEventListener('click', () => {
        const inputElement = element.querySelector('.LeaveComment__Input');
        inputElement.classList.remove('LeaveComment__Input--error');

        const value = inputElement.value.trim();

        if (value === '') {
            inputElement.classList.add('LeaveComment__Input--error');
            return;
        }

        CommentService.store(value, parentId).then((comment) => {
            inputElement.value = '';

            createComments([comment], getCommentParentElement(parentId), true);
        }).catch((err) => {
            console.log({err});
            inputElement.classList.add('LeaveComment__Input--error');
        });
    });

    return element;
}

export function getCommentElement({id, author, createdAt, content, totalUpvotes, isUpvoted}) {
    const element = getTemplate(Template.COMMENT);

    element.querySelector('.Comment__Author').innerText = author?.name ?? 'Anonymous';
    element.querySelector('.Comment__Time').innerText = createdAt;
    element.querySelector('.Comment__Content').innerText = content;
    element.querySelector('.Comment__UpvoteLabel').innerText = isUpvoted ? 'Upvoted' : 'Upvote';
    element.querySelector('.Comment__UpvoteTotal span').innerText = totalUpvotes ?? 0;

    if (isUpvoted) {
        element.querySelector('.Comment__Button--upvote').classList.add('Comment__Button--upvoted');
    }

    const avatarElement = document.createElement('img');
    avatarElement.classList.add('Avatar');
    avatarElement.src = `https://picsum.photos/seed/avatar-${author?.id ?? 'anonymous'}/200/200`;
    element.querySelector('.Comment__Side').appendChild(avatarElement);

    element.querySelector('.Comment__Button--reply').addEventListener('click', () => {
        let replyElement = element.querySelector('.LeaveComment');
        if (replyElement) {
            replyElement.remove();
        } else {
            replyElement = getLeaveCommentElement(id);
            element.querySelector('.Comment__ReplyWrapper').appendChild(replyElement);
        }
    });

    element.querySelector('.Comment__Button--upvote').addEventListener('click', function () {
        this.classList.toggle('Comment__Button--upvoted');

        CommentService.upvote(id).then(({created, totalUpvotes}) => {
            if (created) {
                this.classList.add('Comment__Button--upvoted');
            } else {
                this.classList.remove('Comment__Button--upvoted');
            }

            element.querySelector('.Comment__UpvoteLabel').innerText = created ? 'Upvoted' : 'Upvote';

            element.querySelector('.Comment__UpvoteTotal span').innerText = totalUpvotes;
        }).catch(() => {
            this.classList.toggle('Comment__Button--upvoted');
        });
    });

    element.querySelector('.Comment__Button--replies').addEventListener('click', function () {
        const parentElement = getCommentParentElement(id);
        parentElement.innerHTML = `<div class="flex items-center gap-2">
<i class="fa-solid fa-spinner fa-pulse"></i>
<span>Please wait while we fetch replies.</span>
</div>`;

        CommentService.getReplies(id).then((comments) => {
            if (!comments.length) {
                parentElement.innerHTML = '<div>No more replies to show</div>'
                return;
            }

            parentElement.innerHTML = '';

            createComments(comments, parentElement);
        });
    });

    return element;
}

export function createComments(comments, parent, prepend) {
    const createComment = (comment, parentElement) => {
        const commentElement = getCommentElement(comment);
        commentElement.dataset.id = comment.id;

        if (prepend) {
            parentElement.prepend(commentElement);
        } else {
            parentElement.appendChild(commentElement);
        }

        if (!comment.parentId) {
            commentElement.querySelector('.Comment__Button--replies').remove();
        }

        return commentElement;
    }

    for (const comment of comments) {
        const commentElement = createComment(comment, parent);
        const replySection = commentElement.querySelector('.Comment__Replies');

        if (comment.replies?.length) {
            createComments(comment.replies, replySection);
        } else {
            replySection.remove();
        }
    }
}