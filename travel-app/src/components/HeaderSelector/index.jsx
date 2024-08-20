import React from 'react';

const HeaderSelector = ({ selectedOption, handleSelection }) => {
  return (
    <div className="flex items-start gap-2">
      <button
        className={`py-1 px-2 rounded-3xl items-center text-base hover:bg-slate-300 ${
          selectedOption === 'Pacotes' ? 'text-orange-500 font-bold' : 'text-black'
        }`}
        onClick={() => handleSelection('Pacotes')}
        aria-pressed={selectedOption === 'Pacotes'}
      >
        Pacotes
      </button>
      <button
        className={`py-1 px-2 rounded-3xl items-center text-base hover:bg-slate-300 ${
          selectedOption === 'Cruzeiros' ? 'text-orange-500 font-bold' : 'text-black'
        }`}
        onClick={() => handleSelection('Cruzeiros')}
        aria-pressed={selectedOption === 'Cruzeiros'}
      >
        Cruzeiros
      </button>
    </div>
  );
};

export default HeaderSelector;