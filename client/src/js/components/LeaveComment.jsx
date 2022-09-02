import React, {useState} from 'react';
import classNames from "classnames";

import CommentService from "../services/comment.service.js";

const submitComment = (value, parentId, updateValue, updateError, onCreate) => {
    updateError(false);

    if (value.trim() === '') {
        updateError(true);
        return;
    }

    CommentService.store(value, parentId).then((comment) => {
        onCreate(comment);
        updateValue('');
    }).catch((err) => {
        console.log({err});
        updateError(true);
    });
}

const LeaveComment = ({parentId, onCreate}) => {
    const [value, updateValue] = useState('');
    const [error, updateError] = useState(false);

    return (
        <div className="LeaveComment">
            <div>
                <img src="https://picsum.photos/seed/picsum/200/300" className="Avatar"/>
            </div>
            <div className="flex-1">
                <input className={classNames("LeaveComment__Input", {
                    "LeaveComment__Input--error": error
                })} placeholder="What are your thoughts?"
                value={value} onChange={(e) => updateValue(e.target.value)}/>
            </div>
            <div>
                <button type="button" className="LeaveComment__Submit" onClick={() => submitComment(value, parentId, updateValue, updateError, onCreate)}>Comment</button>
            </div>
        </div>
    )
}

export default LeaveComment;