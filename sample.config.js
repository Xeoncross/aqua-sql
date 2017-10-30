'use strict';
const Confidence = require('confidence');
const Dotenv = require('dotenv');

Dotenv.config({ silent: true });

const criteria = {
    env: process.env.NODE_ENV
};

const config = {
    $meta: 'This file configures the Aqua device.',
    projectName: 'Aqua',
    port: {
        web: {
            $filter: 'env',
            test: 9000,
            production: process.env.PORT,
            $default: 8000
        }
    },
    baseUrl: {
        $filter: 'env',
        $meta: 'values should not end in "/"',
        production: 'https://aqua-sql.herokuapp.com',
        $default: 'http://127.0.0.1:8000'
    },
    authAttempts: {
        forIp: 50,
        forIpAndUser: 7
    },
    cookieSecret: {
        $filter: 'env',
        production: '',
        $default: '!k3yb04rdK4tz~4qu4~k3yb04rdd0gz!'
    },
    db: {
        dialect: 'postgres',
        host: 'localhost',
        database: 'aqua',
        username: 'aqua',
        password: ''
    },
    db_test: {
        dialect: 'postgres',
        host: 'localhost',
        database: 'aqua_test',
        username: 'aqua_test',
        password: 'test'
    },
    nodemailer: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'gmail@gmail.com',
            pass: ''
        }
    },
    system: {
        fromAddress: {
            name: 'E-Aqua',
            address: 'gmail@gmail.com'
        },
        toAddress: {
            name: 'E-Aqua',
            address: 'gmail@gmail.com'
        }
    }
};

const store = new Confidence.Store(config);

exports.get = function (key) {
    return store.get(key, criteria);
};

exports.meta = function (key) {
    return store.meta(key, criteria);
};
