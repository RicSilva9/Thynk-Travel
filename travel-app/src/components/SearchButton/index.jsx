import React from 'react';

const SearchButton = ({ onClick }) => {
  return (
    <div className="w-full max-w-52 flex items-start justify-center">
      <button
        onClick={onClick}
        className="w-full max-w-52 py-2 bg-orange-500 text-white rounded-2xl hover:bg-orange-700"
      >
        Pesquisar
      </button>
    </div>
  );
};

export default SearchButton;
