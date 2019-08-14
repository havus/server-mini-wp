const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  full_name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'email required!'],
    unique: [true, 'email must unique'],
    validate: [(v) => {
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
    }, 'email not valid']
  },
  password: {
    type: String,
  },
  profile_pic: {
    type: String,
  }
}, { timestamps: true, versionKey: false });

const User = mongoose.model('User', userSchema);

module.exports = User;