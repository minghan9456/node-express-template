const { handleError } = require(`${global.__base}/middlewares/errors`);
const jwt = require(`${global.__base}/middlewares/jwt`);

module.exports = (app) => {
  /*
   * API routes.
   */

  // JWT verification middlewares.
  app.use('/', async (req, res, next) => {
    await jwt(req, res, next);
    next();
  });

  /*
   * For Health check.
   */
  app.use('/healthcheck', require(`${global.__base}/routes/api/healthcheck`));


  // Add new routes if need.

  /*
   * errors handling middlewares.
   */
  app.use((err, req, res, next) => {
    handleError(err, res);
  });
};

