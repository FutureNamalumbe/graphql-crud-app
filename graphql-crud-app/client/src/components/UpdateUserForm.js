import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import styled from 'styled-components'
import { UPDATE_USER } from '../queries'

const UpdateUserForm = ({ id, setEditMode, username, email }) => {
    const [usernameUpdate, setUsernameUpdate] = useState('')
    const [emailUpdate, setEmailUpdate] = useState('')
    const [file, setFile] = useState('')

    const handleFileChange = ({ target: { files: [file] } }) => setFile(file)

    const handleSubmit = (e, updateUser) => {
        e.preventDefault()

        updateUser({ variables: { id, username: usernameUpdate, email: emailUpdate, file } })

        setUsernameUpdate('')

        setEmailUpdate('')

        setFile('')
    }


    return (
        <Mutation mutation={UPDATE_USER} onCompleted={() => setEditMode(false)}>
            {(updateUser, { loading, error }) => (
                <form
                    className='col l6 m12 s12 deep-purple lighten-5'
                    onSubmit={e => handleSubmit(e, updateUser)}
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
                            <Input
                                className='validate'
                                type='text'
                                id='usernameUpdate'
                                value={usernameUpdate}
                                onChange={e => setUsernameUpdate(e.target.value)}
                                placeholder={username}
                            />
                            <label className='active' htmlFor='usernameUpdate'>Username</label>
                        </div>

                        <div className='input-field col l6 m12 s12'>
                            <i className='material-icons prefix'>email</i>
                            <Input
                                className='validate'
                                type='email'
                                id='emailUpdate'
                                value={emailUpdate}
                                onChange={e => setEmailUpdate(e.target.value)}
                                placeholder={email}
                            />
                            <label className='active' htmlFor='emailUpdate'>Email</label>
                        </div>

                        <div className='file-field input-field col s12'>
                            <div className='btn grey darken-3'>
                                <i style={{ fontSize: '2.4rem' }} className='material-icons center'>add_a_photo</i>
                                <input type='file' onChange={e => handleFileChange(e)} />
                            </div>
                            <div className='file-path-wrapper'>
                                <input className='file-path validate' type='text' placeholder='UPLOAD NEW USER PHOTO' />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='input-field col s12'>
                            <button className='btn col s5'>
                                Submit
                            </button>
                              
                            <input
                                onClick={() => setEditMode(false)}
                                className='btn col s5 orange offset-s2'
                                type='button'
                                value='CANCEL'
                            />
                        </div>
                    </div>
                </form>
            )}
        </Mutation>
    )

}

const Input = styled.input`
  ::placeholder {
    color:#999;
  }
`

export default UpdateUserForm
