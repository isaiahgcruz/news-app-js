require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./router');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use('/', router);

app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT}`);
});
