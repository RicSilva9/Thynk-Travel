import React, { useState } from 'react';
import Nav from '../Nav';
import HeaderSelector from '../HeaderSelector';
import HeaderLocation from '../HeaderLocation';
import HeaderDate from '../HeaderDate';
import HeaderTravelers from '../HeaderTravelers';
import SearchButton from '../SearchButton';

const Header = () => {
  const [selectedOption, setSelectedOption] = useState('Pacotes');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [noDate, setNoDate] = useState(false);

  const [roomsData, setRoomsData] = useState([
    { adults: 2, children: 0, childrenAges: [] },
  ]);

  const handleSelection = (option) => setSelectedOption(option);

  const handleSwap = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const handleToggleNoDate = () => {
    setNoDate((prev) => !prev);
    if (!noDate) {
      setDepartureDate(null);
      setReturnDate(null);
    }
  };

  const handleApplyTravelers = (updatedRooms) => {
    setRoomsData(updatedRooms);
  };

  const totalRooms = roomsData.length;
  const totalTravelers = roomsData.reduce(
    (acc, room) => acc + room.adults + room.children,
    0
  );

  const handleSearchClick = () => {
    // Lógica de busca aqui
  };

  return (
    <header
      className="text-white bg-slate-700 bg-fixed bg-cover bg-center rounded-b-2xl pt-20 pb-20 sm:pb-24 mx-0 sm:mx-4 2xl:m-auto max-w-screen-2xl px-8 md:px-16"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/header/bg-header.png)` }}
      id="home-id-nav"
    >
      <Nav />
      <section>
        <h1 className="w-1/2 fjalla tracking-normal leading-tight hover:cursor-default max-lg:w-2/3 max-sm:w-full text-3xl sm:text-4xl">
          Oferecemos os melhores pacotes de viagem para suas férias!
        </h1>
        <p className="mt-2 w-1/2 hover:cursor-default max-lg:text-sm max-lg:w-2/3 max-md:text-xs max-sm:hidden">
          A Agência de Viagens oferece serviços personalizados para quem busca
          destinos incríveis. Com nossos pacotes de viagem, você terá uma
          experiência única e inesquecível. Realize seus sonhos de viajar
          conosco!
        </p>
      </section>
      <section className="bg-slate-50 sm:mt-10 mt-5 rounded-2xl sm:p-5 p-2">
        <HeaderSelector selectedOption={selectedOption} handleSelection={handleSelection} />
        <div className="sm:mt-3 mt-1">
          {selectedOption === 'Pacotes' && (
            <div className='flex lg:items-start items-center flex-col lg:flex-row gap-4'>
              <div className="flex gap-4 flex-col md:flex-row pt-4 sm:pt-0 px-4 sm:px-0 sm:justify-between items-center md:items-start">
                <HeaderLocation
                  origin={origin}
                  destination={destination}
                  handleSwap={handleSwap}
                  setOrigin={setOrigin}
                  setDestination={setDestination}
                />
                <HeaderDate
                  departureDate={departureDate}
                  returnDate={returnDate}
                  setDepartureDate={setDepartureDate}
                  setReturnDate={setReturnDate}
                  noDate={noDate}
                  handleToggleNoDate={handleToggleNoDate}
                />
                <HeaderTravelers
                  roomsData={roomsData}
                  onApply={handleApplyTravelers}
                  totalRooms={totalRooms}
                  totalTravelers={totalTravelers}
                />
              </div>
              <div className='w-full max-w-60 flex justify-center'>
                <SearchButton onClick={handleSearchClick} />
              </div>
            </div>
          )}
          {selectedOption === 'Cruzeiros' && (
            <div className='rounded-md bg-red-200 p-2'>
              <span className='text-red-900'>Esta seção do site ainda está em desenvolvimento. Estamos trabalhando para trazer todas as funcionalidades o mais rápido possível. Agradecemos sua compreensão!</span>
            </div>
          )}
        </div>
      </section>
    </header>
  );
};

export default Header;
