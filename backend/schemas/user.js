const { gql } = require('apollo-server-express')

module.exports = gql`
    type User {
        id: ID
        name: String
        email: String
    }

    type Query {
        users: [User]
        user(id: ID): User
    }

    type Mutation {
        addUser(name: String, email: String): User
    }
`
