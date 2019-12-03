import gql from 'graphql-tag'


// CREATE USER
const CREATE_USER = gql`
  mutation createUser($email: String!, $username: String!, $file: Upload){
    createUser(email: $email, username: $username, file: $file){
      id
      username
      email
      avatarUrl
      createdAt
    }
  }
`

// CREATE USER
const UPDATE_USER = gql`
  mutation updateUser($id: ID!,$email: String!, $username: String!, $file: Upload){
    updateUser(id: $id, email: $email, username: $username, file: $file){
      id
      username
      email
      avatarUrl
      createdAt
    }
  }
`

// DELETE USER
const DELETE_USER = gql`
  mutation deleteUser($id: ID!){
    deleteUser(id: $id)
  }
`

// GET USERS
const GET_USERS = gql`{ 
  users{
    id
    username
    email
    avatarUrl
    createdAt
  }
}`

export {
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER
}
