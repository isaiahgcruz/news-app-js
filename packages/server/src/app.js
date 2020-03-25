const express = require('express');
const router = require('./router');

const app = express();
const PORT = 3001;

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT}`);
});
