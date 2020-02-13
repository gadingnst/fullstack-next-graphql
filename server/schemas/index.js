import { readdirSync } from 'fs'
import { makeExecutableSchema } from 'graphql-tools'
import { gql } from 'apollo-server-express'
import { deepMerge } from '../../utils/helpers'

const RootTypes = gql`
    type Query {
        _empty: String
    }

    type Mutation {
        _empty: String
    }
`

const schemas = readdirSync(__dirname)
    .reduce((acc, curr) => {
        if (curr !== 'index.js') {
            acc.push(require(`./${curr.replace(/\.js/g, '')}`))
        }
        return acc
    }, [])

export default makeExecutableSchema({
    typeDefs: [RootTypes, ...schemas.map(({ typeDefs }) => typeDefs)],
    resolvers: deepMerge(...schemas.map(({ resolvers }) => resolvers))
})