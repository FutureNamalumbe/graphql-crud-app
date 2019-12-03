import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import { CREATE_USER, GET_USERS } from '../queries'

const CreateUserForm = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [file, setFile] = useState('')
    const [displayForm, setdisplayForm] = useState(false)

    const handleFileChange = ({ target: { files: [file] } }) => setFile(file)

    const handleSubmit = (e, createUser) => {
        e.preventDefault()

        createUser({ variables: { username, email, file } })

        setUsername('')
        setEmail('')
    }


    return displayForm ? (
        <Mutation
            mutation={CREATE_USER}
            update={(cache, { data }) => {
                const { users } = cache.readQuery({ query: GET_USERS })
                cache.writeQuery({
                    query: GET_USERS,
                    data: { users: [data.createUser, ...users] }
                })
            }}
            onCompleted={() => setdisplayForm(false)}
        >
            {(createUser, { loading, error }) => (
                <div className='row'>
                    <div className='col s12'>
                        <div className='row'>
                            <form
                                className='col s12 deep-purple lighten-5'
                                onSubmit={e => handleSubmit(e, createUser)}
                            >

                                {loading && (
                                    <div className='progress'>
                                        Loading...
                                                <div className='indeterminate'></div>
                                    </div>
                                )}

                                {error && console.log(error)}

                                <div className='row'>
                                    <div className='input-field col l6 m12 s12'>
                                        <i className='material-icons prefix'>account_box</i>
                                        <input
                                            className='validate'
                                            type='text'
                                            id='username'
                                            value={username}
                                            required
                                            onChange={e => setUsername(e.target.value)}
                                        />
                                        <label htmlFor='username'>Username</label>
                                    </div>

                                    <div className='input-field col l6 m12 s12'>
                                        <i className='material-icons prefix'>email</i>
                                        <input
                                            className='validate'
                                            type='email'
                                            id='email'
                                            value={email}
                                            required
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                        <label htmlFor='email'>Email</label>
                                    </div>

                                    <div className='file-field input-field col s12'>
                                        <div className='btn grey darken-3'>
                                            <i style={{ fontSize: '2.4rem' }} className='material-icons center'>add_a_photo</i>
                                            <input type='file' onChange={e => handleFileChange(e)} />
                                        </div>
                                        <div className='file-path-wrapper'>
                                            <input className='file-path validate' type='text' placeholder='UPLOAD USER PHOTO' />
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='input-field col s12'>
                                        <button className='btn col s12'>
                                            Submit
                                                </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </Mutation>

    )
    :
    (
        <div className='row'>
            <div className='col s12'>
                <button className='btn' onClick={() => setdisplayForm(true)}>
                    Add User
            </button>
            </div>
        </div>
    )
}

export default CreateUserForm
