const { QueryTypes } = require("sequelize");
const models = require("../Models/index");
models.sequelizeInstance.sync();
const sequelizeInstance = models.sequelizeInstance;

const searchHelpersInDb = async (name) => {
  try {
    const responseDB = await sequelizeInstance.query(
      `
        SELECT email_id, phone_no, first_name, last_name, state, country
        FROM helper_details
        WHERE CONCAT(first_name, ' ', last_name) LIKE '${name}%'
      `,
      {
        type: QueryTypes.SELECT,
      }
    );
    return responseDB;
  } catch (error) {
    return Promise.reject(new Error(error));
  }
};

const getTrustListDb = async (email) => {
  try {
    const responseDB = await sequelizeInstance.query(
      `
        SELECT email_id, first_name, last_name
        FROM helper_details
        WHERE email_id IN (
          SELECT confidant as email_id
          FROM trust_list
          WHERE "user" = $1
        )
      `,
      {
        bind: [email],
        type: QueryTypes.SELECT,
      }
    );
    return responseDB;
  } catch (error) {
    return Promise.reject(new Error(error));
  }
};

const addConfidantToTrustListDB = async (data) => {
  try {
    await sequelizeInstance.query(
      `
        INSERT INTO trust_list
        (user, confidant)
        VALUES
        ($1, $2)
      `,
      {
        bind: [data.user, data.confidant],
        type: QueryTypes.INSERT,
      }
    );
  } catch (error) {
    return Promise.reject(new Error(error));
  }
};

module.exports = {
  searchHelpersInDb,
  getTrustListDb,
  addConfidantToTrustListDB,
};
