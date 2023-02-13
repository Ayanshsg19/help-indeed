const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  port: process.env.PORT,
  dbUser: process.env.PG_USER,
  dbHost: process.env.PG_HOST,
  dbDatabase: process.env.PG_DATABASE,
  dbPassword: process.env.PG_PASSWORD,
  dbPort: process.env.PG_PORT,
  utilityEndpointBaseUrl: process.env.UTILITY_ENDPOINT,
  secretKey: process.env.SECRET_KEY,
};
