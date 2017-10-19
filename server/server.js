let express = require('express');
let app = express();
let api = require('./api/api');
let err = require('./middleware/error')

let setUpMiddleware = require('./middleware/appMiddleware');
setUpMiddleware(app);

app.use('/api', api );
app.use(err());

module.exports = app;

