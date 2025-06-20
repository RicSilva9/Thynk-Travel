import React, { useState } from 'react';

const Categorias = () => {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('parques');

  const handleCategoriaChange = (categoria) => {
    setCategoriaSelecionada(categoria);
  };

  const pacotesDeViagem = [
    {
      categoria: 'parques',
      pacotes: [
        { id: 1, nome: 'Disney Orlando - Florida', imagem: `${process.env.PUBLIC_URL}/img/bg-cards/bg-card-parques-1.png` },
        { id: 2, nome: 'Beto Carrero - Brasil', imagem: `${process.env.PUBLIC_URL}/img/bg-cards/bg-card-parques-2.png` },
        { id: 3, nome: 'Disney Paris - França', imagem: `${process.env.PUBLIC_URL}/img/bg-cards/bg-card-parques-3.png` },
      ],
    },
    {
      categoria: 'praias',
      pacotes: [
        { id: 4, nome: 'Copacabana - Brasil', imagem: `${process.env.PUBLIC_URL}/img/bg-cards/bg-card-praias-1.jpg` },
        { id: 5, nome: 'Waikiki Beach - Havaí', imagem: `${process.env.PUBLIC_URL}/img/bg-cards/bg-card-praias-2.jpg` },
        { id: 6, nome: 'Bondi Beach - Austrália', imagem: `${process.env.PUBLIC_URL}/img/bg-cards/bg-card-praias-3.jpg` },
      ],
    },
    {
      categoria: 'monumentos',
      pacotes: [
        { id: 7, nome: 'Torre Eiffel - França', imagem: `${process.env.PUBLIC_URL}/img/bg-cards/bg-card-monumentos-1.jpg` },
        { id: 8, nome: 'Machu Picchu - Peru', imagem: `${process.env.PUBLIC_URL}/img/bg-cards/bg-card-monumentos-2.jpg` },
        { id: 9, nome: 'Coliseu - Itália', imagem: `${process.env.PUBLIC_URL}/img/bg-cards/bg-card-monumentos-3.jpg` },
      ],
    },
  ];

  const categoriaAtual = pacotesDeViagem.find(c => c.categoria === categoriaSelecionada);

  return (
    <div className="mx-0 sm:mx-4 px-8 md:px-16 md:py-32 py-24 xl:m-auto max-w-screen-xl" id='categorias-id-nav'>
      <h2 className="text-center fjalla tracking-normal leading-tight hover:cursor-default text-3xl sm:text-4xl max-w-md m-auto">
        Categorias populares
      </h2>

      <div className="flex space-x-8 mb-4 mt-10 justify-center">
        {['parques', 'praias', 'monumentos'].map(categoria => (
          <button
            key={categoria}
            className={`fjalla tracking-normal font-medium sm:text-2xl px-4 py-2 rounded-lg ${categoriaSelecionada === categoria ? 'text-orange-500' : 'text-black'}`}
            onClick={() => handleCategoriaChange(categoria)}
          >
            {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-8">
        {categoriaAtual?.pacotes.map(pacote => (
          <div
            key={pacote.id}
            className="md:h-96 h-52 bg-white rounded-lg shadow-md bg-cover bg-center"
            style={{ backgroundImage: `url(${pacote.imagem})` }}
          >
            <h2 className="fjalla tracking-wide text-2xl md:text-3xl text-center text-white font-normal h-full w-full p-4 bg-black bg-opacity-40 rounded-lg">{pacote.nome}</h2>
            <div className='w-full z-10 flex justify-center -mt-6 mb-5'>
              <button className='text-center text-white text-base md:text-lg lg:text-xl py-3 px-7 md:px-10 rounded-xl bg-orange-500 hidden'>Ver Pacotes</button>{/* por enquanto irão ficar invisiveis */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categorias;
