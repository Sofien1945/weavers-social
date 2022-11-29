import User from "../modals/user";
import { hashPassword, comparePassword } from "../helpers/auth";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

require("dotenv").config();

export const register = async (req, res) => {
	console.log("REGISTER ENDPOINT:", req.body);
	const { name, email, password, secret } = req.body;
	//Apply validation
	if (!name) return res.status(400).send("name is required");
	if (!password || password.length < 6)
		return res
			.status(400)
			.send("pass is required and should be 6 carac min long");
	if (!secret) return res.status(400).send("Answer is required");

	const exist = await User.findOne({ email });
	if (exist) {
		return res.json({ error: "Email already taken" });
	}
	//Hash the password
	const hashedPassword = await hashPassword(password);

	const user = new User({
		name,
		email,
		password: hashedPassword,
		secret,
		username: uuidv4(),
	});

	try {
		await user.save();
		console.log("LOOK AT REGISTERED USER DATA: ", user);
		return res.json({ ok: true });
	} catch (error) {
		console.log("REGISTER FAILED", error);
		return res.json({ error: "ERROT, try again" });
	}
};

export const login = async (req, res) => {
	//console.log(req.body);
	try {
		//Check if email exisit in the database
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			return res.json({
				error: "No user found under this email address, please register",
			});
		}
		//Hash the password and to compare with database
		const match = await comparePassword(password, user.password);
		if (!match) {
			return res.json({ error: "Wrong Password" });
		}
		//Create JWT TOKEN
		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "7d", //12*60sec
		});
		//DO NOT SEND PASSWORD AND SECRET TO CLIENT SIDE
		user.password = undefined;
		user.secret = undefined;
		res.json({
			token,
			user,
		});
	} catch (error) {
		console.log(error);
		return res.status(400).send("ERROR, TRY AGAIN");
	}
};

export const currentUser = async (req, res) => {
	try {
		const user = await User.findById(req.auth._id);
		// res.json(user);
		res.json({ ok: true });
	} catch (err) {
		console.log(err);
		res.sendStatus(400);
	}
};

export const forgotPassword = async (req, res) => {
	const { email, newPassword, secret } = req.body;
	if (!newPassword || newPassword.length < 6) {
		return res.json({ error: "NEW PASWWORD IS REQUIRED AND MIN 6 CARAC" });
	}
	if (!secret) {
		res.json({
			error: "SECRET IS REQUIRED",
		});
	}
	const user = await User.findOne({ email, secret });
	if (!user) {
		return res.json({ error: "Wrong Details, Try Again" });
	}
	try {
		const hashed = await hashPassword(newPassword);
		await User.findByIdAndUpdate(user._id, { password: hashed });
		return res.json({ success: "Now you can login with new pass" });
	} catch (error) {
		console.log(error);
		return res.json({ error: "Something went Wrong..., try again" });
	}
};

export const profileUpdate = async (req, res) => {
	const { password, email } = req.body;
	const user = await User.findOne({ email });
	//console.log(req.body, user);
	if (user.email != email) {
		return res.json({
			error: "Sorry, Username already taken, choose another one",
		});
	}
	try {
		if (password.length > 5) {
			const newPassword = await hashPassword(password);
			const user = await User.findByIdAndUpdate(
				req.auth._id,
				{ ...req.body, password: newPassword },
				{
					new: true,
				}
			);
			res.json({ user });
		} else {
			res.json({ error: "password must be more than 6 carrac long" });
		}
	} catch (error) {
		res.json({ error: error });
	}
};

export const findPeople = async (req, res) => {
	try {
		//extrat set of users except those he/she already follows and himself
		const user = await User.findById(req.auth._id);
		let following = user.following;
		following.push(user._id);
		const people = await User.find({ _id: { $nin: following } }).limit(10);
		res.json(people);
	} catch (error) {
		console.log(error);
		res.json({ error: error });
	}
};

//Middleware
export const addFollower = async (req, res, next) => {
	try {
		const user = await User.findByIdAndUpdate(req.body._id, {
			$addToSet: { followers: req.auth._id },
		});
		//console.log(req.auth);
		next();
	} catch (error) {
		error;
	}
};

export const userFollow = async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(
			req.auth._id,
			{
				$addToSet: { following: req.body._id },
			},
			{ new: true }
		).select("-password -secret");
		res.json(user);
		console.log(user);
	} catch (error) {
		res.json({ error: "Oops failed, try again" });
	}
};

export const userFollowing = async (req, res) => {
	try {
		const user = await User.findById(req.auth._id);
		const following = await User.find({ _id: user.following }).limit(10);
		res.json(following);
	} catch (error) {}
};

export const removeFollower = async (req, res, next) => {
	try {
		const user = await User.findByIdAndUpdate(req.body._id, {
			$pull: { followers: req.auth._id },
		});
		next();
	} catch (error) {
		console.log(error);
	}
};

export const userUnfollow = async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(
			req.auth._id,
			{
				$pull: { following: req.body._id },
			},
			{ new: true }
		).select("-password -secret");
		res.json(user);
	} catch (error) {
		console.log(error);
	}
};

export const searchUser = async (req, res) => {
	const { query } = await req.params;
	if (!query) return;
	try {
		const user = await User.find({
			$or: [
				{ name: { $regex: query, $options: "i" } },
				{ username: { $regex: query, $options: "i" } },
			],
		}).select("-secret -password");
		//console.log(user);
		res.json(user);
	} catch (error) {
		console.log(error.message);
	}
};
