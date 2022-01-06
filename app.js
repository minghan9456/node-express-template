global.__base = __dirname;

require('dotenv').config({ path: `${global.__base}/.env` });
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

require('./routes/index.js')(app);

app.listen(process.env.PORT, () => {
  console.log('listening on *:' + process.env.PORT);
});

module.exports = app;

