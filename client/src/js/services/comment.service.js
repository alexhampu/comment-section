import {get} from "axios";

const getAll = async () => {
    const comments = await get('/comments');

    if (comments.status === 200) {
        return comments.data;
    }

    throw new Error("Couldn't get the comments from the backend");
}

export default {
    getAll
}