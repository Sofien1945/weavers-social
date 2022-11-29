import express from "express";

const router = express.Router();
//Controllers
import {
	register,
	login,
	currentUser,
	forgotPassword,
	profileUpdate,
	findPeople,
	addFollower,
	userFollow,
	userFollowing,
	userUnfollow,
	removeFollower,
	searchUser,
} from "../controllers/auth";
//Middlewares
import { requireSignin } from "../middlewares";

router.post("/register", register);
router.post("/login", login);
router.get("/current-user", requireSignin, currentUser);
router.post("/forgot-password", forgotPassword);
router.put("/profile-update", requireSignin, profileUpdate);
router.get("/find-people", requireSignin, findPeople);
router.put("/user-follow", requireSignin, addFollower, userFollow);
router.put("/user-unfollow", requireSignin, removeFollower, userUnfollow);
router.get("/user-following", requireSignin, userFollowing);
router.get("/search-user/:query", requireSignin, searchUser);

module.exports = router;
