# Aqua SQL

A website and user system starter based on the fabulous [Aqua](https://jedireza.github.io/aqua/).

The code has been modified to persist data to an SQL datasource via [Sequelize](http://docs.sequelizejs.com/)

This is work in progress.

There will be mistakes.  There will be Promises mixed with callbacks.  There will be common
Node conventions that I missed.

All feedback is welcome.

Finally a huge thank you to [Reza Akhava](https://twitter.com/jedireza) for [Aqua](https://jedireza.github.io/aqua/).


[![Build Status](https://travis-ci.org/jimlowrey/aqua-sql.svg?branch=master)](https://travis-ci.org/jimlowrey/aqua-sql)
[![Dependency Status](https://david-dm.org/jimlowrey/aqua-sql.svg?style=flat)](https://david-dm.org/jimlowrey/aqua-sql)
[![devDependency Status](https://david-dm.org/jimlowrey/aqua-sql/dev-status.svg?style=flat)](https://david-dm.org/jimlowrey/aqua-sql#info=devDependencies)


## Features

 - Basic front end web pages (home, about)
 - Contact page with form that emails submissions
 - Account sign-up page
 - Login system with forgot password and reset password
 - Abusive login attempt detection
 - User roles for accounts and admins
 - Admins only notes and status history for accounts
 - Admin groups with shared permissions
 - Admin level permissions that override group permissions


## Technology

Server side, Aqua is built with the [hapi](https://hapijs.com/) framework.
We support multiple SQL databases:

- [Postgres](https://www.postgresql.org/)
- [MySQL](https://www.mysql.com/)
- [MariaDB](https://mariadb.org/)
- [SQLite](https://www.sqlite.org/) *Work in Progress*

The front-end is built with [React](https://github.com/facebook/react). We use
[Redux](https://github.com/reactjs/redux) as our state container. Client side
routing is done with [React Router](https://github.com/reactjs/react-router).
We're using [Gulp](http://gulpjs.com/) for the build system.


## API only

If you don't use React and/or would rather bring your own front-end, checkout
[Frame](https://github.com/jedireza/frame). It's just the HTTP API parts of Aqua.


## Live demo

| url                                                              | username | password |
|:---------------------------------------------------------------- |:-------- |:-------- |
| [https://aqua-sql.herokuapp.com/](https://aqua-sql.herokuapp.com/) | root     | root     |


## Requirements

You need [Node.js](http://nodejs.org/download/) installed and you'll need and
Open Source SQL database installed and running.

We use [`bcrypt`](https://github.com/ncb000gt/node.bcrypt.js) for hashing
secrets. If you have issues during installation related to `bcrypt` then [refer
to this wiki
page](https://github.com/jedireza/aqua/wiki/bcrypt-Installation-Trouble).


## Installation

```bash
$ git clone git@github.com:jimlowrey/aqua-sql.git
$ cd aqua-sql
$ npm install
```

## Postgres Installation

Paste the following into PSQL console.  The passwords will both be test.
```sql
CREATE ROLE aqua LOGIN
  ENCRYPTED PASSWORD 'md5febfd8a9585cddd9e4577010f18a0a5c'
  NOSUPERUSER INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION CONNECTION LIMIT 100;

CREATE DATABASE aqua
  WITH OWNER = aqua
       ENCODING = 'UTF8'
       TABLESPACE = pg_default
       LC_COLLATE = 'C'
       LC_CTYPE = 'C'
       CONNECTION LIMIT = -1;

CREATE ROLE aqua_test LOGIN
  ENCRYPTED PASSWORD 'md512d23bb09f295a82e5a316755dfdc0ca'
  NOSUPERUSER INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION CONNECTION LIMIT 100;

CREATE DATABASE aqua_test
  WITH OWNER = aqua_test
       ENCODING = 'UTF8'
       TABLESPACE = pg_default
       LC_COLLATE = 'C'
       LC_CTYPE = 'C'
       CONNECTION LIMIT = -1;
```

## MySQL/MariaDB Installation

```
CREATE DATABASE aqua character set utf8mb4 collate utf8mb4_general_ci;
CREATE DATABASE aqua_test character set utf8mb4 collate utf8mb4_general_ci;

CREATE USER 'deploy'@'localhost' IDENTIFIED BY '...';
GRANT ALL PRIVILEGES on aqua . * to 'deploy'@'localhost';
GRANT ALL PRIVILEGES on aqua_test . * to 'deploy'@'localhost';
flush privileges;
```

## Configuration

Copy `sample.config.js` to `config.js` and edit to include your database and
other credentials. The configuration uses
[`confidence`](https://github.com/hapijs/confidence) which makes it easy to
manage configuration settings across environments. __Don't commit `config.js`
to your repository.__

We use [`dotenv`](https://github.com/motdotla/dotenv) to help make setting local
environment variables easy (not to be used in production).

Simply copy `.env-sample` to `.env` and edit as needed. __Don't commit `.env`
to your repository.__


## First time setup

__WARNING__: This will clear all data in the following SQL Tables if
they exist: `accounts`, `admin_groups`, `admins`, `auth_attempts`, `sessions`,
`statuses`, and `users`.

```bash
$ npm run first-time-setup

# > aqua@0.0.0 first-time-setup /home/jedireza/projects/aqua
# > node first-time-setup.js

# Root user email: jedireza@gmail.com
# Root user password:
# ...
# Setup complete.
```


## Running the app

```bash
$ npm start

# > aqua@0.0.0 start /Users/jedireza/projects/aqua
# > gulp react && gulp

# [23:41:44] Using gulpfile ~/projects/aqua/gulpfile.js
# ...
```

Now you should be able to point your browser to http://127.0.0.1:8000/ and see
the welcome page.

[`nodemon`](https://github.com/remy/nodemon) watches for changes in server code
and restarts the app automatically. [`gulp`](https://github.com/gulpjs/gulp) and
[`webpack`](https://github.com/webpack/webpack) watch the front-end files and
re-build those automatically too.

We also pass the `--inspect` flag to Node so you have a debugger available.
Watch the output of `$ npm start` and look for the debugging URL and open it in
Chrome. It looks something like this:

`chrome-devtools://devtools/remote/serve_file/@62cd277117e6f8ec53e31b1be58290a6f7ab42ef/inspector.html?experiments=true&v8only=true&ws=localhost:9229/node`


## Running in production

```bash
$ node server.js
```

Unlike `$ npm start` this doesn't watch for file changes. Also be sure to set
these environment variables in your production environment:

 - `NODE_ENV=production` - This is important for many different optimizations,
   both server-side and with the front-end build files.
 - `NPM_CONFIG_PRODUCTION=false` - This tells `$ npm install` to not skip
   installing `devDependencies`, which we need to build the front-end files.


## Have a question?

Any issues or questions (no matter how basic), open an issue. Please take the
initiative to read relevant documentation and be pro-active with debugging.


## Want to contribute?

Contributions are welcome. If you're changing something non-trivial, you may
want to submit an issue before creating a large pull request.


## Running tests

[Lab](https://github.com/hapijs/lab) is part of the hapi ecosystem and what we
use to write all of our tests.

Tests have been adapted from the original tests to suit Sequelize and Hapi-Sequelize.
Some of the originals no longer apply.  Some more need to be added.

```bash
$ npm test

# > aqua@0.0.0 test /Users/jedireza/projects/aqua
# > lab -t 100 -S -T ./test/lab/transform -L --lint-options '{"extensions":[".js",".jsx"]}' ./test/lab/client-before.js ./test/client/ ./test/lab/client-after.js ./test/server/ ./test/lab/server-after.js ./test/misc/

#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ...............

# 865 tests complete
# Test duration: 6382 ms
# No global variable leaks detected
# Coverage: 96.47%
# Linting results: No issues
```


## License

MIT


## Don't forget

What you build with Aqua is more important than Aqua.
