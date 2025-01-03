import React from 'react';
import Modal from 'react-modal';
import '../App.css'

const ImageModal = ({ isOpen, closeModal, image }) => {
  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Image Modal"
      ariaHideApp={false}
      overlayClassName="ModalOverlay"
      className="ModalContent"
    >
      <div>

        <img
          src={image.urls.regular}
          alt={image.description || 'Selected Image'}
          style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain' }}
        />
                <button onClick={closeModal} className='modal-btn-close'>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ImageModal;
