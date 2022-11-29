import express from "express";
import formmidable from "express-formidable";

const router = express.Router();
//Controllers
import {
	createPost,
	uploadImage,
	postsByUser,
	userPost,
	updatePost,
	deletePost,
	newsFeed,
	likePost,
	unlikePost,
	addComment,
	removeComment,
	totalPosts,
	posts,
} from "../controllers/post";
//Middlewares
import { requireSignin, canEditDeletePost } from "../middlewares";

router.post("/create-post", requireSignin, createPost);
router.post(
	"/upload-image",
	requireSignin,
	formmidable({ maxFileSize: 5 * 1024 * 1024 }),
	uploadImage
);
router.get("/user-posts", requireSignin, postsByUser);
router.get("/user-posts/:_id", requireSignin, userPost);
router.put("/update-post/:_id", requireSignin, canEditDeletePost, updatePost);
router.delete(
	"/delete-post/:_id",
	requireSignin,
	canEditDeletePost,
	deletePost
);
router.get("/news-feed", requireSignin, newsFeed);
router.put("/like-post", requireSignin, likePost);
router.put("/unlike-post", requireSignin, unlikePost);
router.put("/add-comment", requireSignin, addComment);
router.put("/remove-comment", requireSignin, removeComment);
router.get("/total-posts", totalPosts);
router.get("/posts", posts);

module.exports = router;
