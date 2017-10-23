let express = require('express');
let app = express();
let api = require('./api/api');
let err = require('./middleware/error');
let config = require('./config/config');
let mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/blog-api');
mongoose.connect(config.db.url);

let setUpMiddleware = require('./middleware/appMiddleware');
setUpMiddleware(app);

app.use('/api', api );
app.use(err());

module.exports = app;

