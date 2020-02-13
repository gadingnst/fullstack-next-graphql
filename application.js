require = require('esm')(module)
global.__basedir = __dirname

require('dotenv').config()
require('./server')()