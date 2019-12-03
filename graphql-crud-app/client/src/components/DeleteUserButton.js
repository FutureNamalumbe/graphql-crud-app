import React from 'react'
import { Mutation } from 'react-apollo'
import { DELETE_USER } from '../queries'

const DeleteUserButton = ({ id, setDeleteUser }) => (
    <Mutation mutation={DELETE_USER} onCompleted={() => setDeleteUser(true)}>
        {(deleteUser) =>
            <button
                style={{ margin: '0.5rem 0 0.5rem 0' }}
                className='btn red'
                onClick={() => deleteUser({ variables: { id } })}
            >
                Delete <i className='material-icons left'>delete_forever</i>
            </button>
        }
    </Mutation>
)

export default DeleteUserButton