const express = require('express');
const router = express.Router();
const addPost = require('./addPost.js');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage:storage});
const getPosts = require("./getPosts.js");
const getUserPosts = require('./getUserPost.js');



router.post("/add-post",upload.single('imageUrl'),addPost);
router.get("/get-posts",getPosts);
router.get("/get-user-posts",getUserPosts);

module.exports = router;