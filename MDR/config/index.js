var dotenv = require('dotenv');

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Could not find a .env file!");
}

module.exports = {

  port: parseInt(process.env.PORT, 10),
  databaseURL: process.env.DB_CONNECT,
  ip_test: process.env.IP_TEST,
  source : process.env.SOURCE,
  acess_key : process.env.ACESS_KEY,
  service : process.env.SERVICE,
  subject : process.env.SUBJECT,
  content : process.env.CONTENT

};