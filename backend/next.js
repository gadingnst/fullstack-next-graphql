const next = require('next')
const dev = process.env.NODE_ENV !== 'production'

module.exports = next({ dev, dir: `${__basedir}/frontend` })