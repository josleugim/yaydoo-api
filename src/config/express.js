'use strict';

const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = app => {
    app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
    app.use(bodyParser.json());
    app.use(cors({
        origin: '*',
        optionsSuccessStatus: 200
    }));
}
