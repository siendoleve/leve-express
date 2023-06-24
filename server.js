require('dotenv').config();
const app = require('./app');
const { db } = require('./database/config');
const initModel = require('./models/init.model');

db.authenticate()
  .then(() => console.log('Database Authenticated! 😼'))
  .catch(error => console.log(error));

initModel();

//LA SINCRONIZACIÓN CON LA BASE DE DATOS
db.sync()
  .then(() => console.log('Database Synced! 🤩'))
  .catch(error => console.log(error));

const port = +process.env.PORT || 3100;

app.listen(port, () => {
  console.log(`App Running on port ${port}`);
});
