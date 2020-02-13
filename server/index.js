import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import next from './next'
import schema from './schemas'

const port = process.env.PORT || 3000
const handle = next.getRequestHandler()
const app = express()

const Apollo = new ApolloServer({
    introspection: true,
    playground: true,
    schema
})

module.exports = async () => {
    await next.prepare()
    
    // express middlewares
    app.use(express.json())

    // apollo middlewares
    Apollo.applyMiddleware({ app, path: '/graphql' })
    
    // ALWAYS keep this middleware as the last route
    app.all('*', (req, res) => handle(req, res))
    
    app.listen(port, err => {
        if (err) throw err
        console.log(`> Server running on http://localhost:${port}`)
        console.log(`> GraphQL ready on http://localhost:${port}/graphql`)
    })
}
