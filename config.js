const config = {
  appConfig: {
    appHost: process.env.APP_HOST,
    appProtocol: process.env.APP_PROTOCOL,
    appPort: process.env.APP_PORT,
    appDirStorage: process.env.APP_DIR_STORAGE
  },
  dbConfig: {
    dbHost: process.env.DB_NAME,
    dbName: process.env.DB_HOST,
    dbPort:process.env.DB_PORT
  }
};

module.exports = config;