const dotenv = require("dotenv");

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
  /**
   * App Configuration
   */
  app: {
    name: process.env.APP_NAME,
    port: parseInt(process.env.PORT, 10) || 5000,
  },

  /**
   * Display Configuration
   */
  display: {
    limits: 15,
  },

  /**
   * Mongoose Configuration
   */
  mongoDB: {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT || 27017,
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    database: process.env.MONGO_DATABASE,
  },


  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },

  /**
   * API configs
   */
  api: {
    prefix: process.env.ROUTE_PREFIX,
    allowed_access: process.env.ALLOWED_ACCESS_ENDPOINT || "https://eclis.id/oauth/allowed-access",
    system_domain: process.env.SYSTEM_DOMAIN_ENDPOINT || "https://eclis.id/oauth/system-domain",
  },
};
