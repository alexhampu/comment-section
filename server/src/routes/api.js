const express = require('express');
const CommentsController = require("../controllers/comments.controller");

const router = express.Router();

router.get('/comments', CommentsController.index);

module.exports = router;