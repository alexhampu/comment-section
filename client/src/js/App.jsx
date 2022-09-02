import React, {useEffect, useState} from 'react'

import LeaveComment from "./components/LeaveComment.jsx";
import Comments from "./components/Comments.jsx";
import CommentService from "./services/comment.service.js";

const App = () => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        CommentService.getAll().then((comments) => {
            setComments(comments);
        });
    }, []);

    return (
        <main className="container">
            <div className="CommentSection">
                <div className="CommentSection__Header">
                    <div className="CommentSection__Title">Discussion</div>
                    <LeaveComment onCreate={(comment) => setComments([comment, ...comments])}/>
                </div>

                <Comments comments={comments}/>
            </div>
        </main>
    )
}

export default App
