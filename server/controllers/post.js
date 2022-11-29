import Post from "../modals/post";
import cloudinary from "cloudinary";
import User from "../modals/user";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});

export const createPost = async (req, res) => {
	const { content, image } = req.body;
	if (!content.length) {
		return res.json({
			error: "Content is required",
		});
	}
	try {
		const post = new Post({ content, image, postedBy: req.auth._id });
		await post.save();
		const postWithUser = await Post.findById(post._id).populate(
			"postedBy",
			"-password -secret"
		);
		res.json(postWithUser);
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};

export const uploadImage = async (req, res) => {
	try {
		const result = await cloudinary.uploader.upload(req.files.image.path);
		//console.log("Uploaded image", result);
		res.json({
			url: result.secure_url,
			public_id: result.public_id,
		});
	} catch (error) {
		console.log(error);
	}
	//console.log(req.files.image.path);
};

export const postsByUser = async (req, res) => {
	try {
		//const posts = await Post.find({ postedBy: req.auth._id })
		const posts = await Post.find()
			.populate("postedBy", "_id name image")
			.sort({ createdAt: -1 })
			.limit(10);
		res.json(posts);
	} catch (error) {
		console.log(error);
	}
};

export const userPost = async (req, res) => {
	try {
		const post = await Post.findById(req.params._id);
		res.json(post);
	} catch (error) {
		console.log(error);
	}
};

export const updatePost = async (req, res) => {
	try {
		const exist = await Post.find();
		//console.log(req.auth._id);
		const post = await Post.findByIdAndUpdate(req.params._id, req.body, {
			new: true,
		});
		res.status(200).json(post);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: error });
	}
};

export const deletePost = async (req, res) => {
	try {
		const post = await Post.findByIdAndDelete(req.params._id);
		if (post.image && post.image.public_id) {
			const image = await cloudinary.uploader.destroy(post.image.public_id);
		}
		res.status(200).json({ success: "Post deleted" });
	} catch (error) {
		res.status(400).json({ error: "Delete post failed" });
		console.log(error);
	}
};

export const newsFeed = async (req, res) => {
	try {
		const user = await User.findById(req.auth._id);
		//console.log(user.following);
		let following = user.following;
		following.push(req.auth._id);
		const posts = await Post.find({ postedBy: { $in: following } })
			.populate("postedBy", "_id name image")
			.populate("comments.postedBy", "_id name image")
			.sort({ createdAt: -1 })
			.limit(10);
		res.json(posts);
	} catch (error) {
		console.log(error);
	}
};

export const likePost = async (req, res) => {
	try {
		const post = await Post.findByIdAndUpdate(
			req.body._id,
			{
				$addToSet: { likes: req.auth._id },
			},
			{ new: true }
		);
		res.json(post);
	} catch (error) {
		res.json({ error: error.message });
	}
};

export const unlikePost = async (req, res) => {
	try {
		const post = await Post.findByIdAndUpdate(
			req.body._id,
			{
				$pull: { likes: req.auth._id },
			},
			{ new: true }
		);
		//console.log(post);
		res.json(post);
	} catch (error) {
		res.json({ error: error.message });
	}
};

export const addComment = async (req, res) => {
	try {
		const { comment, post } = req.body;
		const updatePost = await Post.findByIdAndUpdate(
			post._id,
			{
				$push: { comments: { text: comment, postedBy: req.auth._id } },
			},
			{ new: true }
		)
			.populate("postedBy", "_id name image")
			.populate("comments.postedBy", "_id name image");
		//console.log(updatePost);
		res.json(updatePost);
	} catch (error) {
		console.log(error);
		res.json({ error: error.message });
	}
};

export const removeComment = async (req, res) => {
	//console.log(req.body);
	try {
		const { post, comment } = req.body;
		const removed = await Post.findByIdAndUpdate(
			post._id,
			{ $pull: { comments: { _id: comment._id } } },
			{ new: true }
		);
		//console.log(removed);
		res.json(removed);
	} catch (error) {
		res.json({ error: error.message });
	}
};

export const totalPosts = async (req, res) => {
	try {
		const total = await Post.find().estimatedDocumentCount();
		res.json(total);
	} catch (error) {
		res.json({ error: error.message });
	}
};

export const posts = async (req, res) => {
	try {
		const posts = await Post.find()
			.populate("postedBy", "_id name image")
			.sort({ createdAt: -1 })
			.limit(12);

		res.json(posts);
	} catch (error) {
		res.json({ error: error.message });
	}
};
