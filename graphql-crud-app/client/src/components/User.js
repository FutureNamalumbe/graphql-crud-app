import React, { useState } from 'react'
import Moment from 'react-moment'
import styled from 'styled-components'

// Importing Components
import UpdateUserForm from './UpdateUserForm'
import DeleteUserButton from './DeleteUserButton'

const calendarStrings = {
  lastDay: '[Yesterday at] LT',
  sameDay: '[Today at] LT',
  nextDay: '[Tomorrow at] LT',
  lastWeek: '[last] dddd [at] LT',
  nextWeek: 'dddd [at] LT',
  sameElse: 'L'
}

const User = ({ user: { id, username, email, avatarUrl, createdAt } }) => {

  const [editMode, setEditMode] = useState(false)
  const [deleteUser, setDeleteUser] = useState(false)

  if (deleteUser) return null

  return editMode ? (
    <UpdateUserForm id={id} username={username} email={email} setEditMode={setEditMode} />
  ) : (
      <div className='col l6 m12 s12'>
        <Div className='card'>
          <div className='card-image'>
            <br />
            <img src={avatarUrl} alt='' />
          </div>
          <div className='card-content'>

            <p className='flow-text center'>{username}</p>
            <div>
              <P>
                <i className='material-icons icon'> email </i>
                <span> {email} </span>
              </P>
              <p>
                <i className='material-icons icon' style={{ position: 'relative', top: '0.27rem' }}> date_range </i>

                <span> Joined </span>

                <Moment calendar={calendarStrings}>
                  {createdAt}
                </Moment>
              </p>
              <div>
                <button
                  style={{ margin: '0.5rem 0.2rem 0.5rem 0rem' }}
                  className='btn'
                  onClick={() => setEditMode(true)}
                >
                  Edit <i className='material-icons left'>edit</i>
                </button>

                <DeleteUserButton id={id} setDeleteUser={setDeleteUser}/>

              </div>

            </div>

          </div>
        </Div>
      </div>
    )
}

export const Div = styled.div`
  .card-image img {
    height: 10rem;
    border-radius: 100%;
    width: 10rem;
    margin: 0 auto;
  }

  .card-content {
    padding: 0;
  }

  .card-content > div {
    padding-left: 2.0rem;
  }
`

export const P = styled.p`
  i {
    position: relative;
    top: 0.43rem;
  }
`

export default User
