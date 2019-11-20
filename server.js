global.__basedir = __dirname

const http = require('http')
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const logger = require('morgan')
const next = require('./backend/next')
const resolvers = require('./backend/resolvers')
const typeDefs = require('./backend/schemas')

const port = process.env.PORT || 3000
const handle = next.getRequestHandler()

next.prepare().then(() => {
  const app = express()
  const server = http.createServer(app)
  const GraphQLServer = new ApolloServer({
    introspection: true,
    playground: true,
    typeDefs,
    resolvers
  })

  GraphQLServer.applyMiddleware({ app, path: '/graphql' })
  GraphQLServer.installSubscriptionHandlers(server)

  app.use(express.json())
  app.use(logger('dev'))

  // ALWAYS keep this middleware as the last route
  app.all('*', (req, res) => handle(req, res))

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Server running on http://localhost:${port}`)
    console.log(`> GraphQL ready on http://localhost:${port}/graphql`)
  })
})
