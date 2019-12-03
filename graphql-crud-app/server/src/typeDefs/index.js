import { gql } from 'apollo-server-express'
import userSchema from './user'

const rootSchema = gql`
  scalar Upload

  scalar Date

  type Query {
    _: String
  }

  type Mutation {
    _: String
  }

  type Subscription {
    _: String
  }
  
  type File {
    path: String
    filename: String
    mimetype: String
  }
`

export default [
  rootSchema,
  userSchema
]
