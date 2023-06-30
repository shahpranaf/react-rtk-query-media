import React from 'react'
import ExpandablePanel from './ExpandablePanel';
import { GoTrash } from 'react-icons/go';
import Button from './Button';
import { useDeleteAlbumMutation } from '../store';
import PhotosList from './PhotosList';

function AlbumsListItem({ album }) {
    const [deleteAlbum, results] = useDeleteAlbumMutation(); 

    const handleRemove = () => {
        deleteAlbum(album);
    }

    const header = <>
        <Button className="mr-3" loading={results?.isLoading} onClick={handleRemove}>
            <GoTrash />
        </Button>
        {album.title}
    </>;

    return (
        <ExpandablePanel key={album.id} header={header}>
            <PhotosList album={album} />
        </ExpandablePanel>
    )
}

export default AlbumsListItem