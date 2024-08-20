import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ptBR } from 'date-fns/locale';

const HeaderDate = ({
  departureDate,
  returnDate,
  setDepartureDate,
  setReturnDate,
  noDate,
  handleToggleNoDate,
}) => {
  return (
    <div className="flex items-start flex-col gap-2">
      <div className="flex gap-1">
        <div className="relative">
          <DatePicker
            selected={departureDate}
            onChange={(date) => setDepartureDate(date)}
            placeholderText="Ida"
            locale={ptBR}
            disabled={noDate}
            className="border rounded-md px-2 py-1 text-black font-semibold md:w-24 focus:border-orange-500 focus:ring-0 focus:outline-none"
            dateFormat="dd/MM/yyyy"
            aria-label="Data de ida"
          />
        </div>

        <div className="relative">
          <DatePicker
            selected={returnDate}
            onChange={(date) => setReturnDate(date)}
            placeholderText="Volta"
            locale={ptBR}
            disabled={noDate}
            className="border rounded-md px-2 py-1 text-black font-semibold md:w-24 focus:border-orange-500 focus:ring-0 focus:outline-none"
            dateFormat="dd/MM/yyyy"
            aria-label="Data de volta"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            id="no-date-switch"
            type="checkbox"
            checked={noDate}
            onChange={handleToggleNoDate}
            className="sr-only"
            aria-label="Sem data definida"
          />
          <div
            className={`w-8 h-4 rounded-full shadow-inner ${
              noDate ? 'bg-green-500' : 'bg-slate-300'
            }`}
          ></div>
          <div
            className={`absolute top-0 w-4 h-4 bg-white rounded-full shadow-md transition-transform ${
              noDate ? 'translate-x-4' : 'translate-x-0'
            }`}
          ></div>
        </label>
        <label
          htmlFor="no-date-switch"
          className={`text-sm cursor-pointer ${
            noDate ? 'text-black font-semibold' : 'text-gray-500'
          }`}
        >
          Sem data definida
        </label>
      </div>
    </div>
  );
};

export default HeaderDate;