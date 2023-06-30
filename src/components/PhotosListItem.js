import React from 'react';
import { GoTrash } from 'react-icons/go';
import { useDeletePhotoMutation } from '../store';

function PhotosListItem({ photo }) {
    const [ deletePhoto ] = useDeletePhotoMutation();

    const handleRemovePhoto = () => {
        deletePhoto(photo);
    }

    return (
        <div className='relative m-5 cursor-pointer' key={photo.id}>
            <img className='w-20 h-20' src={photo.url} alt="img" />
            <div onClick={handleRemovePhoto} className='absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80'>
                <GoTrash className='text-3xl' />
            </div>
        </div>
    )
}

export default PhotosListItem