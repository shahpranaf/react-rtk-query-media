import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Skeleton from './Skeleton';
import Button from './Button';
import { addUser, fetchUsers } from '../store';
import { useThunk } from '../hooks/use-thunk';
import UsersListitem from './UsersListitem';


function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUserError] = useThunk(fetchUsers)
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser)
  const { isLoading, data, error } = useSelector(state => state.users);

  useEffect(() => {
    doFetchUsers()
  }, [doFetchUsers])

  const handleAddUser = () => {
    doCreateUser();
  }

  if (isLoadingUsers) {
    return <Skeleton times={6} className="h-10 w-full" />
  }

  const renderUsers = () => {

    if (isLoadingUsers) {
      return <Skeleton times={6} className="h-10 w-full" />
    }

    if (loadingUserError) {
      return <div>Error fetching data....</div>
    }

    return data?.map(user => {
      return <UsersListitem user={user} key={user.id} />
    })
  }



  return (
    <div>
      <div className='flex flex-row justify-between item-center m-3'>
        <h1 className='m-2 text-xl'>Users</h1>
        <Button loading={isCreatingUser} onClick={handleAddUser}>+ Add User</Button>
        {creatingUserError ? "Error creating user" : null}
      </div>
      {renderUsers()}
    </div>
  )
}

export default UsersList