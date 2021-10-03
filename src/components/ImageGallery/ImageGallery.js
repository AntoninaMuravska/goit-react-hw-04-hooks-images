import React from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = ({ images, onClick }) => {
  return (
    <ul className={s.ImageGallery} onClick={onClick}>
      {images.map(({ id, webformatURL, tags }, idx) => (
        <ImageGalleryItem src={webformatURL} alt={tags} key={idx} id={id} />
      ))}
    </ul>
  );
};

export default ImageGallery;
