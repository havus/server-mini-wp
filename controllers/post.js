const Post = require('../models/post');
const User = require('../models/user');

class PostController {
  static findAll(req, res, next) {
    Post.find({ user_id: req.payload._id })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      next({
        code: 500,
        msg: err.message
      })
    })
  }

  static create(req, res, next) {
    const {title, content} = req.body;
    if (!title || !content) {
      next({
        code: 400,
        msg: "must contain letter"
      })
    }
    Post.create({
      user_id: req.payload._id,
      author: req.payload.full_name,
      title, content
    })
    .then(data => {
      res.status(201).json({ msg: "Published!" });
    })
    .catch(err => {
      next({
        code: 500,
        msg: err.message
      })
    })
  }

  static findOne(req, res, next) {
    Post.findOne({
      _id: req.params.id
    })
    .then(one => {
      if (one) {
        res.status(200).json(one);
      } else {
        next({
          code: 404,
          msg: 'not found'
        })
      }
    })
    .catch(err => {
      next({
        code: 500,
        msg: err.message
      })
    })
  }

  static update(req, res, next) {
    Post.findOneAndUpdate({ _id: req.params.id }, {
      title: req.body.title,
      content: req.body.content
    }, { new: true })
    .then(response => {
      res.status(200).json({ msg: 'updated!' })
    })
    .catch(err => {
      next({
        code: 500,
        msg: err.message
      })
    })
  }

  static delete(req, res, next) {
    console.log(req.params.id);
    Post.findOneAndDelete({ _id: req.params.id })
    .then(response => {
      res.status(200).json({ msg: 'deleted!' })
    })
    .catch(err => {
      next({
        code: 500,
        msg: err.message
      })
    })
  }
}

module.exports = PostController;