import React from 'react';
import ImageCard from './ImageCard';

const ImageGallery = ({ photos, openModal }) => {
  return (
    <ul className="listOfImages">
      {photos.map((photo) => (
        <ImageCard key={photo.id} image={photo} onClick={() => openModal(photo)} />
      ))}
    </ul>
  );
};

export default ImageGallery;
