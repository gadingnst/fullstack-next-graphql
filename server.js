global.__basedir = __dirname

require('dotenv').config()
require('./backend')()