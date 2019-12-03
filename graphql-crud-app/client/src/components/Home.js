import React from 'react'
import { Query } from 'react-apollo'
import { GET_USERS } from '../queries'

// Importing Components
import  User from './User'
import  CreateUserForm  from './CreateUserForm'
import Loader from './Loader'

const Home = () => (
  <div className='container'>
    <h3 className='center'>A SIMPLE GRAPHQL, REACT AND NODE.JS CRUD APP</h3>
    <CreateUserForm/>
    <div className='row'>
      <Query query={GET_USERS}>
        {({ loading, error, data }) => {
          if (loading) return <Loader/>

          if (error) return <h1 className='center'>SOMETHING WENT WRONG, PLEASE TRY AGAIN</h1>

          const { users } = data

          return users.map(user => (<User key={user.id} user={user} />))
        }}
      </Query>
    </div>
  </div>
)

export default Home
