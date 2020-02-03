require('dotenv').config();
const bodyParser      = require('body-parser');
const mongoose        = require('mongoose');
const cors            = require('cors');
const routerProducts  = require('./routes/product');
const express         = require('express');
const app             = express();
const { appConfig,
        dbConfig }    = require('../config');

const DB_PATH = `mongodb://${appConfig.appHost}:${dbConfig.dbPort}/${dbConfig.dbName}`;

// Docker container DB_PATH
// const DB_PATH = `mongodb://${dbConfig.dbHost}:${dbConfig.dbPort}/${dbConfig.dbName}`;

app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/uploads', express.static(`uploads`));

const PORT = appConfig.appPort;

mongoose.connect(DB_PATH, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to Database...');
}).catch(error => console.log('Error connecting to Database: ', error));

const dbConnection = mongoose.connection;

if (dbConnection)
  console.log('Connection created successfully to Database.');
else
  console.log('Error to create connection to Database.');

app.use('/api', routerProducts);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`ProductsCRUD Server listening on Port ${PORT}`)
});
