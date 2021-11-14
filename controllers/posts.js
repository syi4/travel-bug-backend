import Post from "../models/post.js";
import mongoose from "mongoose";

export const getPostsHandler = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 4;
    const startIndex = (Number(page) - 1) * LIMIT;

    const totalPosts = await Post.countDocuments({});

    const posts = await Post.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    const countPostsByUser = await Post.aggregate([
      { $group: { _id: "$username", total: { $sum: 1 } } },
      { $sort: { total: -1 } },
    ]).limit(3);

    const sameTravelByCountry = await Post.aggregate([
      {
        $group: {
          _id: "$country",
          users: { $addToSet: "$username" },
        },
      },
    ]);

    res.json({ posts, sameTravelByCountry, countPostsByUser, totalPosts });
  } catch (error) {
    res.status(404).json(error);
  }
};

export const createPostHandler = async (req, res) => {
  const post = req.body;

  const newPost = new Post({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();

    res.json({ status: "SUCCESS", message: "Post Created", newPost });
  } catch (error) {
    res.json({ status: "FAILED", message: "Error creating post" });
  }
};

export const deletePostHandler = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await Post.findByIdAndRemove(id);

  res.json({ message: "Post deleted" });
};

export const commentPostHandler = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  const post = await Post.findById(id);

  post.comments.push(value);

  const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

  res.json(updatedPost);
};
