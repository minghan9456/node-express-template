const jwt = require('jsonwebtoken');
const errors = require(`${global.__base}/middlewares/errors`);
const constants = require(`${global.__base}/constants`);

const escapedPaths = [
  /^\/healthcheck$/g,
  /^\/healthcheck\/$/g,
];

/**
 * verify JWT.
 * @param {req} req The express request.
 * @param {res} res The express response.
 * @param {function} next error handling function.
 */
const verifyJwt = async (req, res, next) => {
  try {
    let token = null;

    let skipVerification = false;
    escapedPaths.forEach((regex) => {
      if (req.path.match(regex)) {
        skipVerification = true;
      }
    });

    if (!skipVerification) {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
      ) {
        token = req.headers.authorization.split(' ')[1];
      }

      await jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          switch (err.name) {
            case 'TokenExpiredError':
              throw new errors.Unauthorized();
            case 'JsonWebTokenError':
              throw new errors.Unauthorized();
            case 'NotBeforeError':
              throw new errors.Unauthorized();
            default:
              throw new errors.Unauthorized();
          }
        }

        req.jwtPayload = decoded;
      });
    }
  } catch (exception) {
    next(exception);
  }
};

module.exports = verifyJwt;

