import mongoose from "mongoose";
import geocoder from "../utils/geocoder.js";
import { getCountryNameByIso } from "../utils/get-country-names.js";

const postSchema = new mongoose.Schema({
  creator: String,
  username: String,
  location: String,
  caption: String,
  country: String,
  coordinates: { type: [Number] },
  selectedFile: String,
  comments: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

postSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.location);
  this.coordinates = [loc[0].longitude, loc[0].latitude];
  const countryCode = loc[0].countryCode;
  this.country = getCountryNameByIso(countryCode);

  next();
});

const Post = mongoose.model("Post", postSchema);

export default Post;
