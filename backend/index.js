const http = require('http')
const express = require('express')
const logger = require('morgan')
const { ApolloServer } = require('apollo-server-express')
const next = require('./next')
const resolvers = require('./resolvers')
const typeDefs = require('./schemas')

const port = process.env.PORT || 3000
const handle = next.getRequestHandler()

module.exports = async () => {
    await next.prepare()

    const app = express()
    const server = http.createServer(app)
    
    const Apollo = new ApolloServer({
        introspection: true,
        playground: true,
        typeDefs,
        resolvers
    })
    
    app.use(express.json())
    app.use(logger('dev'))

    Apollo.applyMiddleware({ app, path: '/graphql' })
    Apollo.installSubscriptionHandlers(server)
    
    // ALWAYS keep this middleware as the last route
    app.all('*', (req, res) => handle(req, res))
    
    server.listen(port, err => {
        if (err) throw err
        console.log(`> Server running on http://localhost:${port}`)
        console.log(`> GraphQL ready on http://localhost:${port}/graphql`)
    })
}
