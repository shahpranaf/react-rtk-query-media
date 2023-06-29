import React from 'react'
import { useThunk } from '../hooks/use-thunk'
import { deleteUser } from '../store'
import { GoTrash } from 'react-icons/go';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import AlbumsList from './AlbumsList';

function UsersListitem({ user }) {
    const [doDeleteUser, isLoading, error] = useThunk(deleteUser);

    const handleClick = () => {
        doDeleteUser(user);
    }
    const header = <>
        <Button className="mr-3" loading={isLoading} onClick={handleClick} >
            <GoTrash />
        </Button>
        {error && <div>Error deleting user.</div>}
        {user?.name}</>

    return (
           <ExpandablePanel header={header}>
            <AlbumsList user={user} />
           </ExpandablePanel>  
    )
}

export default UsersListitem