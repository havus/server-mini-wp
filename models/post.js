const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  "user_id": {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  "title": {
    type: String,
    required: [true, "title required!"]
  },
  "author": {
    type: String,
    required: [true, "author required!"]
  },
  "img_url": String,
  "content": String,
}, { timestamps: true, versionKey: false });

const Post = mongoose.model('Post', userSchema);

module.exports = Post;