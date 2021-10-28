import argon2 from "argon2";
import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import Post from "../models/post.models.js";
import { registerValidation } from "../validations/registerValidation.js";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user)
      return res.json({ status: "FAILED", message: "User doesn't exist" });

    const valid = await argon2.verify(user.password, password);

    if (!valid)
      return res.json({ status: "FAILED", message: "Invalid credentials" });

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({
      status: "SUCCESS",
      message: "Log in successful",
      result: { id: user._id, user: user.username },
      token,
    });
  } catch (error) {
    res.json({ status: "FAILED", message: "Error during log in." });
  }
};

export const signup = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  try {
    const user = await User.findOne({ username });

    const errors = registerValidation(
      user,
      username,
      email,
      password,
      confirmPassword,
      res
    );

    if (errors) {
      return { errors };
    }

    if (password.length > 5 && password === confirmPassword) {
      const hashedPassword = await argon2.hash(password);

      const result = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      const token = jwt.sign(
        { email: result.email, id: result._id },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.json({
        status: "SUCCESS",
        message: "Sign up successful",
        result: { id: result._id, user: result.username },
        token,
      });
    }
  } catch (error) {
    res.json({ status: "FAILED", message: "Error during sign up" });
  }
};

export const userProfile = async (req, res) => {
  const { user } = req.params;

  try {
    const getUsername = await User.find({ username: user });

    const posts = await Post.find({ username: user }).sort("-createdAt");

    const filteredCountry = await Post.find({ username: user }).distinct(
      "country"
    );

    res.status(200).json({
      posts,
      filteredCountry,
      username: getUsername[0].username,
    });
  } catch (error) {
    res.status(404).json(error);
  }
};
