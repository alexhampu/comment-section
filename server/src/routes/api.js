const express = require('express');
const CommentsController = require("../controllers/comments.controller");

const router = express.Router();

router.get('/comments', CommentsController.index);
router.post('/comments', CommentsController.store);
router.post('/comments/:id/upvotes', CommentsController.upvote);

module.exports = router;