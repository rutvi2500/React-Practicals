import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { requestUsers } from '../../action';
import EmptyList from '../EmptyList/EmptyList';
import User from '../User/User';
import UserListPagination from '../UserListPagination/UserListPagination';
import './UserList.css'

function UserList({ userDetails }) {
  const { error, isLoading, pagination } = useSelector((state) => state.userListReducer)
  const dispatch = useDispatch()
  // for requesting user details
  useEffect(() => {
    dispatch(requestUsers(pagination)) 
  }, [dispatch, pagination])
  // for displaying users list
  let displayList;
  if(userDetails.length === 0) {
    displayList = <EmptyList />
  }
  else {
    displayList = userDetails.map((user) => {
      const { id } = user
      return(
        <User 
          key={id}
          user={user}
        />        
      )
    })
  }
  return isLoading 
  ? ( <h2>Loading...</h2> ) 
  : error 
  ? ( <h2>{error}</h2> ) 
  : <>
      { userDetails.length !== 0 && 
        <div className='title'>
          <div className='user-info name'>Name</div>
          <div className='user-status status'>Status</div>
          <div className='user-access access'>Access</div>
          <div className='icon'></div>
        </div> 
      }
      <div className='user-list-container'>
        { displayList }
      </div> 
      <UserListPagination />
    </>
}

export default UserList