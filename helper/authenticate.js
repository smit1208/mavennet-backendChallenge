const jwt = require('jsonwebtoken');

// function to authenticate the user
var authenticate = function (req, res, next) {

  if (typeof req.headers.authorization !== "undefined") {

    let token = req.headers.authorization.split(" ")[1];
    
    jwt.verify(token, 'MAVENNETSECRETKEY', (err, user) => {

      if (err) {
        res.status(500).json({ error: "Not Authorized" });
      }
      req.user = user;
      return next();
    });
  } else {
    res.status(500).json({ error: "Not Authorized" });

  }
}

module.exports = authenticate;