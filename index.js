let config = require('./server/config/config.js');
let app = require('./server/server');


app.listen(config.port);
console.log('listening on http://loacast:' + config.port)