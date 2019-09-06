var express = require('express');
var router = express.Router();
var users = require('../models/users');
const jwt = require('jsonwebtoken');

// fetch the list of all the available users
router.get('/', function (req, res, next) {
  var userData = [];
  users.forEach((user) => {
    delete user.password;
    userData.push(user);
  })
  res.json(userData);
});

// route to check whether the user is successfully sign in or not
router.post("/signin", function (req, res, next) {
  var userData = req.body;
  let found = false;
  users.forEach((user) => {
    if (user.username == userData.username && user.password == userData.password) {
      let body = {
        "id": user.userId,
      };
      let token = jwt.sign(body, 'MAVENNETSECRETKEY', { expiresIn: '1h' })
      found = true;
      res.send({ "token": token });
    }
  })
  if (!found) {
    res.send({ "status": 401, "message": "Invalid Credentials" });
  }

});

module.exports = router;
