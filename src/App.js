import Modal from './components/Modal';
import SearchBar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import ShowErrorMessage from './components/ErrorMessage';
import Loader from './components/Loader';
import fetchImage from './services/api-service';

import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import './App.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(Status.IDLE);
  const [largeImg, setLargeImg] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    setStatus(Status.PENDING);

    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const windowScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const openModal = event => {
    if (event.target.nodeName === 'IMG') {
      toggleModal();
    }

    const targetImg = images.find(({ id }) => id === Number(event.target.id));
    setLargeImg(targetImg.largeImageURL);
  };

  //делает запись в стейт
  const handleSearchbarSubmit = query => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
  };

  const fetchImages = () => {
    fetchImage({ searchQuery, page })
      .then(images => {
        setImages(prevState => [...prevState, ...images]);
        setPage(prevState => prevState + 1);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        console.log(error);
        setStatus(Status.REJECTED);
        toast.error('Sorry, try again');
      })
      .finally(() => {
        windowScroll();
      });
  };

  if (status === Status.IDLE) {
    return (
      <>
        <SearchBar onSubmit={handleSearchbarSubmit}></SearchBar>;
        <ToastContainer autoClose={3000} />
      </>
    );
  }

  if (status === Status.PENDING) {
    return (
      <>
        <SearchBar onSubmit={handleSearchbarSubmit}></SearchBar>;
        <Loader />
      </>
    );
  }

  if (status === Status.REJECTED) {
    return <ShowErrorMessage message="Please, try again" />;
  }

  if (status === Status.RESOLVED) {
    return (
      <>
        <div className="App">
          <SearchBar onSubmit={handleSearchbarSubmit}></SearchBar>
          <ImageGallery images={images} onClick={openModal} />
          {images.length > 0 && <Button onClick={fetchImages}></Button>}
          {showModal && (
            <Modal src={largeImg} alt={''} openModal={toggleModal} />
          )}
          <ToastContainer autoClose={3000} />
        </div>
      </>
    );
  }
}
