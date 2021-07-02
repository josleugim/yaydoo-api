'use strict';

const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = app => {
    app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
    app.use(bodyParser.json());
    app.use(cors({
        origin: 'https://team-dot-yaydoo-nextjs.uw.r.appspot.com',
        optionsSuccessStatus: 200
    }));
}
