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

        inputElement.value = '';

        console.log({data: element.dataset, value});
    });

    return element;
}

export function getCommentElement(id, authorName, time, content) {
    const element = getTemplate(Template.COMMENT);

    element.querySelector('.Comment__Author').innerText = authorName;
    element.querySelector('.Comment__Time').innerText = time;
    element.querySelector('.Comment__Content').innerText = content;
    element.querySelector('.Comment__UpvoteLabel').innerText = 'Upvote';
    element.querySelector('.Comment__UpvoteTotal span').innerText = 2;

    const avatarElement = document.createElement('img');
    avatarElement.classList.add('Avatar');
    avatarElement.src = `https://picsum.photos/seed/avatar-${authorName}/200/200`;

    element.querySelector('.Comment__Side').appendChild(avatarElement);

    element.querySelector('.Comment__Button--reply').addEventListener('click', () => {
        let replyElement = element.querySelector('.LeaveComment');
        if (replyElement) {
            replyElement.remove();
        } else {
            replyElement = getLeaveCommentElement(id);
            element.querySelector('.Comment__Wrapper').appendChild(replyElement);
        }
    });

    element.querySelector('.Comment__Button--upvote').addEventListener('click', function () {
        this.classList.toggle('Comment__Button--upvoted');

        element.querySelector('.Comment__UpvoteLabel').innerText = this.classList
            .contains('Comment__Button--upvoted') ? 'Upvoted' : 'Upvote';

        element.querySelector('.Comment__UpvoteTotal span').innerText = 5;
    });

    return element;
}