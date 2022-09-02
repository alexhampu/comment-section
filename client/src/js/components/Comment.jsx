import React, {useState} from 'react';
import classNames from "classnames";

import Comments from "./Comments.jsx";
import CommentService from "../services/comment.service.js";
import LeaveComment from "./LeaveComment.jsx";

const showReplies = (id, setReplies, setRequestedReplies) => {
    setRequestedReplies(true);
    setReplies([]);

    CommentService.getReplies(id).then((comments) => {
        setReplies(comments);
    });
}

const upvote = (id, setIsUpvoted, setTotalUpvotes) => {
    CommentService.upvote(id).then(({created, totalUpvotes}) => {
        setIsUpvoted(created);
        setTotalUpvotes(totalUpvotes);
    }).catch(() => {
        setIsUpvoted(false);
    });
}

const Comment = ({comment}) => {
    const [requestedReplies, setRequestedReplies] = useState(!!comment.replies?.length);
    const [replies, setReplies] = useState(comment.replies ?? []);
    const [isUpvoted, setIsUpvoted] = useState(comment.isUpvoted ?? false);
    const [totalUpvotes, setTotalUpvotes] = useState(comment.totalUpvotes ?? 0);
    const [leaveReplyVisibility, setLeaveReplyVisibility] = useState(false);

    return (
        <div className="Comment">
            <div className="Comment__Side">
                <img src={`https://picsum.photos/seed/avatar-${comment.author?.id ?? 'anonymous'}/200/200`}
                     alt={comment.author?.name ?? 'Anonymous'} className="Avatar"/>
            </div>
            <div className="Comment__Wrapper">
                <div>
                    <div className="Comment__Header">
                        <div className="Comment__Author">{comment.author.name}</div>
                        <div className="Comment__Separator"></div>
                        <div className="Comment__Time">{comment.createdAt}</div>
                    </div>
                    <div className="Comment__Content">
                        {comment.content}
                    </div>
                    <div className="Comment__Footer">
                        <button type="button" className={classNames("Comment__Button Comment__Button--upvote", {
                            "Comment__Button--upvoted": isUpvoted
                        })} onClick={() => upvote(comment.id, setIsUpvoted, setTotalUpvotes)}>
                            <span><i className="fa-solid fa-caret-up"></i></span>
                            <span className="Comment__UpvoteLabel">{isUpvoted ? 'Upvoted' : 'Upvote'}</span>
                            <span className="Comment__UpvoteTotal">({totalUpvotes})</span>
                        </button>
                        <button type="button" className="Comment__Button Comment__Button--reply"
                                onClick={() => setLeaveReplyVisibility(!leaveReplyVisibility)}>Reply</button>
                        <button type="button" className="Comment__Button Comment__Button--replies"
                                onClick={() => showReplies(comment.id, setReplies, setRequestedReplies)}>Show replies</button>
                    </div>
                </div>
                {leaveReplyVisibility && <div className="Comment__ReplyWrapper">
                    <LeaveComment parentId={comment.id}
                                  onCreate={(newComment) => {
                                      setReplies([newComment, ...replies]);
                                      setRequestedReplies(true);
                                  }}/>
                </div>}

                {requestedReplies && <div className="Comment__Replies">
                    {replies && <Comments comments={replies}/>}
                    {!replies.length && <div>No more replies to show</div>}
                </div>}
            </div>
        </div>
    );
}

export default Comment;