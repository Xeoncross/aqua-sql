'use strict';
const Sequelize = require('sequelize');
const Config = require('./config');

const db = Config.get('/db');

let sequelize = null;

if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: db.dialect,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    });
}
else {
    sequelize = new Sequelize(db.database, db.username, db.password, {
        host: db.host,
        dialect: db.dialect,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    });
}

exports.register = function (server, options, next) {
    server.register(
        [
            {
                register: require('hapi-sequelize'),
                options: [
                    {
                        name: 'aqua',
                        models: ['./server/models/**/*.js'],
                        sequelize, // sequelize instance
                        sync: true, // sync models - default false
                        forceSync: false //, // force sync (drops tables) - default false
                    }
                ]
            }
        ],
        next
    );
};

exports.register.attributes = {
    name: 'dbconfig'
};

// Sequelize DB instance
exports.sequelize = sequelize;
