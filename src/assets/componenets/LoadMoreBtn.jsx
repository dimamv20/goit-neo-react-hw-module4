import React from "react";

const LoadMoreBtn = ({ onClick }) => {
  return (
    <button className="loadMore"
      onClick={onClick}
    >
      Load more
    </button>
  );
};

export default LoadMoreBtn;
