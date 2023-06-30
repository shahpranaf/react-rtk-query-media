import React from 'react'
import { useAddPhotoMutation, useFetchPhotosQuery } from '../store';
import Skeleton from './Skeleton';
import Button from './Button';
import PhotosListItem from './PhotosListItem';

function PhotosList({ album }) {
    const {data, error, isFetching} = useFetchPhotosQuery(album);
    const [addPhoto, results] = useAddPhotoMutation();

    let content;
    const handleAddPhoto = () => {
        addPhoto(album);
    }

    if(isFetching) {
        content = <Skeleton times={3} className="h-8 w-8" />
    } else if(error) {
        content = <div>Error fetching photos!!</div>
    } else {
        content = data?.map(photo => (
           <PhotosListItem photo={photo} key={photo.id} />
        ))
    }

  return (
    <div>
        <div className="m-2 flex flex-row items-center justify-between">
            <h3 className="text-lg font-bold"> Photos in {album.title}</h3>
            <Button loading={results?.isLoading} onClick={handleAddPhoto} >+Add Photo</Button>
        </div>
        <div className='flex flex-row flex-wrap justify-center items-center'>{content}</div>
    </div>
  )
}

export default PhotosList