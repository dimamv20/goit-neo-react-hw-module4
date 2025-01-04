import '../App.css'

const ImageCard = ({ image, onClick }) => {
  return (
    <li className="ImageCards" onClick={onClick}>
      <div>
        <img src={image.urls.small} alt={image.description || 'Unsplash Photo'} />
      </div>
    </li>
  );
};

export default ImageCard;
