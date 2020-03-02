import { gql } from 'apollo-server-express'

export default gql`
    type User {
        id: ID
        name: String
        email: String
    }

    extend type Query {
        users(name: String): [User]
        user(id: ID!): User
    }

    extend type Mutation {
        addUser(
            name: String!
            email: String!
        ): User

        editUser(
            id: ID!
            name: String
            email: String
        ): User
        
        deleteUser(
            id: ID!
        ): User
    }
`
