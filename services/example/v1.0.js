const Sequelize = require('sequelize');
const errors = require(`${global.__base}/middlewares/errors`);
const MySqlDb = require(`${global.__base}/databases/mySqlDb`);
const ExampleModel = MySqlDb.importModel(
  `${global.__base}/models/example`
);
const moment = require('moment-timezone');
moment.tz.setDefault('Etc/Greenwich');

/**
 * ExampleService class.
 */
class ExampleService {
  /**
   * ExampleService constructor.
   */
  constructor() {}
  /**
   * api resp transform.
   * @param {obj} err .
   */
  errorHandle(err) {
    console.error(err);
    if (err instanceof Sequelize.UniqueConstraintError) {
      throw new errors.Conflict();
    } else if (err instanceof Sequelize.ForeignKeyConstraintError) {
      throw new errors.Forbidden();
    }

    throw new errors.InternalServerError();
  }

  /**
   * get customer by id.
   * @param {string} customerId .
   */
  async getOneById(customerId) {
    const row = await ExampleModel.findOne({
      where: {
        id: customerId,
      },
      order: [['id', 'ASC']],
    });

    return row;
  }

  /**
   * create new customer.
   * @param {object} insertData .
   * @param {object} file .
   */
  async create(insertData) {
    const nowTs = moment().toISOString();

    insertData.created_at = nowTs;
    insertData.updated_at = nowTs;

    const customerInstance = await ExampleModel.create(insertData).catch(
      this.errorHandle
    );
    const customer = customerInstance.get({});

    return customer;
  }
}

module.exports = ExampleService;
