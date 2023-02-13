const models = require("../Models/index");
const { QueryTypes } = require("sequelize");
models.sequelizeInstance.sync();
const sequelizeInstance = models.sequelizeInstance;

const registerHelperDB = async (helperData) => {
  console.log(helperData);
  const reg_date = new Date().toUTCString();
  try {
    await sequelizeInstance.query(
      `
        INSERT INTO helper_details
        ( email_id, phone_no, password, first_name, last_name, gender, dob, address, state, country, pincode, reg_date )
        VALUES
        ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12 )
      `,
      {
        bind: [
          helperData.email_id,
          helperData.phone_no,
          helperData.password,
          helperData.first_name,
          helperData.last_name,
          helperData.gender,
          helperData.dob,
          helperData.address,
          helperData.state,
          helperData.country,
          helperData.pincode,
          reg_date,
        ],
        type: QueryTypes.INSERT,
      }
    );
  } catch (error) {
    return Promise.reject(new Error(error));
  }
};

const loginHelperDB = async (email) => {
  const existingHelper = await sequelizeInstance.query(
    `
      SELECT password
      FROM helper_details
      WHERE email_id = $1
    `,
    {
      bind: [email],
      type: QueryTypes.SELECT,
    }
  );
  return existingHelper;
};

const validHelperDB = async (helperData) => {
  const existingHelperCount = await sequelizeInstance.query(
    `
      SELECT COUNT(*)
      FROM helper_details
      WHERE email_id = $1 OR phone_no = $2
    `,
    {
      bind: [helperData.email_id, helperData.phone_no],
      type: QueryTypes.SELECT,
    }
  );
  return existingHelperCount[0].count;
};

const getHelperDetailsDB = async (email) => {
  return await sequelizeInstance.query(
    `
      SELECT email_id, phone_no, first_name, last_name, gender, dob, address, state, country, pincode
      FROM helper_details
      WHERE email_id = $1
    `,
    {
      bind: [email],
      type: QueryTypes.SELECT,
    }
  );
};

module.exports = {
  registerHelperDB,
  validHelperDB,
  loginHelperDB,
  getHelperDetailsDB,
};
