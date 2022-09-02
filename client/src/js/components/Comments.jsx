import React, {useEffect, useState} from "react";

import Comment from "./Comment.jsx";

const Comments = ({comments}) => {
    const [commentBlocks, setCommentBlocks] = useState([]);

    useEffect(() => {
        const newBlocks = [];

        for (const comment of comments) {
            newBlocks.push(<Comment comment={comment} key={comment.id}/>);
        }

        setCommentBlocks(newBlocks);
    }, [comments]);

    return <div className="CommentSection__List">
        {commentBlocks}
    </div>;
}

export default Comments;