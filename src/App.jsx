import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import LoadMoreBtn from './components/LoadMoreBtn';
import { RotatingLines } from 'react-loader-spinner';
import axios from 'axios';
import ImageModal from './assets/componenets/ImageModal';
import ErrorMessage from './assets/componenets/ErrorMessage';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);
  const API_KEY = 'otxuwHzyr8BKcJRmkV8xMaQ1nL2BmuOVFP_8gLMlCek';

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  const fetchImages = async (newQuery = query, newPage = page) => {
    if (!newQuery.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: { query: newQuery, page: newPage, per_page: 12 },
        headers: {
          Authorization: `Client-ID ${API_KEY}`,
        },
      });
      if (newPage === 1) {
        setPhotos(response.data.results);
      } else {
        setPhotos((prevPhotos) => [...prevPhotos, ...response.data.results]);
      }
    } catch (error) {
      setError('Failed to load images. Please try again later.');
      console.error('Error fetching data from Unsplash API:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    fetchImages(newQuery, 1);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(query, nextPage);
  };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <ToastContainer autoClose={3000} />
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <ImageGallery photos={photos} openModal={openModal} />
          {isLoading && (
            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
              <RotatingLines strokeColor="blue" strokeWidth="5" animationDuration="0.75" width="50" visible={true} />
            </div>
          )}
          {photos.length > 0 && !isLoading && <LoadMoreBtn onClick={handleLoadMore} />}
        </>
      )}
      <ImageModal isOpen={!!selectedImage} image={selectedImage} closeModal={closeModal} />
    </div>
  );
}

export default App;
