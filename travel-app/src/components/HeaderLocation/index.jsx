import React from 'react';

const HeaderLocation = ({ origin, destination, handleSwap, setOrigin, setDestination }) => {
  return (
    <div className="flex items-start m-auto sm:m-0 gap-1">
      <input
        type="text"
        placeholder="Origem"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        className="border rounded-md px-2 py-1 text-black font-semibold w-full min-w-16 focus:border-orange-500 focus:ring-0 focus:outline-none"
        aria-label="Origem"
      />
      <button
        onClick={handleSwap}
        className="px-2 py-1 border rounded-full sm:rounded-md bg-gray-400 hover:bg-orange-500 focus:outline-none"
        aria-label="Trocar origem e destino"
      >
        ↔
      </button>
      <input
        type="text"
        placeholder="Destino"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        className="border rounded-md px-2 py-1 text-black font-semibold w-full min-w-16 focus:border-orange-500 focus:ring-0 focus:outline-none"
        aria-label="Destino"
      />
    </div>
  );
};

export default HeaderLocation;