const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../api/secrets.js');

const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if(token) {
    jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
      if(err) {
        // the token IS NOT valid
        res.status(401).json({ message: 'Invalid Credentials' });
      } else {
        // token IS valid
        req.decodedJwt = decodedToken; /*- middleware can make the info available to the rest of the application. */

        next();
      }
    })
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};
