import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    users: [User!]

    user (id:ID!): User
  }

  extend type Mutation {
    createUser(username: String!, email: String!, file: Upload): User!

    updateUser (id: ID!, username: String, email: String, file: Upload ): User
    
    deleteUser (id:ID!): Boolean
  }

  type User {
    id: ID!
    username: String
    email: String
    avatarUrl: String
    createdAt: Date
  }
`
