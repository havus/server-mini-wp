const User = require('../models/user');
const { hashPassword, comparePassword} = require('../helper/bcryptjs');
const { jwtHash, jwtVerify } = require('../helper/jwt');

class UserController {
  static getProfile(req, res, next) {
    User.findOne({ _id: req.payload._id })
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

  static register(req, res, next) {
    let {full_name, email, password} = req.body;
    User.findOne({ email })
    .then(one => {
      if (one) {
        next({
          code: 404,
          msg: 'email already exist'
        })
      } else {
        if (password.length < 7) {
          next({
            code: 404,
            msg: 'password must contain 6 character'
          })
        }
        password = hashPassword(password);
        return User.create({ full_name, email, password });
      }
    })
    .then(() => {
      res.status(201).json({ message: "Created!" });
    })
    .catch(err => {
      next({
        code: 500,
        msg: err.message
      })
    });
  }

  static login(req, res, next) {
    console.log('login');
    let {email, password} = req.body;
    User.findOne({ email })
    .then(one => {
      if (one) {
        if (comparePassword(password, one.password)) {
          let obj = { _id: one._id, full_name: one.full_name, email };
          res.status(200).json({ token: jwtHash(obj) });
        } else {
          next({
            code: 401,
            msg: 'wrong username / email!'
          })
        }
      } else {
        next({
          code: 401,
          msg: 'wrong username / email!'
        })
      }
    })
    .catch(err => {
      next({
        code: 500,
        msg: err.message
      })
    });
  }
}

module.exports = UserController;